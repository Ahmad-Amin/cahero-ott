import React, { useRef, useEffect, useState } from "react";
import { FiFileText, FiLink, FiVideo, FiImage } from "react-icons/fi";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../lib/axiosInstance";
import { toast } from "react-toastify";
import LoadingWrapper from "./ui/LoadingWrapper";

const CreatePostModal = ({ isOpen, onClose, onPost }) => {
  const modalRef = useRef();
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [postContent, setPostContent] = useState("");
  const [imageLink, setImageLink] = useState("");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handlePost = async () => {
    setLoading(true);
    await onPost(postContent, imageLink);
    setLoading(false);
    setPostContent("");
    setImageLink("");
    onClose();
  };

  const handleImageClick = () => {
    fileInputRef.current.click(); // Trigger file input click
  };

  const handleImageUpload = async (event) => {
    try {
      setLoading(true);
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        console.log("Sending image file:", formData.get("file"));
        const imageResponse = await axiosInstance.post(
          "/upload/image",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setImageLink(imageResponse.data.fileUrl);
        toast.success("File uploaded successfully");
      }
    } catch (e) {
      console.log("Error uploading the image", e);
      toast.error("Error uploading the image");
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (e) => {
    if (e.target.value.length <= 1000) {
      setPostContent(e.target.value);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-[#101011] border border-gray-700 rounded-xl p-6 w-2/5 flex flex-col justify-between"
        role="dialog"
        aria-labelledby="modal-title"
      >
        <button
          onClick={onClose}
          className="flex justify-end mb-7 text-white hover:text-gray-400 transition ease-in-out"
        >
          <CloseIcon />
        </button>
        <div className="flex flex-row">
          <h2
            className="flex-1 text-white text-xl font-semibold mb-4"
            id="modal-title"
          >
            Create Post
          </h2>

          <div className="flex justify-end gap-4 mb-6 text-gray-400">
            <span>{imageLink ? "File Uploaded!" : ""}</span>
            <FiImage
              className="text-2xl cursor-pointer hover:text-white"
              onClick={handleImageClick}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <textarea
            className="w-full h-40 p-2 rounded-lg bg-[#202022] text-white resize-none outline-none"
            value={postContent}
            onChange={handleContentChange}
            placeholder="What you want to Share"
          />
          <p className="text-right text-gray-400 text-sm">
            {postContent.length}/1000 characters
          </p>
        </div>

        <div className="w-full flex justify-center">
          <button
            onClick={handlePost}
            disabled={loading}
            className={`w-32 px-5 h-12 bg-[#6a55ea] text-white rounded-lg font-semibold ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#5a48c9]"
            } transition duration-200`}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </div>
      </div>

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        accept="image/*"
        onChange={handleImageUpload}
      />
    </div>
  );
};

export default CreatePostModal;
