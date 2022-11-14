import { useState, useEffect } from "react";

import './App.css';
import SearchIcon from './search.svg';
import MovieCard from "./MovieCard";
// f7adb3fa

// e.target.value is a value property of some DOM element, in the example below means the movie text entered in the search input
// 

const API_URL = 'http://www.omdbapi.com?apikey=f7adb3fa';

// const movie1 = 
//     {
//         "Title": "Amazing Spiderman Syndrome",
//         "Year": "2012",
//         "imdbID": "tt2586634",
//         "Type": "movie",
//         "Poster": "N/A"
//     }

const App = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const searchMovies = async (title) => {
        const response = await fetch(`${API_URL}&s=${title}`);
        const data = await response.json();

        console.log(data.Search);
        setMovies(data.Search);
    };

    useEffect(() => {
        searchMovies('Spiderman');
    }, []);

    return (
      <div className="app">
        <h1>Erik's Movieland</h1>

        <div className = "search">
            <input 
                placeholder = ""
                value = {searchTerm}
                onChange = {(e) => setSearchTerm(e.target.value)}
            />

            <img 
                src = {SearchIcon}
                alt = "movieSearch"
                onClick = {() => searchMovies(searchTerm)}
            />
        </div>

        {
            movies.length > 0 ?
            (
                <div className="container">
                    {movies.map((movie) => (
                        <MovieCard movie={movie}/>
                    ))}
                </div>
            ) : (
                <div className="empty">
                    <h2>No movies found...</h2>
                </div>
            )
        }
      </div> 
    );
}

export default App;