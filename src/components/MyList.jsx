import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

const MyList = () => {
    const { id } = useParams();
    const [selectedMovie, setSelectedMovie] = useState([])

    const [userList, setUserList] = useState(()=> {
        const savedMovie = localStorage.getItem('myMovie');
        return savedMovie ? JSON.parse(savedMovie) : []
    })

    const [addMovie, setAddMovie] = useState(false)

    
  return (
    <div>
      
    </div>
  )
}

export default MyList
