import React from "react";
import { FcFilmReel } from "react-icons/fc";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-transparent backdrop-blur-md py-4">
      <div className="container mx-auto flex justify-center items-center text-white text-lg">
        <Link to='/'>
            <FcFilmReel className="text-2xl mr-2" />
        </Link>
        <p>&copy; {new Date().getFullYear()} Movie App. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
