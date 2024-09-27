import React from 'react'
import { Box } from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { MdArrowBack } from 'react-icons/md'; // Importing the left arrow icon from React Icons
const CreateWebinar = () => {
    const navigate = useNavigate(); // Use navigate to programmatically go back
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#101011",
          minHeight: "100vh",
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >

        <div>
        <button
        onClick={() => navigate(-1)}  // Navigate back to the previous page
        className="absolute top-4 left-4 flex items-center bg-transparent text-white opacity-75 hover:opacity-100 text-lg font-semibold py-1 px-3 z-10"
      >
        {/* Left Arrow Icon */}
        <MdArrowBack className="mr-2" /> {/* Adding the arrow icon */}
        Back
      </button>
        </div>

       
      </Box>
    </>
  )
}

export default CreateWebinar
