import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import WebinarCard from "./WebinarCard";
import LoginedNavbar from "../components/LoginedNavbar";
import SearchBar from "../components/Searchbar";
import axiosInstance from "../lib/axiosInstance";
import LoadingWrapper from "../components/ui/LoadingWrapper";
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";
const drawerWidth = 280;

const Lectures = () => {
  const navigate = useNavigate(); // Hook to handle navigation
  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user); 

  useEffect(() => {
    const fetchDocumentries = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/lectures");
        setLectures(response.data.results);
      } catch (e) {
        console.log("Error getting the lecture", e);
      } finally {
        setLoading(false);
      }
    };

    fetchDocumentries();
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
              All Documentaries
            </p>
            <div className="ml-auto w-auto">
              <SearchBar className="w-full mx-8" />
            </div>
          </div>

          <div
            style={{ position: "relative", zIndex: 2 }}
            className="grid grid-cols-3 gap-6 mx-8 my-4"
          >
            {lectures.map((lecture) => (
              <WebinarCard
                title={lecture.title}
                genre="Webinar Genre"
                height={300}
                image={
                  lecture.coverImageUrl ||
                  `${process.env.PUBLIC_URL}/images/Tokyotrain.png`
                }
                link={`/documentaries/${lecture.id}`}
              />
            ))}
          </div>

          {/* <div
          style={{ position: "relative", zIndex: 2 }}
          className="mt-12 flex justify-between items-center"
        >
          <p className="text-xl mx-8 text-white font-semibold">
            Recommended Documentaries
          </p>
          <div className="ml-auto w-auto"></div>
        </div>

        <div
          style={{ position: "relative", zIndex: 2 }}
          className="grid grid-cols-3 gap-6 mx-8 my-4"
        >
          {recommendedData.map((lecture) => (
            <WebinarCard
              title={lecture.title}
              year={lecture.startDate.split("-")[0]}
              genre="Webinar Genre"
              image={
                lecture.coverImageUrl ||
                `${process.env.PUBLIC_URL}/images/Tokyotrain.png`
              }
              link={`/documentaries/${lecture.id}`}
            />
          ))}
        </div> */}
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default Lectures;
