import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LoginedNavbar from "../components/LoginedNavbar";
import { FaRegHeart, FaHeart } from "react-icons/fa"; // Import both outlined and filled heart icons
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import LoadingWrapper from "../components/ui/LoadingWrapper";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import RatingsReviews from "../components/RatingsReview";
import Comments from "../components/Comments";
const drawerWidth = 280;
const type = "webinar";

const WebinarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [webinar, setWebinar] = useState(null);
  const [webinarLiveStatus, setWebinarLiveStatus] = useState(null);
  const [isWatchNowEnabled, setIsWatchNowEnabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false); // State to track if the webinar is in favorites

  const handleCommentAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  // Fetch webinar details
  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(`/webinars/${id}`);
        setWebinar(response.data);
      } catch (error) {
        console.log("Error fetching the webinars");
      }
    })();
  }, [id]);

  // Check webinar live status
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        await axiosInstance.post(`/webinars/${id}/join`);
        setWebinarLiveStatus("Webinar is live");
        setIsWatchNowEnabled(true);
      } catch (error) {
        if (error.response && error.response.status !== 500) {
          setWebinarLiveStatus("Webinar is not live");
        } else {
          setWebinarLiveStatus("Error checking webinar status");
        }
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  // Fetch review stats
  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/${type}s/${id}/reviews/stats`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch review stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewStats();
  }, [type, id]);

  // Fetch all favorites on page load and check if the current webinar is a favorite
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axiosInstance.get("/me");
        console.log(response)
        const favoriteWebinars = response?.data?.favorites?.webinars || [];
        setIsFavorite(favoriteWebinars.some((fav) => fav.item === id));
      } catch (error) {
        console.error("Failed to fetch favorites", error);
      }
    };

    fetchFavorites();
  }, [id]);

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        const deleteresposnce = await axiosInstance.delete(`/webinars/${id}/favorite`);
        console.log(deleteresposnce)
        setIsFavorite(false);
      } else {
        // Add to favorites
        await axiosInstance.post(`/webinars/${id}/favorite`);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite status", error);
    }
  };

  const handleWatchNow = () => {
    if (isWatchNowEnabled) {
      navigate(`/webinar/${id}/user-lobby`);
    }
  };

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
          }}
        />
        <LoadingWrapper loading={loading}>
          <div>{currentUser ? <LoginedNavbar /> : <Navbar />}</div>
          {webinar && (
            <div
              style={{ position: "relative", zIndex: 2 }}
              className="mt-12 mx-4 md:mx-8 flex flex-row items-center justify-start"
            >
              <div>
                <img
                  src={
                    webinar.coverImageUrl ||
                    `${process.env.PUBLIC_URL}/images/Rectangle1.png`
                  }
                  alt=""
                  className="w-full rounded-xl md:w-[288px] h-[296px]"
                />
              </div>
              <div className="mt-10 mx-5 w-full lg:w-2/4 ">
                <div className="flex justify-between items-center">
                  <h1 className="text-white text-3xl font-semibold">
                    {webinar.title}
                  </h1>
                  <div className="mx-0 flex items-center gap-1 text-[#FFC01E]">
                    {[...Array(5)].map((_, index) =>
                      index < Math.round(stats?.averageRating) ? (
                        <FaStar key={index} fontSize="medium" />
                      ) : (
                        <FaRegStar key={index} fontSize="medium" />
                      )
                    )}
                    <p className="text-white text-lg font-medium">
                      {stats.averageRating}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-2 flex-wrap">
                  <p className="text-white text-lg font-medium mr-4">
                    {webinar.startDate.split("T")[0]}
                  </p>
                </div>
                <div className="text-lg font-medium mr-4">
                  <p className="text-[#b2b2b2]">
                    {webinar.startTime} - {webinar.endTime}
                  </p>
                </div>
                <div className="mt-2 mr-0">
                  <p className="text-white text-base line-clamp-1 text-ellipsis">
                    {webinar.description}
                  </p>
                </div>
                <div>
                  {webinarLiveStatus && (
                    <div className="text-white mt-3 border-2 border-white border-dotted w-1/4 rounded-lg flex items-center justify-center py-1 font-semibold">
                      {webinarLiveStatus}
                    </div>
                  )}
                </div>

                <div className="flex flex-col md:flex-row items-center">
                  <button
                    className={`h-16 w-full md:w-36 text-white rounded-2xl mt-3 ${
                      isWatchNowEnabled ? "bg-[#6a55ea]" : "bg-gray-500"
                    }`}
                    onClick={handleWatchNow}
                    disabled={!isWatchNowEnabled}
                  >
                    Watch Now
                  </button>
                  <button
                    className="bg-white h-16 w-full md:w-16 text-black mx-0 md:mx-5 rounded-2xl mt-3 flex justify-center items-center"
                    onClick={toggleFavorite}
                  >
                    {isFavorite ? (
                      <FaHeart className="w-6 h-6 text-red-500" />
                    ) : (
                      <FaRegHeart className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="mt-20 w-1/2">
            <RatingsReviews type="webinar" key={refreshKey} className="z-20" />
          </div>
          <div className="mt-10 w-2/3">
            <Comments onCommentAdded={handleCommentAdded} type="webinar" />
          </div>
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default WebinarDetails;
