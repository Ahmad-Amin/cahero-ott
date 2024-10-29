import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import LoginedNavbar from "../components/LoginedNavbar";
import SearchBar from "../components/Searchbar";
import WebinarCard from "./WebinarCard";
import axiosInstance from "../lib/axiosInstance";
import LoadingWrapper from "../components/ui/LoadingWrapper";
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";


const drawerWidth = 280;

function Allbooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector((state) => state.auth.user); 

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/books");
        const sortedResults = response.data.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });

        // Take the first four items after sorting
        const firstFourResults = sortedResults.slice(0, 4);
        setBooks(firstFourResults);
      } catch (error) {
        console.log("Error fetching the webinars");
      } finally {
        setLoading(false);
      }
    })();
  }, []);
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
      {currentUser ? <LoginedNavbar  /> : <Navbar />}
      <div
          style={{ position: "relative" }}
          className="mt-12 flex justify-between items-center"
        >
          <p className="text-xl mx-8 text-white font-semibold">All Books</p>
          <div className="ml-auto w-auto">
            <SearchBar className="w-full" />
          </div>
        </div>

        <LoadingWrapper loading={loading} >
          <div
            style={{ position: "relative" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mx-8 my-4"
          >
            {books.map((book) => (
              <WebinarCard
                title={book.title}
                genre="Book Genre"
                image={
                  book.coverImageUrl ||
                  `${process.env.PUBLIC_URL}/images/Tokyotrain.png`
                }
                link={`/all-books/${book.id}`}
              />
            ))}
          </div>
        </LoadingWrapper>
      </Box>
    </>
  );
}

export default Allbooks;
