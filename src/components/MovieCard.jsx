import React from "react";

const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div
      onClick={() => onMovieClick(movie)}
      className="min-w-[150px] bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform cursor-pointer"
      key={movie.id}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={`Poster of ${movie.title}`}
        className="w-full h-[200px] object-cover"
      />
      <div className="p-2">
        <p className="text-center font-semibold">{movie.title}</p>
        <p className="text-center text-yellow-400">
          ⭐️ {movie.vote_average.toFixed(1)}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
