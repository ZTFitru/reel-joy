import React, { useState, useEffect } from "react";
import TitlePage from "./TitleCard";
import Navbar from "./Navbar";
import Footer from "./Footer";
import MovieList from "./MovieList";
import { Route, Routes } from 'react-router-dom';
import DetailCard from "./DetailCard";
import VideoCard from "./VideoCard";
import TvList from "./TvList";
import TvDetail from "./TvDetail";
import TvVideoCard from "./TvVideoCard";
import MyList from "./MyList";
import { ToastContainer } from "react-toastify";

const App = () => {
  const [apiMovies, setApiMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([])
  const [upcomingMovies, setUpcomingMovies] = useState([])
//   const [movieList, setMovieList] = useState([])
  const [genres, setGenres] = useState([])
  const [tvShow, setTvShow] = useState([])
  const [error, setError] = useState("");

//   now playing
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setApiMovies(res.results))
      .catch((err) => setError(err));
  }, []);

//   popular movies
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setPopularMovies(res.results))
      .catch((err) => setError(err));
  }, []);

  //   upcoming movies
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setUpcomingMovies(res.results))
      .catch((err) => setError(err));
  }, []);

  //   movie list
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setGenres(res.genres))
      .catch((err) => setError(err));
  }, []);

  //   tv list
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/genre/tv/list?language=en",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setTvShow(res.genres))
      .catch((err) => setError(err));
  }, []);

  return (
    <>
      <Navbar />
        <ToastContainer position="top-right" autoClose={2000} />
      <Routes>
        <Route path='/' element={<TitlePage apiMovies={apiMovies} error={error} popularMovies={popularMovies} upcomingMovies={upcomingMovies} /> } />
        <Route path="/movies" element={<MovieList genres={genres} />} />
        <Route path="/tv" element={<TvList tvShow={tvShow} />} />
        <Route path="/movies/:id" element={<DetailCard />} />
        <Route path="/tv/:id" element={<TvDetail />} />
        <Route path="/movies/:movie_id/videos" element={<VideoCard />} />
        <Route path="/tv/:tv_id/videos" element={<TvVideoCard />} />
        <Route path='/myList' element={<MyList />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
