import React, { useState, useRef, useEffect } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";
import { FaBell, FaEnvelope, FaUserCheck } from "react-icons/fa"; // Example icons

function LoginedNavbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to manage dropdown visibility
  const dropdownRef = useRef(null); // Ref for the dropdown menu

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); // Toggle dropdown visibility
  };

  const handleClickOutside = (event) => {
    // Check if the click was outside the dropdown
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // Close the dropdown
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full h-20 flex items-center justify-end bg-transparent px-4 sm:px-10">
      <div className="flex items-center justify-end gap-2 sm:gap-4 relative">
        <div className="h-auto w-auto text-white flex items-center">
          <button>
            <FiSearch className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="h-auto w-auto text-white flex items-center relative" ref={dropdownRef}>
          <button onClick={toggleDropdown}>
            <MdOutlineNotifications className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-3 bg-[#0d0d0d] text-white rounded-md shadow-lg z-30">
              <div className="text-center py-2 font-bold border-b border-gray-600">Notifications</div>
              <ul className="py-2">
                {[
                  { title: "Notification Title 1", description: "This is a description of notification 1.", icon: <FaBell className="w-6 h-6 mr-4" />, time: "5 mins ago" },
                  { title: "Notification Title 2", description: "This is a description of notification 2.", icon: <FaEnvelope className="w-6 h-6 mr-4" />, time: "10 mins ago" },
                  { title: "Notification Title 3", description: "This is a description of notification 3.", icon: <FaUserCheck className="w-6 h-6 mr-4" />, time: "15 mins ago" },
                  { title: "Notification Title 4", description: "This is a description of notification 4.", icon: <FaBell className="w-6 h-6 mr-4" />, time: "20 mins ago" },
                  { title: "Notification Title 5", description: "This is a description of notification 5.", icon: <FaEnvelope className="w-6 h-6 mr-4" />, time: "25 mins ago" },
                  { title: "Notification Title 6", description: "This is a description of notification 6.", icon: <FaUserCheck className="w-6 h-6 mr-4" />, time: "30 mins ago" },
                ].map((notification, index) => (
                  <li key={index} className="flex items-center h-20 px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition du ">
                    {notification.icon}
                    <div className="flex flex-col justify-center flex-grow overflow-hidden">
                      <div className="font-semibold">{notification.title}</div>
                      <div className="text-sm w-96 text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">{notification.description}</div>
                    </div>
                    <span className="ml-4 text-xs text-gray-400" style={{ width: "100px", textAlign: "center" }}>{notification.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
