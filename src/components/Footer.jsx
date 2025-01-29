import React from 'react'
import { FcFilmReel } from "react-icons/fc";

const Footer = () => {
  return (
    <div>
      <footer className="fixed left-0 w-full bg-transparent backdrop-blur-md">
        <div className="container mx-auto flex px-8 lg:px-16 py-4">
          <div className="text-2xl font-bold">
            <FcFilmReel />
          </div>
          <h2>HI</h2>
        </div>
      </footer>
    </div>
  )
}

export default Footer
