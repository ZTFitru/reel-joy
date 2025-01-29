import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import { FaPlay } from "react-icons/fa";
import { IoInformationOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { MdKeyboardDoubleArrowLeft } from "react-icons/md";

const TitleCard = ({ error, apiMovies, popularMovies, upcomingMovies }) => {
  const [highlightedMovie, setHighLightedMovie] = useState(null);
  const [movieInput, setMovieInput] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [popularFiltered, setPopularFiltered] = useState([]);
  const [upcomingFiltered, setUpcomingFiltered] = useState([]);

  useEffect(() => {
    if (filteredMovies.length > 0) {
      setHighLightedMovie(filteredMovies[0]);
    }
  }, [filteredMovies]);

  //   now playing
  useEffect(() => {
    if (movieInput.trim()) {
      const timer = setTimeout(() => {
        const result = apiMovies.filter((movie) =>
          movie.title.toLowerCase().includes(movieInput.toLowerCase())
        );
        setFilteredMovies(result);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setFilteredMovies(apiMovies);
    }
  }, [movieInput, apiMovies]);

  //   popular
  useEffect(() => {
    if (movieInput.trim()) {
      const timer = setTimeout(() => {
        const result = popularMovies.filter((movie) =>
          movie.title.toLowerCase().includes(movieInput.toLowerCase())
        );
        setPopularFiltered(result);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setPopularFiltered(popularMovies);
    }
  }, [movieInput, popularMovies]);

  //   upcoming
  useEffect(() => {
    if (movieInput.trim()) {
      const timer = setTimeout(() => {
        const result = upcomingMovies.filter((movie) =>
          movie.title.toLowerCase().includes(movieInput.toLowerCase())
        );
        setUpcomingFiltered(result);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setUpcomingFiltered(upcomingMovies);
    }
  }, [movieInput, upcomingMovies]);

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {error && (
        <div className="bg-red-600 text-white p-4 text-center">
          <p>{error}</p>
        </div>
      )}

      {/* highlighted movie here */}
      {highlightedMovie && (
        <div
          className="relative bg-cover bg-center h-[75vh] flex items-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/w500${highlightedMovie.backdrop_path})`,
            backgroundPosition: "top center",
          }}
        >
          <div className="container mx-auto px-8 lg:px-16">
            <h1 className="text-4xl font-bold">{highlightedMovie.title}</h1>
            <p className="mt-4 text-lg smallText max-w-lg">
              {highlightedMovie.overview}
            </p>
            <div className="mt-6 flex gap-4">
              <Link
                to={`/movies/${highlightedMovie.id}/videos`}
                className="bg-white text-gray-900 px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-200 hover:text-gray-700 transition-all duration-200"
              >
                Trailers
                <FaPlay />
              </Link>
              <Link
                to={`/movies/${highlightedMovie.id}`}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-600 hover:text-yellow-400 transition-all duration-200"
              >
                Details
                <IoInformationOutline />
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* now playing movies */}
      <div className="container mx-auto px-8 lg:px-16 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="text-2xl font-bold">Now Playing</h2>
          <input
            type="text"
            value={movieInput}
            onChange={(e) => setMovieInput(e.target.value)}
            placeholder="Search movies..."
            className="mt-4 md:mt-0 px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="relative">
          {/* left arrows */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-200 to-indigo-600 text-white p-2 rounded-full shadow-lg z-10 text-4xl"
            onClick={() => {
              document.getElementById("scroll-container").scrollLeft -= 300;
            }}
          >
            {/* &#8592; */}
            <MdKeyboardDoubleArrowLeft />
          </button>

          <div
            id="scroll-container"
            className="flex overflow-x-hidden space-x-4 mt-4 pb-4 scrollbar-none"
          >
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  onMovieClick={setHighLightedMovie}
                />
              ))
            ) : (
              <p className="text-center text-gray-400">
                Sorry, no movies match your search.
              </p>
            )}
          </div>

          {/* right arrow */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-200 text-white p-2 rounded-full shadow-lg z-10 text-4xl"
            onClick={() => {
              document.getElementById("scroll-container").scrollLeft += 300;
            }}
          >
            {/* &#8594; */}
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>

      {/* top rated movies */}
      <div className="container mx-auto px-8 lg:px-16 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="text-2xl font-bold">Top Rated</h2>
        </div>

        <div className="relative">
          {/* left arrows */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-200 to-indigo-600 text-white p-2 rounded-full shadow-lg z-10 text-4xl"
            onClick={() => {
              document.getElementById("scroll-container").scrollLeft -= 300;
            }}
          >
            {/* &#8592; */}
            <MdKeyboardDoubleArrowLeft />
          </button>

          <div
            id="scroll-container"
            className="flex overflow-x-hidden space-x-4 mt-4 pb-4 scrollbar-none"
          >
            {popularFiltered.length > 0 ? (
              popularFiltered.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  onMovieClick={setHighLightedMovie}
                />
              ))
            ) : (
              <p className="text-center text-gray-400">
                Sorry, no movies match your search.
              </p>
            )}
          </div>

          {/* right arrow */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-200 text-white p-2 rounded-full shadow-lg z-10 text-4xl"
            onClick={() => {
              document.getElementById("scroll-container").scrollLeft += 300;
            }}
          >
            {/* &#8594; */}
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>

      {/* upcoming movies */}
      <div className="container mx-auto px-8 lg:px-16 mt-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <h2 className="text-2xl font-bold">Top Rated</h2>
        </div>

        <div className="relative">
          {/* left arrows */}
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-200 to-indigo-600 text-white p-2 rounded-full shadow-lg z-10 text-4xl"
            onClick={() => {
              document.getElementById("scroll-container").scrollLeft -= 300;
            }}
          >
            {/* &#8592; */}
            <MdKeyboardDoubleArrowLeft />
          </button>

          <div
            id="scroll-container"
            className="flex overflow-x-hidden space-x-4 mt-4 pb-4 scrollbar-none"
          >
            {upcomingFiltered.length > 0 ? (
              upcomingFiltered.map((movie) => (
                <MovieCard
                  movie={movie}
                  key={movie.id}
                  onMovieClick={setHighLightedMovie}
                />
              ))
            ) : (
              <p className="text-center text-gray-400">
                Sorry, no movies match your search.
              </p>
            )}
          </div>

          {/* right arrow */}
          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-indigo-200 text-white p-2 rounded-full shadow-lg z-10 text-4xl"
            onClick={() => {
              document.getElementById("scroll-container").scrollLeft += 300;
            }}
          >
            {/* &#8594; */}
            <MdKeyboardDoubleArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
