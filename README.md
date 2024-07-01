# Movie App

## Description

The Movie App is a web application that allows users to browse and search for movies. Users can view detailed information about each movie, including its rating, genres, and cast. The app also includes an authentication system, allowing users to register and log in.

## Features

- **Dashboard**: View top-rated movies and best action movies.
- **Search**: Search for movies by keywords.
- **Detailed Movie Page**: View detailed information about a selected movie.
- **Authentication**: Register and log in to access personalized features.
- **Responsive Design**: The application is designed to be responsive and work on various screen sizes.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **React Router**: Declarative routing for React applications.
- **Axios**: Promise-based HTTP client for the browser and Node.js.
- **React Hook Form**: Performant, flexible, and extensible forms with easy-to-use validation.
- **Yup**: JavaScript schema builder for value parsing and validation.
- **CryptoJS**: JavaScript library of crypto standards for password encryption.

## Getting Started

### Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-app.git
cd movie-app
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory and add your API key:

```
REACT_APP_TMDB_API_KEY=your_tmdb_api_key
```

### Running the Application

```bash
npm start
```

The application will start on `http://localhost:3000`.

## Folder Structure

```
movie-app/
├── public/
│   ├── index.html
│   └── profile-icon.png
├── src/
│   ├── auth/
│   │   ├── Auth.css
│   │   └── Auth.js
│   ├── components/
│   │   ├── MovieCard.js
│   │   └── ProfileIcon.js
│   ├── dashboard/
│   │   ├── Dashboard.css
│   │   └── Dashboard.js
│   ├── detailed/
│   │   └── Detailed.js
│   ├── hooks/
│   │   ├── useGenres.js
│   │   └── useMovies.js
│   ├── search/
│   │   └── Search.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

## Components

### `Auth.js`

Handles user authentication including login and registration.

### `Dashboard.js`

Displays top-rated movies and best action movies. Includes a search bar and profile icon.

### `Detailed.js`

Displays detailed information about a selected movie, including its rating, genres, and cast.

### `MovieCard.js`

Reusable component for displaying movie information in a card format.

### `ProfileIcon.js`

SVG component for the profile icon.

## Custom Hooks

### `useGenres.js`

Fetches and caches genre data from the TMDB API.

### `useMovies.js`

Fetches movie data from the TMDB API.

## API

The app uses The Movie Database (TMDB) API to fetch movie data. Ensure you have a valid API key from TMDB.

- **Discover Movies**: `https://api.themoviedb.org/3/discover/movie?api_key={API_KEY}`
- **Search Movies**: `https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={QUERY}`
- **Movie Details**: `https://api.themoviedb.org/3/movie/{MOVIE_ID}?api_key={API_KEY}&append_to_response=credits`
- **Genres**: `https://api.themoviedb.org/3/genre/movie/list?api_key={API_KEY}`

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -am 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

This README file should give a comprehensive overview of your project, guiding users on how to set it up, run it, and contribute to it. If you have any additional details or specific instructions you want to include, feel free to modify it accordingly.
