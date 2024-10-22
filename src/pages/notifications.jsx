import React, { useState } from "react";
import LoginedNavbar from "../components/LoginedNavbar";
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";
import { Box, Button } from "@mui/material";
const drawerWidth = 280;

const NotificationsUser = () => {
  const currentUser = useSelector((state) => state.auth.user); 
  
  const notifications = [
    { id: 1, title: "Notification 1", description: "You have a new message from John.", time: "2 hours ago" },
    { id: 2, title: "Notification 2", description: "Your webinar starts in 30 minutes. Please make sure you are prepared and have all necessary materials ready before joining the session.", time: "3 hours ago" },
    { id: 3, title: "Notification 3", description: "New update availablesdasdasd sdasd asd as das ds as das dasdasd as da  ds d d for your profile settings. This update includes changes to your privacy options, allowing you to customize your account security preferences even further.", time: "1 day ago" },
    { id: 4, title: "Notification 4", description: "You have 3 unread messages. Please check your inbox to ensure you haven't missed anything important.", time: "2 days ago" },
  ];

  const [expanded, setExpanded] = useState({});

  const handleToggleExpand = (id) => {
    setExpanded((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
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
        {currentUser ? <LoginedNavbar /> : <Navbar />}

        <div className="font-bold text-4xl text-white mx-5">
          Notifications
        </div>

        {/* Notification List */}
        <div className="text-white mx-5 mt-5">
          {notifications.map((notification) => (
            <div key={notification.id} className="mb-4 p-4 bg-[#404041] rounded-lg">
              <h1 className="font-semibold text-lg text-white">{notification.title}</h1>
              <div className={`notification-description ${expanded[notification.id] ? "expanded" : ""}`}>
                {notification.description}
              </div>
              <Button
                variant="text"
                sx={{ color: "#90caf9" }}
                onClick={() => handleToggleExpand(notification.id)}
              >
                {expanded[notification.id] ? "Show Less" : "View More"}
              </Button>
              <div className="text-sm text-gray-400">{notification.time}</div>
            </div>
          ))}
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
