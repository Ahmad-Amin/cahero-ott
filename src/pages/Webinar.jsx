import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link
import WebinarCard from "./WebinarCard";
import LoginedNavbar from "../components/LoginedNavbar";
import SearchBar from "../components/Searchbar";
import axiosInstance from "../lib/axiosInstance";
import LoadingWrapper from "../components/ui/LoadingWrapper";

const drawerWidth = 280;

const Webinar = () => {
  const [webinars, setWebinars] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/webinars");
        const sortedResults = response.data.results.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // Take the first four items after sorting
        const firstFourResults = sortedResults.slice(0, 4);
        setWebinars(firstFourResults);
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
          <LoginedNavbar />
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
      </LoadingWrapper>
    </Box>
  );
};

export default Webinar;
