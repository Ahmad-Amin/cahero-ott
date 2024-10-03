import React from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
function Banner() {
  return (
    <div className="relative">
      <Navbar />
      <img 
        src={`${process.env.PUBLIC_URL}/images/Rectangle.png`} 
        alt="" 
        className="w-full h-[80vh] md:h-[70vh] lg:h-[70vh] xl:h-[70vh] object-cover" // Height adjusts based on screen size
      />
      <div className="absolute bottom-0 left-0 mb-14 p-4 ml-8 text-left">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold mb-5">Ongoing Webinar</h1>
        <p className="text-white text-sm md:text-md lg:text-lg font-normal mb-10">2024 | Webinar genre | 1 Season</p>
        <Link to={'/user-lobby'}>
        <button className="bg-[#6a55ea] hover:bg-[#5242b6] h-12 md:h-16 w-28 md:w-36 text-white rounded-2xl mt-2 ease-in-out transition duration-300">
          Join Now
        </button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
