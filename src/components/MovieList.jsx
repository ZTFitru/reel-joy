import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IoClose, IoMenu } from "react-icons/io5";

const MovieList = ({ genres }) => {
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (selectedGenre) {
      fetch(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&language=en`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
          },
        }
      )
        .then((res) => res.json())
        .then((res) => setMovies(res.results))
        .catch((err) => console.error(err));
    }
  }, [selectedGenre]);

  return (
    <div className="bg-gray-900 px-4 py-20 text-white min-h-screen">
      <h2 className="text-2xl px-2 font-bold text-white mb-10">Genres</h2>

      <div className="md:hidden flex justify-between items-center">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-white text-2xl"
        >
          <IoMenu />
        </button>
      </div>

      <div className="hidden md:flex gap-4 px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-600 scrollbar-rounded-lg">
        {genres.map((genre) => (
          <div
            key={genre.id}
            onClick={() => setSelectedGenre(genre.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg shadow-md cursor-pointer text-center ${
              selectedGenre === genre.id
                ? "bg-gray-700"
                : "bg-blue-400 hover:bg-blue-500"
            } transition-colors`}
          >
            {genre.name}
          </div>
        ))}
      </div>

      {/* small screen viw */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 flex flex-col items-center justify-center md:hidden z-50">
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 text-white text-3xl"
          >
            <IoClose />
          </button>
          <div className="flex flex-wrap gap-4 p-4">
            {genres.map((genre) => (
              <div
                key={genre.id}
                onClick={() => {
                  setSelectedGenre(genre.id);
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded-lg shadow-md cursor-pointer text-center ${
                  selectedGenre === genre.id
                    ? "bg-gray-700"
                    : "bg-blue-400 hover:bg-blue-500"
                } transition-colors`}
              >
                {genre.name}
              </div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-xl px-2 mt-10 font-bold text-white">Movies</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-2 mt-6">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <Link
              to={`/movies/${movie.id}`}
              key={movie.id}
              className="bg-gray-800 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform cursor-pointer"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-[200px] sm:h-[200px] md:h-[400px] object-cover rounded-lg mb-2"
              />
              <h3 className="text-lg font-semibold">{movie.title}</h3>
              <p className="text-yellow-400">
                ⭐ {movie.vote_average.toFixed(1)}
              </p>
            </Link>
          ))
        ) : (
          <p className="text-gray-400 col-span-full">No movies found.</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
