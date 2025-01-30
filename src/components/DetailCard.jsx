import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const DetailCard = () => {
  const { id } = useParams();
  const [clickedMovie, setClickedMovie] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch movie details.");
        return res.json();
      })
      .then((data) => setClickedMovie(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const showVideo = () => {
    navigate(`/movies/${id}/videos`);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!clickedMovie) {
    return <p>Loading...</p>;
  }

  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${clickedMovie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center  lg:items-start px-6 lg:px-20 py-20 gap-8">
        <div className="w-64 lg:w-80 py-20 sm:py-20 md:py-20 lg:py-20 xl:py-20">
          <img
            src={`https://image.tmdb.org/t/p/w200${clickedMovie.poster_path}`}
            alt={clickedMovie.title}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-black/60 rounded-lg"></div>
          <div className="relative text-white space-y-4 py-20 sm:py-10 md:py-20 px-6 bg-gray-900/80 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold">{clickedMovie.title}</h1>
            <p className="text-lg">
              <span className="font-semibold">Rating: </span>
              {clickedMovie.vote_average}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Overview: </span>
              {clickedMovie.overview}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Genre: </span>
              {clickedMovie.genres.map((genre) => genre.name).join(", ")}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Release Date: </span>
              {clickedMovie.release_date}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Runtime: </span>
              {clickedMovie.runtime} mins
            </p>
            {clickedMovie.tagline && (
              <h2 className="italic text-lg text-gray-300">
                "{clickedMovie.tagline}"
              </h2>
            )}
            <div className="mt-6">
              <Link
                to={`/movies/${clickedMovie.id}/videos`}
                onClick={showVideo}
                className="mt-8 px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-colors"
              >
                Trailers & Clips
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
