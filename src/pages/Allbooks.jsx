import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import LoginedNavbar from "../components/LoginedNavbar";
import SearchBar from "../components/Searchbar";
import WebinarCard from "./WebinarCard";

const drawerWidth = 280;

function Allbooks() {
  const bookData = [
    { id: 1, title: "Book 1" },
    { id: 2, title: "Book 2" },
    { id: 3, title: "Book 3" },
    { id: 4, title: "Book 4" },
    { id: 5, title: "Book 5" },
  ]; // Example book data

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
            zIndex: 1,
          }}
        />
        <LoginedNavbar />
        <div style={{ position: "relative", zIndex: 2 }} className="mt-12 flex justify-between items-center">
          <p className="text-xl mx-8 text-white font-semibold">All Books</p>
          <div className="ml-auto w-auto">
            <SearchBar className="w-full" />
          </div>
        </div>
        
        <div style={{ position: "relative", zIndex: 2 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-4">
          {bookData.map((book) => (
            <Link to={`/all-books/${book.id}`} key={book.id}>
              <WebinarCard title={book.title} />
            </Link>
          ))}
        </div>
      </Box>
    </>
  );
}

export default Allbooks;
