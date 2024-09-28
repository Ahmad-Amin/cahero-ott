import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import BookCardGrid from "../../components/Admin Components/BookCard";


const drawerWidth = 70;


const BookCreation = () => {

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
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
            Book Management
          </h1>
          <Link to="/dashboard/book-creation/create-new-book">
            <button className="w-44 h-12 hover:bg-[#5242b6] bg-[#6a55ea] text-white text-lg font-semibold rounded-lg ease-in-out transition duration-300">
              Create New
            </button>
          </Link>
          </div>
          <p className="font-normal text-base text-white opacity-60">Manage or Add new book</p>
          </div>
        <div>
        <BookCardGrid />
        </div>
      </Box>

    
    </>
  );
};

export default BookCreation;
