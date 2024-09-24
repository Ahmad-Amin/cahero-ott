import React from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";

function LoginedNavbar() {
  return (
    <div className="w-full h-20 flex items-center justify-end bg-transparent px-4 sm:px-10">
      {/* Container for icons and user */}
      <div className="flex items-center justify-end gap-2 sm:gap-4">
        {/* Search Button */}
        <div className="h-auto w-auto text-white flex items-center">
          <button>
            <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Notification Button */}
        <div className="h-auto w-auto text-white flex items-center">
          <button>
            <MdOutlineNotifications className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* User Section */}
        <div className="h-auto w-auto text-white flex items-center">
          <button>
            <FaRegUser className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {/* User Name */}
          <h1 className="text-white ml-1 text-sm sm:text-md font-normal">Tetiana</h1>
        </div>
      </div>
    </div>
  );
}

export default LoginedNavbar;
