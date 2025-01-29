import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const TvDetail = () => {
  const { id } = useParams();
  const [clickedTv, setClickedTv] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/tv/${id}?language=en-US`, {
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
      .then((data) => setClickedTv(data))
      .catch((err) => setError(err.message));
  }, [id]);

  const showVideo = () => {
    navigate(`/tv/${id}/videos`);
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!clickedTv) {
    return <p>Loading...</p>;
  }
  return (
    <div
      className="relative bg-cover bg-center bg-no-repeat min-h-screen"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w500${clickedTv.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center  lg:items-start px-6 lg:px-20 py-20 gap-8">
        <div className="w-64 lg:w-80 py-20 sm:py-20 md:py-20 lg:py-20 xl:py-20">
          <img
            src={`https://image.tmdb.org/t/p/w200${clickedTv.poster_path}`}
            alt={clickedTv.title}
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="text-white space-y-4 py-20 sm:py-10 md:py-20">
          <h2 className="text-3xl font-bold">{clickedTv.title}</h2>
          <p className="text-lg">
            <span className="font-semibold">Rating: </span>
            {clickedTv.vote_average.toFixed(1)} ⭐️
          </p>
          <p className="text-lg">
            <span className="font-semibold">Overview: </span>
            {clickedTv.overview}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Genre: </span>
            {clickedTv.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-lg">
            <span className="font-semibold">First Episode: </span>
            {clickedTv.first_air_date}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Last Episode: </span>
            {clickedTv.last_air_date}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Seasons: </span>
            {clickedTv.number_of_seasons}
          </p>
          <p className="text-lg">
            <span className="font-semibold">Status: </span>
            {clickedTv.status}
          </p>
          {clickedTv.tagline && (
            <p className="italic text-lg text-gray-300">
              "{clickedTv.tagline}"
            </p>
          )}
          <div className="mt-6">
            <Link
              to={`/tv/${clickedTv.id}/videos`}
              onClick={showVideo}
              className="mt-8 px-6 py-2 bg-gray-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 transition-colors"
            >
              Trailers & Clips
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvDetail;
