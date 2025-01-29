import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TvVideoCard = () => {

    const { tv_id } = useParams();
    const [tvApi, setTvApi] = useState([]);
    const [error, setError] = useState('');

    useEffect(()=> {
        fetch(`https://api.themoviedb.org/3/tv/${tv_id}/videos?language=en-US`, {
            method: 'GET',
            headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.REACT_APP_TMDB_API_KEY}`
          }
          })
            .then((res) => {
              if (!res.ok) throw new Error('Failed to fetch videos.');
              return res.json();
            })
            .then((data) => setTvApi(data.results)) 
            .catch((err) => setError(err.message)); 
    },[tv_id])
  return (
    <div className="bg-gray-900 text-white p-8 min-h-screen">
  {error && (
    <p className="bg-red-600 text-center text-white py-2 px-4 rounded-md">
      {error}
    </p>
  )}

  <div className="grid gap-6 mt-6">
    {tvApi.map((tv) => (
      <div
        key={tv.key}
        className="bg-gray-800 p-6 rounded-lg shadow-lg text-center"
      >
        <h1 className="text-lg font-bold mb-4">{tv.type}</h1>
        <iframe
          className="w-full rounded-md shadow-md"
          src={`https://www.youtube.com/embed/${tv.key}`}
          width={560}
          height={315}
          title={tv.type}
          allowFullScreen
        ></iframe>
      </div>
    ))}

    {tvApi.length === 0 && !error && (
      <p className="text-center text-gray-400 text-lg">
        No videos available
      </p>
    )}
  </div>
</div>
  )
}

export default TvVideoCard
