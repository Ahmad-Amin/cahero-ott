import React, { useState, useEffect } from "react";
import axiosInstance from "../lib/axiosInstance";
import WebinarCard from "../pages/WebinarCard"; // Assuming WebinarCard is already implemented.
import { useSelector } from "react-redux";
import LoadingWrapper from "../components/ui/LoadingWrapper";
import LoginedNavbar from "../components/LoginedNavbar";
import Navbar from "../components/Navbar";
import { Box } from "@mui/material";
const drawerWidth = 280;

const Favorite = () => {
  const [activeTab, setActiveTab] = useState("webinars");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user);

  const fetchData = async (tab) => {
    setLoading(true);
    try {
      let url;
      switch (tab) {
        case "webinars":
          url = "/webinars/favorites";
          break;
        case "books":
          url = "/books/favorites";
          break;
        case "documents":
          url = "/lectures/favorites";
          break;
        default:
          url = "/webinars/favorites";
      }

      const response = await axiosInstance.get(url);
      console.log("API Response:", response.data); // Debugging log

      // Access items properly from the favorites array
      const items = response?.data?.favorites?.map((fav) => fav.item) || [];
      setData(items);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  const renderContent = () => {
    if (data.length === 0)
      return (
        <p className="w-full h-full text-white font-semibold text-lg flex justify-center items-center">
          No favorites found.
        </p>
      );

    switch (activeTab) {
      case "webinars":
        return (
          <div className="grid grid-cols-4 gap-6 mt-10">
            {data.map((webinar) => (
              <WebinarCard
                key={webinar.id}
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
        );
      case "books":
        return (
          <div className="grid grid-cols-4 gap-6 mt-10">
            {data.map((book) => (
              <div key={book.id} className="book-card">
                <h3>{book.title}</h3>
                <p>Author: {book.author}</p>
              </div>
            ))}
          </div>
        );
      case "documents":
        return (
          <div className="grid grid-cols-4 gap-6 mt-10">
            {data.map((document) => (
              <div key={document.id} className="document-card">
                <h3>{document.name}</h3>
                <p>Uploaded by: {document.uploader}</p>
              </div>
            ))}
          </div>
        );
      default:
        return null;
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

          <div className="ml-8">
            <div className="tabs space-x-10 text-xl font-bold">
              <button
                className={`text-white ${
                  activeTab === "webinars" ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setActiveTab("webinars")}
              >
                Webinars
              </button>
              <button
                className={`text-white ${
                  activeTab === "books" ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setActiveTab("books")}
              >
                Books
              </button>
              <button
                className={`text-white ${
                  activeTab === "documents" ? "opacity-100" : "opacity-60"
                }`}
                onClick={() => setActiveTab("documents")}
              >
                Documents
              </button>
            </div>

            <div className="content">{renderContent()}</div>
          </div>
        </LoadingWrapper>
      </Box>
    </>
  );
};

export default Favorite;
