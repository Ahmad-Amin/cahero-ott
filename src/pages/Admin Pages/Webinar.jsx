import React from "react";
import { Box } from "@mui/material";
import UpcommingWebinars from "../../components/Admin Components/UpcommingWebinars";
import { Link } from "react-router-dom";

const Webinars = () => {
  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,

          backgroundColor: "#101011",
          minHeight: "100vh",
          padding: 0,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="p-5">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-white py-8">
              Manage Webinars
            </h1>
            <div className="space-x-5">
            <Link to="/dashboard/webinars/create-webinar">
            <button className="w-44 h-12 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300">
              Create Webinar
            </button>
            </Link>
            <Link to="/dashboard/webinars/webinar-lobby">
            <button className="w-44 h-12 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300">
              Stream
            </button>
            </Link>
            </div>
          </div>
          <UpcommingWebinars />
        </div>
      </Box>
    </>
  );
};

export default Webinars;
