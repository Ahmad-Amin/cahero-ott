import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import WebinarCard from "./WebinarCard";
import LoginedNavbar from "../components/LoginedNavbar";
import SearchBar from "../components/Searchbar";
import axiosInstance from "../lib/axiosInstance";
import LoadingWrapper from "../components/ui/LoadingWrapper";
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";
const drawerWidth = 280;

const Webinar = () => {
  const [webinars, setWebinars] = useState([]);
  const currentUser = useSelector((state) => state.auth.user); 

  const [recordedWebinars, setrecordedWebinars] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/webinars");
        const sortedResults = response.data.results.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setWebinars(sortedResults);
        
        const recoededResponse = await axiosInstance.get("/webinars?type=past");
        const RecordedResults = recoededResponse.data.results.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        setrecordedWebinars(RecordedResults);
      } catch (error) {
        console.log("Error fetching the webinars");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
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
      <LoadingWrapper loading={loading}>
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
        {currentUser ? <LoginedNavbar  /> : <Navbar />}

        </div>
        <div
          style={{ position: "relative", zIndex: 2 }}
          className="mt-12 flex justify-between items-center"
        >
          <p className="text-xl mx-8 text-white font-semibold">
            Recommended Webinars
          </p>
          <div className="ml-auto w-auto">
            <SearchBar className="w-full mx-8" />
          </div>
        </div>

        <div
          style={{ position: "relative", zIndex: 2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-4"
        >
          {webinars.map((webinar) => (
            <WebinarCard
              title={webinar.title}
              year={webinar.startDate.split("-")[0]}
              genre="Webinar Genre"
              image={
                webinar.coverImageUrl ||
                `${process.env.PUBLIC_URL}/images/Tokyotrain.png`
              }
              link={`/webinar/${webinar.id}`}
            />
          ))}
        </div>

        <div
          style={{ position: "relative", zIndex: 2 }}
          className="mt-12 flex justify-between items-center"
        >
          <p className="text-xl mx-8 text-white font-semibold">
            Latest Webinars
          </p>
          <div className="ml-auto w-auto"></div>
        </div>

        <div
          style={{ position: "relative", zIndex: 2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-4"
        >
          {recordedWebinars.map((webinar) => (
            <WebinarCard
              title={webinar.title}
              year={webinar.startDate.split("-")[0]}
              genre="Webinar Genre"
              image={
                webinar.coverImageUrl ||
                `${process.env.PUBLIC_URL}/images/Tokyotrain.png`
              }
              link={`/webinar/${webinar.id}`}
            />
          ))}
        </div>
      </LoadingWrapper>
    </Box>
  );
};

export default Webinar;
