import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import './Auth.css';
import CryptoJS from 'crypto-js';

const Auth = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const validationSchema = Yup.object().shape({
        email: Yup.string().required('Email is required').email('Email is invalid'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        ...(isLogin ? {} : {
                confirmPassword: Yup.string()
                    .required('Confirm Password is required')
                    .oneOf([Yup.ref('password')], 'Passwords must match'),
            }),
    });

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        const { email, password } = data;

        if (isLogin) {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser && storedUser.email === email) {
                const bytes = CryptoJS.AES.decrypt(storedUser.password, 'secret-key');
                const decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
                if (decryptedPassword === password) {
                    localStorage.setItem('isAuthenticated', 'true');
                    navigate('/');
                } else {
                    alert('Invalid credentials.');
                }
            } else {
                alert('User not found.');
            }
        } else {
            const encryptedPassword = CryptoJS.AES.encrypt(password, 'secret-key').toString();
            localStorage.setItem('user', JSON.stringify({ email, password: encryptedPassword }));
            localStorage.setItem('isAuthenticated', 'true');
            navigate('/');
        }
    };

    return (
        <div className="auth">
            <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email"
                        {...register('email')}
                        className={`auth-input ${errors.email ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.email?.message}</div>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        {...register('password')}
                        className={`auth-input ${errors.password ? 'is-invalid' : ''}`}
                    />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                {!isLogin && (
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            {...register('confirmPassword')}
                            className={`auth-input ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        />
                        <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
                    </div>
                )}
                <button type="submit" className="auth-button">
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <div className="toggle-link" onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
                </div>
            </form>
        </div>
    );
};

export default Auth;
