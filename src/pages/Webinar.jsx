import React from 'react';
import { Box } from '@mui/material';
import { Link } from 'react-router-dom'; // Import Link
import WebinarCard from './WebinarCard';
import LoginedNavbar from '../components/LoginedNavbar';
import SearchBar from '../components/Searchbar';

const drawerWidth = 280;

const Webinar = () => {
  const webinars = [
    {
      id: 1,
      title: 'Tokyo Train',
      year: '2022',
      genre: 'Webinar Genre',
      image: `${process.env.PUBLIC_URL}/images/Tokyotrain.png`,
    },
    {
      id: 2,
      title: 'Moon Fall',
      year: '2023',
      genre: 'Webinar Genre',
      image: `${process.env.PUBLIC_URL}/images/Moonfall.png`,
    },
    {
      id: 3,
      title: 'Life in Paris',
      year: '2022',
      genre: 'Webinar Genre',
      image: `${process.env.PUBLIC_URL}/images/LifeinParis.png`,
    },
    {
      id: 4,
      title: 'House of Gucci',
      year: '2021',
      genre: 'Webinar Genre',
      image: `${process.env.PUBLIC_URL}/images/HouseofGucci.png`,
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
          <p className="text-xl mx-8 text-white font-semibold">Recommended Webinars</p>
          <div className="ml-auto w-auto">
            <SearchBar className="w-full mx-8" />
          </div>
        </div>
        
        <div style={{ position: "relative", zIndex: 2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-4">
          {webinars.map(webinar => (
            <Link to={`/webinar/${webinar.id}`} key={webinar.id}>
              <WebinarCard 
                title={webinar.title}
                year={webinar.year}
                genre={webinar.genre}
                image={webinar.image}
              />
            </Link>
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 2 }} className="mt-12 flex justify-between items-center">
          <p className="text-xl mx-8 text-white font-semibold">Latest Webinars</p>
          <div className="ml-auto w-auto"></div>
        </div>
        
        <div style={{ position: "relative", zIndex: 2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-4">
          {webinars.map(webinar => (
            <Link to={`/webinar/${webinar.id}`} key={webinar.id}>
              <WebinarCard 
                title={webinar.title}
                year={webinar.year}
                genre={webinar.genre}
                image={webinar.image}
              />
            </Link>
          ))}
        </div>
      </Box>
    </>
  );
}

export default Webinar;
