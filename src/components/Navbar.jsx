import React from 'react'
import { FcFilmReel } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-md">
        <div className="container mx-auto flex px-8 lg:px-16 py-4">
          <Link to='/' className="text-2xl font-bold">
            <FcFilmReel />
          </Link>
          <ul className="flex ml-6 text-white space-x-6 text-lg">
            <li className="hover:text-blue-500 transition-colors cursor-pointer">
              <Link to='/' > Home </Link>
            </li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer">
              <Link to='/movies'> Movies </Link>
            </li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer">
              <Link to='/tv'>TV</Link>
            </li>
            <li className="hover:text-blue-500 transition-colors cursor-pointer">
              My List
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
