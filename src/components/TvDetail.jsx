import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TvDetail = () => {
  const { id } = useParams();
  const [clickedTv, setClickedTv] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [myList, setMyList] = useState(()=> {
    const savedMovies = localStorage.getItem('myMovie')
    return savedMovies ? JSON.parse(savedMovies) : []
  })

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

  useEffect(()=> {
    localStorage.setItem('myMovie', JSON.stringify(myList))
  }, [myList])

  const handleAdd = (movie)=> {
    const isMovieInList = myList.some((film) => film.id === movie.id)
    if(isMovieInList) {
        const updatedList = myList.filter((film)=> film.id !== movie.id)
        setMyList(updatedList)
        toast.success(`${movie.name} removed from My List`)
    } else {
        const updatedList = [...myList, movie]
        setMyList(updatedList)
        toast.success(`${movie.name} added to My List`)
    }
  }

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

        <div className="relative">
          <div className="absolute inset-0 bg-black/60 rounded-lg"></div>{" "}
          <div className="relative text-white space-y-4 py-20 sm:py-10 md:py-20 px-6 bg-gray-900/80 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold flex items-center">
                {clickedTv.name}
                {myList.some((film)=> film.id === clickedTv.id) ? (
                    <IoIosRemoveCircleOutline
                        className="ml-2 text-2xl cursor-pointer text-red-400 hover:text-blue-400 transition-colors"
                        onClick={()=> handleAdd(clickedTv)}
                    />
                ) : (
                    <IoIosAddCircleOutline 
                        className="ml-2 text-2xl cursor-pointer text-green-400 hover:text-blue-400 transition-colors"
                        onClick={()=> handleAdd(clickedTv)}
                    />
                )}
            </h2>
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
            <div className="mt-6">
              <Link
                to={`/movies/${clickedTv.id}/videos`}
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

export default TvDetail;
