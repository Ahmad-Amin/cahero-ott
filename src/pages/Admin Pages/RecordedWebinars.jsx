import React from "react";
import { Box } from "@mui/material";
import Recordings from "../../components/Admin Components/Recordings";

const RecordedWebinars = () => {
  return (
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
      <div className="">
        <h1 className="text-3xl font-semibold text-white py-8">
          Recorded Webinars
        </h1>
        <Recordings/>
      </div>
      </div>
    </Box>
  );
};

export default RecordedWebinars;
