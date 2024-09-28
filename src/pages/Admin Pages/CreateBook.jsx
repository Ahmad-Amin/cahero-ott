import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const CreateBook = () => {
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
              Create New Book
            </h1>
            <Link to="/dashboard/book-creation">
              <button className="w-44 h-12 hover:bg-[#b22c2c] bg-[#e53939] text-white text-lg font-semibold rounded-xl ease-in-out transition duration-300">
                Cancel
              </button>
            </Link>
          </div>

          {/* Flexbox for 60% form and 40% image upload */}
          <div className="flex flex-col md:flex-row gap-10">
            {/* Form Section - 60% */}
            <div className="flex-1 w-full md:w-4/6 py-8">
              <div>
                <label
                  htmlFor="Book_title"
                  className="text-white font-normal text-lg block mb-2"
                >
                  Book Title
                </label>
                <input
                  type="text"
                  id="Book_title"
                  className="w-full h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
                  placeholder="Enter Book Title"
                  required
                />
              </div>
              <div className="flex flex-col md:flex-row gap-10 mt-5">
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="author_name"
                    className="text-white font-normal text-lg block mb-2"
                  >
                    Author Name
                  </label>
                  <input
                    type="text"
                    id="author_name"
                    className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3"
                    placeholder="Enter Author Name" // Placeholder to indicate the expected format
                    required
                  />
                </div>
                <div className="w-full md:w-1/2">
                  <label
                    htmlFor="category"
                    className="text-white font-normal text-lg block mb-2"
                  >
                    Genre
                  </label>
                  <select
                    id="sort"
                    name="category"
                    className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                  >
                    <option className="bg-[#101011] text-white" value="finance">
                      Finance
                    </option>
                    <option
                      className="bg-[#101011] text-white"
                      value="technology"
                    >
                      Technology
                    </option>
                    <option className="bg-[#101011] text-white" value="health">
                      Health
                    </option>
                    <option
                      className="bg-[#101011] text-white"
                      value="education"
                    >
                      Education
                    </option>
                  </select>
                </div>
              </div>
              <div className="mt-5">
                <label
                  htmlFor="overview"
                  className="text-white font-normal text-lg block mb-2"
                >
                  Overview
                </label>
                <textarea
                  id="overview"
                  className="w-full h-32 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 pt-4 resize-none"
                  placeholder="Overview"
                  required
                />
              </div>

              {/* Video Upload Section */}
              <div className="mt-5 relative">
                <label
                  className="text-white font-normal text-lg block mb-2"
                  htmlFor="audio-upload"
                >
                  Audio File
                </label>
                <input
                  type="file"
                  id="audio-upload"
                  name="audioUpload"
                  accept="audio/mp3"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  required
                />
                <div className="w-full h-16 rounded-xl border-2 border-white bg-transparent px-3 text-white flex items-center justify-between">
                  <span className="text-white">Choose MP3 Audio(Optional)</span>
                  <FileUploadIcon
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6 text-white"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </FileUploadIcon>
                </div>
              </div>
            </div>

            {/* Image Upload Section - 40% */}
            <div className="flex flex-col items-center w-full md:w-1/3 h-full py-8">
              <label className="text-white font-semibold mb-2">
                Cover Image
              </label>
              <div className="border-dashed border-2 border-white rounded-lg w-3/4 h-80 flex flex-col items-center justify-center text-white bg-transparent hover:bg-gray-800 transition duration-200">
                <input
                  type="file"
                  className="opacity-0 absolute"
                  accept="image/*"
                />
                <span className="text-lg">Upload</span>
                <span className="text-gray-400">or drag and drop</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-end gap-6 mt-8 ml-16 w-3/5">
            <div className="">
              <button className="w-56 h-12 bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 rounded-xl text-white font-semibold text-lg">
                Save Book
              </button>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default CreateBook;
