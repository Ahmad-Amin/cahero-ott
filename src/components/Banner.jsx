import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import LoginedNavbar from "./LoginedNavbar";
import axiosInstance from "../lib/axiosInstance";

function Banner() {
  const currentUser = useSelector((state) => state.auth.user);
  const [latestWebinar, setLatestWebinar] = useState(null);

  useEffect(() => {
    const fetchLatestWebinar = async () => {
      try {
        const response = await axiosInstance.get("/webinars");
        if (response.data && response.data.length > 0) {
          const sortedWebinars = response.data.sort(
            (a, b) => new Date(b.startDate) - new Date(a.startDate)
          );
          setLatestWebinar(sortedWebinars[0]);
        }
      } catch (error) {
        console.error("Failed to fetch webinars:", error);
      }
    };

    fetchLatestWebinar();
  }, []);

  return (
    <div className="relative">
      {currentUser ? <LoginedNavbar position="absolute" /> : <Navbar position="absolute" />}
      <img
        src={
          latestWebinar?.coverImageUrl ||
          `${process.env.PUBLIC_URL}/images/Rectangle.png`
        }
        alt="Webinar Banner"
        className="w-full h-[80vh] md:h-[70vh] lg:h-[70vh] xl:h-[70vh] object-cover"
      />
      {/* Gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 mb-14 p-4 ml-8 text-left">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-semibold mb-5">
          {latestWebinar ? latestWebinar.title : "Ongoing Webinar"}
        </h1>
        <p className="text-white text-sm md:text-md lg:text-lg font-normal mb-10">
          {latestWebinar
            ? `${new Date(latestWebinar.startDate).getFullYear()} | ${latestWebinar.type || "Webinar genre"}`
            : "2024 | Webinar genre | 1 Season"}
        </p>
      </div>
    </div>
  );
}

export default Banner;
