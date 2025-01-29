import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

const TvList = ({ tvShow }) => {

    const [tvData, setTvData] = useState([]);
    const [selectedTv, setSelectedTv] = useState([])

    useEffect(()=> {
        if (selectedTv) {
            fetch(
                `https://api.themoviedb.org/3/discover/tv?with_genres=${selectedTv}&language=en`,
                {
                  method: "GET",
                  headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
                  },
                }
              )
                .then((res) => res.json())
                .then((res) => setTvData(res.results))
                .catch((err) => console.error(err));
        }
    },[selectedTv])
  return (
    <div className="bg-gray-900 px-4 py-20 text-white min-h-screen">
      <h2 className="text-2xl px-2 font-bold text-white mb-10">Genres</h2>
      <div className="flex gap-4 px-2 overflow-x-auto scrollbar-hide">
        {tvShow.map((genre) => (
          <div
            key={genre.id}
            onClick={() => setSelectedTv(genre.id)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg shadow-md cursor-pointer text-center ${
                selectedTv === genre.id
                ? "bg-gray-700"
                : "bg-blue-400 hover:bg-blue-500"
            } transition-colors`}
          >
            {genre.name}
          </div>
        ))}
      </div>

      <h2 className="text-xl px-2 mt-10 font-bold text-white">TV</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-4 px-2 mt-6">
        {tvData.length > 0 ? (
          tvData.map((movie) => (
            <Link to={`/tv/${movie.id}`} key={movie.id} className="bg-gray-800 rounded-lg p-4 shadow-lg hover:scale-105 transition-transform cursor-pointer">
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
          <p className="text-gray-400 col-span-full">No shows found.</p>
        )}
      </div>
    </div>
  );
};

export default TvList
