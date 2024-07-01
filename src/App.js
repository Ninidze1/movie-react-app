import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Detailed from './detailed/Detailed';
import Search from './search/Search';
import Auth from './auth/Auth';
import './App.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/movie/:id" element={<Detailed />} />
                <Route path="/search" element={<Search />} />
                <Route path="/auth" element={<Auth />} />
            </Routes>
        </Router>
    );
};

export default App;
