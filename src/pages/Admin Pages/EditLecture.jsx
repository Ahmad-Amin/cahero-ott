import React, { useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDelete from "../../components/Admin Components/ConfirmDelete"; // Import the DeleteConfirmation component

const EditLecture = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [itemToDelete, setItemToDelete] = useState(null); // State to store the selected item for deletion
  const [lecture, setLecture] = useState({
    title: "",
    duration: "",
    category: "",
    overview: "",
    video: null,
    coverImage: null,
  });

  const handleDeleteConfirm = () => {
    console.log("Deleted:", itemToDelete); // Log or perform deletion for the selected item
    setIsModalOpen(false);
  };

  const handleDeleteClick = (lecture) => {
    setItemToDelete(lecture); // Set the selected item to be deleted
    setIsModalOpen(true); // Open the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLecture((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setLecture((prevState) => ({
      ...prevState,
      [name]: files[0], // Capture file for video or cover image
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log("Lecture Updated:", lecture);
  };

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
            <h1 className="text-3xl font-semibold text-white py-8">Edit Lecture</h1>
            <div className="space-x-3">
            <Link to="/dashboard/video-lecture">
              <button className="w-44 h-12 hover:bg-[#b22c2c] bg-[#e53939] text-white text-lg font-semibold rounded-xl ease-in-out transition duration-300">
                Cancel
              </button>
            </Link>
            <DeleteOutlineIcon
              className="text-[#e53939] cursor-pointer hover:text-[#b22c2c]  ease-in-out transition-colors duration-300"
              onClick={() => handleDeleteClick(lecture)} 
            />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex-1 w-full md:w-4/6 py-8">
              {/* Lecture Title */}
              <div>
                <label htmlFor="lecture_title" className="text-white font-normal text-lg block mb-2">
                  Lecture Title
                </label>
                <input
                  type="text"
                  id="lecture_title"
                  name="title"
                  value={lecture.title}
                  onChange={handleInputChange}
                  className="w-full h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
                  placeholder="Enter Lecture Title"
                  required
                />
              </div>

              {/* Duration and Category */}
              <div className="flex flex-col md:flex-row gap-10 mt-5">
                <div className="w-full md:w-1/2">
                  <label htmlFor="duration" className="text-white font-normal text-lg block mb-2">
                    Duration of Lecture
                  </label>
                  <input
                    type="text"
                    id="duration"
                    name="duration"
                    value={lecture.duration}
                    onChange={handleInputChange}
                    className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3"
                    placeholder="hr:min:sec"
                    required
                    pattern="^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$"
                  />
                </div>

                <div className="w-full md:w-1/2">
                  <label htmlFor="category" className="text-white font-normal text-lg block mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={lecture.category}
                    onChange={handleInputChange}
                    className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                  >
                    <option className="bg-[#101011] text-white" value="finance">
                      Finance
                    </option>
                    <option className="bg-[#101011] text-white" value="technology">
                      Technology
                    </option>
                    <option className="bg-[#101011] text-white" value="health">
                      Health
                    </option>
                    <option className="bg-[#101011] text-white" value="education">
                      Education
                    </option>
                  </select>
                </div>
              </div>

              {/* Overview */}
              <div className="mt-5">
                <label htmlFor="overview" className="text-white font-normal text-lg block mb-2">
                  Overview
                </label>
                <textarea
                  id="overview"
                  name="overview"
                  value={lecture.overview}
                  onChange={handleInputChange}
                  className="w-full h-32 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 pt-4 resize-none"
                  placeholder="Overview"
                  required
                />
              </div>

              {/* Video Upload */}
              <div className="mt-5 relative">
                <label className="text-white font-normal text-lg block mb-2" htmlFor="video-upload">
                  Video Upload
                </label>
                <input
                  type="file"
                  id="video-upload"
                  name="video"
                  accept="video/mp4"
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                  onChange={handleFileChange}
                  required
                />
                <div className="w-full h-16 rounded-xl border-2 border-white bg-transparent px-3 text-white flex items-center justify-between">
                  <span className="text-white">Choose MP4 Video</span>
                  <FileUploadIcon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>

            {/* Cover Image */}
            <div className="flex flex-col items-center w-full md:w-1/3 h-full py-8">
              <label className="text-white font-semibold mb-2">Cover Image</label>
              <div className="border-dashed border-2 border-white rounded-lg w-3/4 h-80 flex flex-col items-center justify-center text-white bg-transparent hover:bg-gray-800 transition duration-200">
                <input
                  type="file"
                  name="coverImage"
                  className="opacity-0 absolute"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <span className="text-lg">Upload</span>
                <span className="text-gray-400">or drag and drop</span>
              </div>
            </div>
          </div>

          {/* Update Button */}
          <div className="flex flex-row justify-end gap-6 mt-8 ml-16 w-3/5">
            <button
              onClick={handleSubmit}
              className="w-56 h-12 bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 rounded-xl text-white font-semibold text-lg"
            >
              Update Lecture
            </button>
          </div>
        </div>
      </Box>

      {/* Delete Confirmation Modal */}
      <ConfirmDelete
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
        itemType={"Lecture"}
      />
    </>
  );
};

export default EditLecture;
