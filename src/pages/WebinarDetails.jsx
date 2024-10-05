import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LoginedNavbar from "../components/LoginedNavbar";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa6";
import WebinarCard from "../pages/WebinarCard";
import { useParams } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";

const drawerWidth = 280;

const WebinarDetails = () => {

  const {id}  = useParams()
  const [webinar, setWebinar] = useState()
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`/webinars/${id}`);
        setWebinar(response.data);
      } catch (error) {
        console.log("Error fetching the webinars");
      }
    })();
  }, []);


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
        <div
          style={{ position: "relative", zIndex: 2 }}
          className="mt-12 mx-4 md:mx-8 flex flex-row flex-wrap justify-start"
        >
          <img
            src={`${process.env.PUBLIC_URL}/images/Rectangle1.png`}
            alt=""
            className="w-full md:w-auto"
          />
          <div className="mt-10 mx-5 w-full lg:w-2/4">
            <div className="flex justify-between items-center">
              <h1 className="text-white text-3xl font-semibold">{webinar.title}</h1>
              <div className="mx-0 flex items-center gap-1">
                <FaStar className="text-[#FFC01E]" />
                <p className="text-white text-lg font-medium">7.8/10</p>
              </div>
            </div>
            <div className="flex justify-between mt-2 flex-wrap">
              <p className="text-white text-lg font-medium mr-4">{webinar.startDate.split('-')[0]}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Climate Change&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2h 38m</p>
            </div>
            <div className="mt-5 mr-0">
              <p className="text-white text-base">
                {webinar.description}
              </p>
            </div>
            <div className="flex flex-col md:flex-row items-center">
              <button className="bg-[#6a55ea] h-16 w-full md:w-36 text-white rounded-2xl mt-3">
                Watch Now
              </button>
              <button className="bg-white h-16 w-full md:w-16 text-black mx-0 md:mx-5 rounded-2xl mt-3 flex justify-center items-center">
                <FaRegHeart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
        <div>
          <h1
            style={{ position: "relative", zIndex: 2 }}
            className="text-white text-2xl font-semibold ml-4 md:ml-8 mt-16 p-4"
          >
            Related Webinars
          </h1>
          <div
            style={{ position: "relative", zIndex: 2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-4 md:mx-8 my-4"
          >
            <WebinarCard
          title="Tokyo Train"
          year="2022"
          genre="Webinar Genre"
          image={`${process.env.PUBLIC_URL}/images/Tokyotrain.png`}
        />
        <WebinarCard
          title="Moon Fall"
          year="2023"
          genre="Webinar Genre"
          image={`${process.env.PUBLIC_URL}/images/Moonfall.png`}
        />
        <WebinarCard
          title="Life in Paris"
          year="2022"
          genre="Webinar Genre"
          image={`${process.env.PUBLIC_URL}/images/LifeinParis.png`}
        />
        <WebinarCard
          title="House of Gucci"
          year="2021"
          genre="Webinar Genre"
          image={`${process.env.PUBLIC_URL}/images/HouseofGucci.png`}
        />
          </div>
        </div>
      </Box>
    </>
  );
};

export default WebinarDetails;
