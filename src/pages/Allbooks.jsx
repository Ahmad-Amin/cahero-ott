import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import LoginedNavbar from "../components/LoginedNavbar";
import SearchBar from "../components/Searchbar";
import WebinarCard from "./WebinarCard";

const drawerWidth = 280;

function Allbooks() {
  // Expanded book data with author, year, genre, and image
  const bookData = [
    {
      id: 1,
      title: "The Black Witch",
      author: "Laurie Forest",
      image: `${process.env.PUBLIC_URL}/images/TheBlackWitch.png`,
    },
    {
      id: 2,
      title: "The Prisoner's Key",
      author: "C.J. Archer",
      image: `${process.env.PUBLIC_URL}/images/ThePrisonersKey.png`,
    },
    {
      id: 3,
      title: "Light Mage",
      author: "Laurie Forest",
      image: `${process.env.PUBLIC_URL}/images/LightMage.png`,
    },
    {
      id: 4,
      title: "The Fire Queen",
      author: "Emily R. King",
      image: `${process.env.PUBLIC_URL}/images/TheFireQueen.png`,
    },
    {
      id: 5,
      title: "The Kidnapper's Accomplice",
      author: "Laurie Forest",
      image: `${process.env.PUBLIC_URL}/images/TheKidnappersAccomplice.png`,
    },
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
              <WebinarCard 
                title={book.title}
                year={book.year}
                genre={book.genre}
                image={book.image}
                // Optional: If you want to display author instead of year
                author={book.author}
              />
            </Link>
          ))}
        </div>
      </Box>
    </>
  );
}

export default Allbooks;
