import React, { useRef, useEffect } from "react";
import CloseIcon from "@mui/icons-material/Close"; // Import Close Icon

const UserManagement = ({ isOpen, onClose, onConfirm, itemType }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };


    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !itemType) return null;

  const getUserTypeColor = (role) => {
    switch (role.toLowerCase()) {  
      case 'host':
        return '#FFEA00';
      case 'admin':
        return '#46d133';
      case 'participant':
        return '#6a55ea';
      default:
        return 'white';
    }}
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="relative bg-[#101011] border border-white rounded-2xl p-6 w-1/3 h-auto flex flex-col items-start justify-center py-10"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-400 transition ease-in-out"
        >
          <CloseIcon />
        </button>

        {/* Modal Content */}
        <div className="flex flex-row w-full mt-5">
          <div className="flex-1 text-start mb-10">
            <h2 className="text-white text-xl font-semibold">User Management</h2>
            <p className="text-white">Manage Participants and Hosts</p>
          </div>
          <button className="border border-[#6a55ea] text-[#6a55ea] hover:bg-[#6a55ea] hover:text-white ease-in-out transition duration-300 w-36 h-12 px-3 rounded-lg">
            Edit
          </button>
        </div>

        <div className="flex flex-row w-full h-auto mb-4">
          <h1 className="flex-1 text-white text-base font-medium opacity-70">Full Name</h1>
          <p className="text-white text-base font-medium">{itemType.firstName}&nbsp;{itemType.lastName}</p>
        </div>
        <div className="flex flex-row w-full h-auto mb-4">
          <h1 className="flex-1 text-white text-base font-medium opacity-70">User Type</h1>
          <p className="text-white text-base font-medium" style={{ color: getUserTypeColor(itemType.role) }}>{itemType.role}</p>
        </div>
        <div className="flex flex-row w-full h-auto mb-4">
          <h1 className="flex-1 text-white text-base font-medium opacity-70">Phone Number</h1>
          <p className="text-white text-base font-medium">{itemType.phoneNumber}</p>
        </div>
        <div className="flex flex-row w-full h-auto mb-4">
          <h1 className="flex-1 text-white text-base font-medium opacity-70">Email</h1>
          <p className="text-white text-base font-medium">{itemType.email}</p>
        </div>
        <div className="flex flex-row w-full h-auto mb-4">
          <h1 className="flex-1 text-white text-base font-medium opacity-70">Current Status</h1>
          <p className="text-white text-base font-medium">Active</p> {/* Status is hardcoded as active */}
        </div>

        <div className="w-full flex justify-center space-x-5 pt-10">
          <button
            className="border border-[#6a55ea] text-[#6a55ea] w-44 h-12 rounded-lg hover:bg-[#6a55ea] hover:text-white transition duration-200"
            onClick={onClose}
          >
            Block User
          </button>
          <button
            className="bg-[#6a55ea] text-white rounded-lg w-44 h-12 hover:bg-[#e53939] transition duration-200"
            onClick={onConfirm}
          >
            Remove User
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
