import React from 'react';
import { Box } from '@mui/material';
import WebinarCard from './WebinarCard';
import LoginedNavbar from '../components/LoginedNavbar';
import SearchBar from '../components/Searchbar';

const drawerWidth = 280;

const Lectures = () => {
  // Dataset for lectures
  const lectureData = [
    {
      title: "Affection of Love",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/AffectionOfLove.png`,
      height: "250px",
    },
    {
      title: "Physical Activities",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/PhysicalActivities.png`,
      height: "250px",
    },
    {
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
      title: "Affection of Love",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/AffectionOfLove.png`,
      height: "250px",
    },
    {
      title: "Physical Activities",
      year: "2022",
      genre: "Tutor Name",
      image: `${process.env.PUBLIC_URL}/images/PhysicalActivities.png`,
      height: "250px",
    },
    {
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
          {lectureData.map((lecture, index) => (
            <WebinarCard
              key={index}
              title={lecture.title}
              year={lecture.year}
              genre={lecture.genre}
              image={lecture.image}
              height={lecture.height} // Passing the height prop
            />
          ))}
        </div>
        
        <div style={{ position: "relative", zIndex: 2 }} className="mt-12 flex justify-between items-center">
          <p className="text-xl mx-8 text-white font-semibold">Recommended Lectures</p>
          <div className="ml-auto w-auto"></div>
        </div>
        
        <div style={{ position: "relative", zIndex: 2 }} className="grid grid-cols-3 gap-6 mx-8 my-4">
          {recommendedData.map((lecture, index) => (
            <WebinarCard
              key={index}
              title={lecture.title}
              year={lecture.year}
              genre={lecture.genre}
              image={lecture.image}
              height={lecture.height} // Passing the height prop
            />
          ))}
        </div>
      </Box>
    </>
  );
}

export default Lectures;
