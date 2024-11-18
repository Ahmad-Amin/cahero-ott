import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import LoginedNavbar from "../components/LoginedNavbar";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LoadingWrapper from "../components/ui/LoadingWrapper";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import RatingsReviews from "../components/RatingsReview";
import Comments from "../components/Comments";
import { Link, useParams } from "react-router-dom";
import axiosInstance from "../lib/axiosInstance";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateUser } from "../Slice/AuthSlice";
const type = "lecture";

const drawerWidth = 280;

const LectureDetails = () => {
  const [loading, setLoading] = useState(true);
  const [Lecture, setLecture] = useState(null);
  const currentUser = useSelector((state) => state.auth.user);
  const { id: lectureId } = useParams();
  const [refreshKey, setRefreshKey] = useState(0);
  const [stats, setStats] = useState(0);
  const { user } = useSelector((state) => state.auth);

  const [isFavorite, setIsFavorite] = useState(
    user?.favorites?.some((favorite) => favorite.item === lectureId)
  );
  const dispatch = useDispatch();

  const handleCommentAdded = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    const fetchLecture = async () => {
      try {
        const response = await axiosInstance.get(`lectures/${lectureId}`);
        setLecture(response.data);
      } catch (error) {
        console.error("Error fetching lecture data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLecture();
  }, [lectureId]);

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(
          `/${type}s/${lectureId}/reviews/stats`
        );
        setStats(response.data);
      } catch (error) {
        console.error("Failed to fetch review stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviewStats();
  }, [type, lectureId]);

  const toggleFavorite = async () => {
    try {
      setLoading(true);
      if (isFavorite) {
        await axiosInstance.delete(`/lectures/${lectureId}/favorite`);
        setIsFavorite(false);
        toast.success("Removed from Favourites");
      } else {
        await axiosInstance.post(`/lectures/${lectureId}/favorite`);
        setIsFavorite(true);
        toast.success("Added To Favourites");
      }
    } catch (error) {
      console.error("Error toggling favorite status", error);
      toast.error("Error Removing from favorite");
    } finally {
      fetchLatestUsers();
      setLoading(false);
    }
  };

  const fetchLatestUsers = async () => {
    const response = await axiosInstance.get("/me");
    dispatch(updateUser({ user: response.data }));
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
          {Lecture && (
            <div
              style={{ position: "relative", zIndex: 2 }}
              className="mt-12 mx-4 md:mx-8 flex flex-row flex-wrap justify-start"
            >
              <img
                src={
                  Lecture.coverImageUrl ||
                  `${process.env.PUBLIC_URL}/images/Rectangle1.png`
                }
                alt=""
                className="w-full rounded-xl md:w-[288px] h-[296px]"
              />
              <div className="mt-10 mx-5 w-full lg:w-2/4">
                <div className="flex justify-between items-center">
                  <h1 className="text-white text-3xl font-semibold">
                    {Lecture.title}
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
                <div className="flex mt-2 flex-wrap">
                  <p className="text-white font-semibold mr-4">Category: </p>
                  <p className="text-white font-normal opacity-80">
                    {Lecture.category}
                  </p>
                </div>
                <div className="flex mt-2 flex-wrap">
                  <p className="text-white font-semibold mr-4">Duration: </p>
                  <p className="text-white font-normal opacity-80">
                    {Lecture.duration}
                  </p>
                </div>
                <div className="mt-5 mr-0">
                  <p className="text-white font-semibold mr-4">Description: </p>
                  <p className="text-white text-base font-normal opacity-80 line-clamp-1 text-ellipsis">
                    {Lecture.description}
                  </p>
                </div>
                <div className="flex flex-col md:flex-row items-center">
                  <Link to={`/documentaries/details/${lectureId}`}>
                    <button className="h-16 w-full md:w-36 text-white rounded-2xl mt-3 bg-[#6a55ea] hover:bg-[#5242b6] cursor-pointer ease-in-out transition">
                      Play Video
                    </button>
                  </Link>
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
            <RatingsReviews type="lecture" key={refreshKey} className="z-20" />
          </div>
          <div className="mt-10 w-2/3">
            <Comments onCommentAdded={handleCommentAdded} type="lecture" />
          </div>
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default LectureDetails;
