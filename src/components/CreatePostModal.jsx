import React, { useRef, useEffect, useState } from "react";
import { FiFileText, FiLink, FiVideo, FiImage } from "react-icons/fi"; 
import CloseIcon from "@mui/icons-material/Close"
const CreatePostModal = ({ isOpen, onClose, onPost }) => {
  const modalRef = useRef();
  const [loading, setLoading] = useState(false);
  const [postContent, setPostContent] = useState("");

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
    await onPost(postContent); 
    setLoading(false);
    setPostContent(""); 
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
          <h2 className="flex-1 text-white text-xl font-semibold mb-4" id="modal-title">
            Create Post
          </h2>
          
          <div className="flex justify-end gap-4 mb-6 text-gray-400">
            <FiFileText className="text-2xl cursor-pointer hover:text-white" />
            <FiLink className="text-2xl cursor-pointer hover:text-white" />
            <FiVideo className="text-2xl cursor-pointer hover:text-white" />
            <FiImage className="text-2xl cursor-pointer hover:text-white" />
          </div>
        </div>
        
        <div className="flex flex-col gap-2 mb-4">
          <textarea
            className="w-full h-40 p-2 rounded-lg bg-[#202022] text-white resize-none outline-none "
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="What you want to Share"
          />
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
    </div>
  );
};

export default CreatePostModal;
