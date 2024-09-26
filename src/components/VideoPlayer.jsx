import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md'; // Importing the left arrow icon from React Icons

const VideoPlayer = () => {
  const navigate = useNavigate(); // Use navigate to programmatically go back

  return (
    <div className="relative w-full max-w-full mx-auto bg-[#131213] flex items-center justify-center content-center">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}  // Navigate back to the previous page
        className="absolute top-4 left-4 flex items-center bg-transparent text-white opacity-75 hover:opacity-100 text-lg font-semibold py-1 px-3 z-10"
      >
        {/* Left Arrow Icon */}
        <MdArrowBack className="mr-2" /> {/* Adding the arrow icon */}
        Back
      </button>

      {/* Video Player */}
      <div className="w-full h-0 pb-[47.7%]"> {/* Aspect ratio 16:9 */}
        <video
          src="https://youtu.be/it1rTvBcfRg" // Replace with your video source link
          className="absolute top-0 left-0 w-full h-full"
          controls
          autoPlay
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default VideoPlayer;
