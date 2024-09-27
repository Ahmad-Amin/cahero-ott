import React from "react";
import { Box } from "@mui/material";
import Lectures from "../../components/Admin Components/Lectures";
import { Link } from "react-router-dom";

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
        <div className="flex flex-row items-center gap-6">
          <h1 className="flex-1 text-3xl font-semibold text-white py-8">
            Video Lectures
          </h1>
          <Link to="/dashboard/webinars/create-lecture">
            <button className="w-44 h-12 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300">
              Create Lecture
            </button>
          </Link>
          <div className="flex items-center">
            <label htmlFor="sort" className="text-white text-lg font-semibold mr-2">
              Sort
            </label>
            <select
              id="sort"
              name="sort"
              className="bg-transparent text-white p-2 rounded-lg border h-12 border-[#585858]"
            >
              <option className="bg-[#101011] text-white" value="finance">Finance</option>
              <option className="bg-[#101011] text-white" value="technology">Technology</option>
              <option className="bg-[#101011] text-white" value="health">Health</option>
              <option className="bg-[#101011] text-white" value="education">Education</option>
            </select>
          </div>
        </div>
        <Lectures />
      </div>
    </Box>
  );
};

export default RecordedWebinars;
