import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import LoginedNavbar from "../components/LoginedNavbar";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { FiPlayCircle } from "react-icons/fi";
import { RiBook2Line } from "react-icons/ri";
import AudioPlayer from "../components/AudioPlayer"; // Import your AudioPlayer component
import { useNavigate, useLocation } from "react-router-dom"; // Import useNavigate and useLocation
import { MdArrowBack } from "react-icons/md"; // Importing the left arrow icon from React Icons

const drawerWidth = 280;

const BookDetails = () => {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false); // State to control AudioPlayer rendering
  const navigate = useNavigate(); // Create a navigate function
  const location = useLocation(); // Get the current location

  useEffect(() => {
    // Check if the current location is /read-book or /book-details
    const handleNavigation = () => {
      if (
        location.pathname !== "/read-book" &&
        location.pathname !== "/book-details"
      ) {
        setIsAudioPlaying(false); // Stop audio if navigated away from both routes
      }
    };

    // Listen for location changes
    handleNavigation();
  }, [location.pathname]);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          backgroundColor: "#131213",
          minHeight: "100vh",
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "70px",
            height: "100%",
            background:
              "linear-gradient(to right, #220e37 0%, rgba(34, 14, 55, 0) 100%)",
            zIndex: 0,
          }}
        />
        <LoginedNavbar />
        <button
          style={{ zIndex: 3 }} // Set a higher zIndex here
          onClick={() => navigate(-1)}
          className="flex items-center bg-transparent text-white mx-5 opacity-75 hover:opacity-100 text-lg font-semibold"
        >
          <MdArrowBack className="mr-2" />
          BACK
        </button>

        <Box
          sx={{
            position: "relative",
            zIndex: 2,
            mt: 2,
            mx: { xs: 2, md: 8 },
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "auto 1fr" },
            gap: { xs: 2, md: 4 },
          }}
        >
          <img
            className="w-full md:w-64"
            src={`${process.env.PUBLIC_URL}/images/image1.png`}
            alt="Book cover"
          />
          <Box className="mt-10" sx={{ flexGrow: 1 }}>
            <Typography className="text-white text-xl font-medium">
              Harry Potter and the Sorcer...
            </Typography>
            <Typography className="text-white text-base font-normal">
              J.K. Rownlings
            </Typography>
            <Box className="flex items-center gap-1 mt-2">
              <FaStar className="text-[#FFC01E]" />
              <FaStar className="text-[#FFC01E]" />
              <FaStar className="text-[#FFC01E]" />
              <FaStar className="text-[#FFC01E]" />
              <FaRegStar className="text-[#FFC01E]" />
              <Typography className="text-white text-lg font-normal">
                4.0
              </Typography>
            </Box>
            <Box className="flex items-center gap-2 mt-2">
              {["Fantasy", "Drama", "Fiction"].map((genre) => (
                <Box
                  key={genre}
                  className="border border-white rounded-xl text-white text-xs font-semibold px-3 py-1"
                >
                  {genre}
                </Box>
              ))}
            </Box>
            <Box className="flex items-center mt-3 gap-3">
              <Box className="flex items-center mt-3">
                <Button
                  variant="contained"
                  onClick={() => setIsAudioPlaying(true)} // Set state to true on button click
                  sx={{
                    backgroundColor: "#6a55ea", // Your desired color
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#5a47d1", // Darker shade on hover
                    },
                    height: "64px",
                    width: "160px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                  }}
                >
                  <FiPlayCircle />
                  Play Audio
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate("/read-book")} // Navigate to /read-book on button click
                  sx={{
                    borderColor: "white", // White border
                    color: "white", // White text
                    height: "64px",
                    width: "160px",
                    marginLeft: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.1)", // Lighten background on hover
                    },
                  }}
                >
                  <RiBook2Line />
                  Read Book
                </Button>
              </Box>
            </Box>

            {/* Conditionally render AudioPlayer inside the Box */}
          </Box>
        </Box>
        <Box
          sx={{ position: "relative", zIndex: 2, mt: 4, mx: { xs: 2, md: 8 } }}
        >
          <Typography className="text-white font-semibold text-sm">
            Summary
          </Typography>
          <Typography className="text-white font-light text-sm mt-2 opacity-70">
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet. Mollit non deserunt ullamco est
            sit aliqua dolor do amet sint. Velit officia consequat duis enim
            velit mollit. Exercitation veniam consequat sunt. Velit officia
            consequat duis enim velit mollit. Amet minim mollit non deserunt
            ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit. Exercitation veniam consequat sunt nostrud
            amet.
          </Typography>
        </Box>
        {isAudioPlaying && (
          <Box sx={{ mt: 3 }}>
            <AudioPlayer />
          </Box>
        )}
      </Box>
    </>
  );
};

export default BookDetails;
