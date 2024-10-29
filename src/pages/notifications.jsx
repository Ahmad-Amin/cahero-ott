import React, { useState, useEffect } from "react";
import LoginedNavbar from "../components/LoginedNavbar";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Box, Button } from "@mui/material";
import axiosInstance from "../lib/axiosInstance";

const drawerWidth = 280;

const NotificationsUser = () => {
  const currentUser = useSelector((state) => state.auth.user);

  const [notifications, setNotifications] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotifications, setTotalNotifications] = useState(0);
  const notificationsPerPage = 15;

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/notifications", {
          params: {
            page: currentPage, // Include current page
            limit: notificationsPerPage, // Limit the number of notifications
          },
        });
        console.log("Full API response: ", response);
        setNotifications(response.data.results);
        setTotalNotifications(response.data.total); // Set total notifications from API response
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notifications: ", err);
        setError("Failed to fetch notifications");
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [currentPage]); // Fetch notifications when currentPage changes

  const handleToggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleNextPage = () => {
    if (currentPage * notificationsPerPage < totalNotifications) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  if (loading) {
    return <div className="text-white mx-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-white mx-5">{error}</div>;
  }

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
        {currentUser ? <LoginedNavbar /> : <Navbar />}

        <div className="font-bold text-4xl text-white mx-5">Notifications</div>

        <div className="text-white mx-5 mt-5">
          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications
              .filter(
                (notification) =>
                  notification.recipientType === "All" ||
                  notification.recipientType === "users"
              )
              .map((notification) => (
                <div
                  key={notification.id}
                  className="mb-4 p-4 bg-[#404041] rounded-lg"
                >
                  <h1 className="font-semibold text-lg text-white">
                    {notification.notificationType}
                  </h1>
                  <div
                    className={`notification-description ${
                      expanded[notification.id] ? "expanded" : ""
                    }`}
                  >
                    {notification.content}
                  </div>
                  <Button
                    variant="text"
                    sx={{ color: "#90caf9" }}
                    onClick={() => handleToggleExpand(notification.id)}
                  >
                    {expanded[notification.id] ? "Show Less" : "View More"}
                  </Button>
                  <div className="text-sm text-gray-400">
                    {notification.createdAt.split("T")[0]}
                  </div>
                </div>
              ))
          ) : (
            <div className="text-white mx-5">No notifications available</div>
          )}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-between mx-5 mt-5">
          <Button
            variant="contained"
            disabled={currentPage === 1}
            onClick={handlePreviousPage}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            disabled={currentPage * notificationsPerPage >= totalNotifications}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      </Box>

      <style jsx>{`
        .notification-description {
          max-height: 3em;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: max-height 0.3s ease;
        }
        .notification-description.expanded {
          max-height: none;
          white-space: normal;
        }
      `}</style>
    </>
  );
};

export default NotificationsUser;
