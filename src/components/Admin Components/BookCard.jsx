import React, { useState } from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import ConfirmDelete from "../../components/Admin Components/ConfirmDelete"; // Import the DeleteConfirmation component
import { Link } from "react-router-dom";

const BookCardGrid = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [itemToDelete, setItemToDelete] = useState(null); // State to store the selected item for deletion

  const handleDeleteConfirm = () => {
    console.log("Deleted:", itemToDelete); // Log or perform deletion for the selected item
    setIsModalOpen(false);
  };

  const books = [
    {
      image: `${process.env.PUBLIC_URL}/images/books/book1.png`,
      title: "Three Books of Occult Philosophy",
      author: "Sunil Kapadia",
    },
    {
      image: `${process.env.PUBLIC_URL}/images/books/book2.png`,
      title: "Zero to One",
      author: "Sunil Kapadia",
    },
    {
      image: `${process.env.PUBLIC_URL}/images/books/book3.png`,
      title: "Start Your Own Business",
      author: "Sunil Kapadia",
    },
    {
      image: `${process.env.PUBLIC_URL}/images/books/book4.png`,
      title: "Hooked",
      author: "Sunil Kapadia",
    },
  ];

  const handleDeleteClick = (book) => {
    setItemToDelete(book); // Set the selected item to be deleted
    setIsModalOpen(true); // Open the modal
  };

  return (
    <>
      <div className="min-h-screen bg-transparent p-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {books.map((book, index) => (
            <div
              key={index}
              className="bg-transparent rounded-lg shadow-lg overflow-hidden transform transition duration-500 hover:scale-105"
            >
              <img
                src={book.image}
                alt={book.title}
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
                  <Link to={"/dashboard/book-creation/manage-book"}>
                    {" "}
                    <EditIcon className="text-[#05c283] hover:text-[#038f60]" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
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
