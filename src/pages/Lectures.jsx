import React from 'react';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import WebinarCard from './WebinarCard';
import LoginedNavbar from '../components/LoginedNavbar';
import SearchBar from '../components/Searchbar';

const drawerWidth = 280;

const Lectures = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to handle card click and navigate to the appropriate video player route
  const handleCardClick = (id) => {
    navigate(`/lectures/${id}`);
  };

  // Dataset for lectures
  const lectureData = [
    {
      id: 1, // Add an id property
      title: "Affection of Love",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/AffectionOfLove.png`,
      height: "250px",
    },
    {
      id: 2, // Add an id property
      title: "Physical Activities",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/PhysicalActivities.png`,
      height: "250px",
    },
    {
      id: 3, // Add an id property
      title: "Study of Stars",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/StudyOfStars.png`,
      height: "250px",
    },
  ];

  // Dataset for recommended lectures
  const recommendedData = [
    {
      id: 1, // Add an id property
      title: "Affection of Love",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/AffectionOfLove.png`,
      height: "250px",
    },
    {
      id: 2, // Add an id property
      title: "Physical Activities",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/PhysicalActivities.png`,
      height: "250px",
    },
    {
      id: 3, // Add an id property
      title: "Study of Stars",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/StudyOfStars.png`,
      height: "250px",
    },
  ];

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
            zIndex: 1,
          }}
        />
        <div>
          <LoginedNavbar />
        </div>
        <div style={{ position: "relative", zIndex: 2 }} className="mt-12 flex justify-between items-center">
          <p className="text-xl mx-8 text-white font-semibold">All Lectures</p>
          <div className="ml-auto w-auto">
            <SearchBar className="w-full mx-8" />
          </div>
        </div>
        
        <div style={{ position: "relative", zIndex: 2 }} className="grid grid-cols-3 gap-6 mx-8 my-4">
          {lectureData.map((lecture) => (
            <div className="main" key={lecture.id} onClick={() => handleCardClick(lecture.id)}> {/* Wrap card with div for click handling */}
              <WebinarCard
                title={lecture.title}
                year={lecture.year}
                genre={lecture.genre}
                image={lecture.image}
                height={lecture.height}
              />
            </div>
          ))}
        </div>
        
        <div style={{ position: "relative", zIndex: 2 }} className="mt-12 flex justify-between items-center">
          <p className="text-xl mx-8 text-white font-semibold">Recommended Lectures</p>
          <div className="ml-auto w-auto"></div>
        </div>
        
        <div style={{ position: "relative", zIndex: 2 }} className="grid grid-cols-3 gap-6 mx-8 my-4">
          {recommendedData.map((lecture) => (
            <div className="main" key={lecture.id} onClick={() => handleCardClick(lecture.id)}> {/* Wrap card with div for click handling */}
              <WebinarCard
                title={lecture.title}
                year={lecture.year}
                genre={lecture.genre}
                image={lecture.image}
                height={lecture.height}
              />
            </div>
          ))}
        </div>
      </Box>
    </>
  );
}

export default Lectures;
