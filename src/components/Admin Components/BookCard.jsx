import React, { useState, useEffect } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDelete from "../../components/Admin Components/ConfirmDelete";
import { Link } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance";

const BookCardGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [books, setBooks] = useState([]); // Ensure this starts as an array
  const fallbackImageUrl = `${process.env.PUBLIC_URL}/images/book1.png`; // Fallback image URL

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axiosInstance.get("/books");
        console.log(response.data.results); // Log the response data to check the structure

        if (Array.isArray(response.data.results)) {
          setBooks(response.data.results); // Set the fetched books data to state
        } else {
          console.error("Books data is not an array");
        }
      } catch (error) {
        console.error("Error fetching books data:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteConfirm = async () => {
    if (itemToDelete) {
      try {
        await axiosInstance.delete(`/books/${itemToDelete.id}`);
        // Optionally refresh the books list after deletion
        setBooks((prevBooks) => prevBooks.filter(book => book.id !== itemToDelete.id));
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
    setIsModalOpen(false);
  };

  const handleDeleteClick = (book) => {
    setItemToDelete(book);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="min-h-screen bg-transparent p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {books.length > 0 ? (
            books.map((book) => (
              <div
                key={book.id} // Use the book ID as the key
                className="bg-transparent rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
              >
                <img
                  src={book.coverImageUrl || fallbackImageUrl} // Use fallback if no coverImageUrl
                  alt={book.title}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop if fallback image also fails
                    e.target.src = fallbackImageUrl; // Set fallback image
                  }}
                  className="w-full h-auto object-cover scale-105"
                />

                <div className="p-4 h-auto space-y-3 flex flex-col justify-between">
                  <h3 className="text-lg font-semibold h-14 text-white">
                    {book.title}
                  </h3>
                  <p className="text-white text-sm opacity-75">
                    By {book.author}
                  </p>
                  <div className="space-x-2">
                    <DeleteOutlineIcon
                      className="text-[#e53939] hover:text-[#b22c2c]"
                      onClick={() => handleDeleteClick(book)}
                    />
                    {/* Update Link to include book ID */}
                    <Link to={`/dashboard/book-creation/${book.id}/manage-book`}>
                      <EditIcon className="text-[#05c283] hover:text-[#038f60]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No books available</p>
          )}
        </div>
      </div>
      <ConfirmDelete
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemType="book"
      />
    </>
  );
};

export default BookCardGrid;
