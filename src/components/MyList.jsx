import React, { useEffect, useState } from 'react'

const MyList = () => {
    const [userList, setUserList] = useState([])
    

    useEffect(()=> {
        const savedMovies = localStorage.getItem('myMovie')
        if(savedMovies) {
            setUserList(JSON.parse(savedMovies))
        }
    }, [])

    const removeMovie = (id)=> {
        const updatedList = userList.filter(movie => movie.id !== id)
        setUserList(updatedList)
        localStorage.setItem('myMovie', JSON.stringify(updatedList))
    }

    
  return (
    <div className="bg-gray-900 px-4 py-20 text-white min-h-screen">
        <h2 className="text-2xl px-2 font-bold text-white mb-10">My List</h2>
            {userList.length === 0 ? (
                <p className="text-gray-400 mt-4">No Movies or Tv added yet.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                    {userList.map((movie) => (
                        <div key={movie.id} className="bg-gray-800 p-4 rounded-lg shadow-lg relative">
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                className="rounded-md"
                            />
                            
                            <button 
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full cursor-pointer"
                                onClick={() => removeMovie(movie.id)}
                            >
                                ✖
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
  )
}

export default MyList
