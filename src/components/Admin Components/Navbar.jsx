import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux"; // Import useSelector to access Redux store
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { FaBell, FaEnvelope, FaUserCheck } from "react-icons/fa";

const AdminNavbar = ({ pageTitle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); 
  const dropdownRef = useRef(null); 


  const user = useSelector((state) => state.auth.user);
  console.log(user);
  
  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev); 
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); 
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "English",
    flag: `${process.env.PUBLIC_URL}/images/flags/flag.png`,
  });
  const [isOpen, setIsOpen] = useState(false);

  const toggleLanguageDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (language, flag) => {
    setSelectedLanguage({ name: language, flag });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-row justify-end items-center px-4 py-3 bg-[#101011] z-50">
      <div className="flex-1">
        <h1 className="text-4xl font-semibold text-white">{pageTitle}</h1>
      </div>

      <div className="flex justify-between items-center gap-8">
        <div className="relative">
          <div
            className="bg-transparent text-white rounded-md px-4 cursor-pointer flex items-center gap-4"
            onClick={toggleLanguageDropdown}
          >
            <img
              src={selectedLanguage.flag}
              alt={selectedLanguage.name}
              className="w-6 h-6 rounded-full"
            />
            {selectedLanguage.name} <KeyboardArrowDownIcon />
          </div>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-32 bg-black text-white rounded-md shadow-lg z-10">
              <ul className="py-2">
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                  onClick={() =>
                    handleLanguageChange(
                      "English",
                      `${process.env.PUBLIC_URL}/images/flags/flag.png`
                    )
                  }
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/flags/flag.png`}
                    alt="English"
                    className="w-6 h-6 rounded-full"
                  />
                  English
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                  onClick={() =>
                    handleLanguageChange(
                      "Spanish",
                      `${process.env.PUBLIC_URL}/images/flags/flag.png`
                    )
                  }
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/flags/flag.png`}
                    alt="Spanish"
                    className="w-6 h-6 rounded-full"
                  />
                  Spanish
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center gap-2"
                  onClick={() =>
                    handleLanguageChange(
                      "French",
                      `${process.env.PUBLIC_URL}/images/flags/flag.png`
                    )
                  }
                >
                  <img
                    src={`${process.env.PUBLIC_URL}/images/flags/flag.png`}
                    alt="French"
                    className="w-6 h-6 rounded-full"
                  />
                  French
                </li>
              </ul>
            </div>
          )}
        </div>

        <div
          className="w-10 h-10 bg-black rounded-md flex justify-center items-center text-[#ffa412] cursor-pointer relative"
          ref={dropdownRef}
        >
          <button onClick={toggleDropdown}>
            <NotificationsIcon />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-2 bg-[#0d0d0d] text-white rounded-md shadow-lg z-30 w-[40rem]">
              <div className="text-center py-2 font-bold border-b border-gray-600">
                Recent Notifications
              </div>
              <ul className="py-2">
                {[
                  {
                    title: "Notification Title 1",
                    description: "This is a description of notification 1.",
                    icon: <FaBell className="w-6 h-6 mr-4" />,
                    time: "5 mins ago",
                  },
                  {
                    title: "Notification Title 2",
                    description: "This is a description of notification 2.",
                    icon: <FaEnvelope className="w-6 h-6 mr-4" />,
                    time: "10 mins ago",
                  },
                  {
                    title: "Notification Title 3",
                    description: "This is a description of notification 3.",
                    icon: <FaUserCheck className="w-6 h-6 mr-4" />,
                    time: "15 mins ago",
                  },
                ].map((notification, index) => (
                  <li
                    key={index}
                    className="flex items-center h-20 px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition"
                  >
                    {notification.icon}
                    <div className="flex flex-col justify-center flex-grow overflow-hidden">
                      <div className="font-semibold">
                        {notification.title}
                      </div>
                      <div className="text-sm text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap">
                        {notification.description}
                      </div>
                    </div>
                    <span
                      className="ml-4 text-xs text-gray-400"
                      style={{ width: "100px", textAlign: "center" }}
                    >
                      {notification.time}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-row items-center cursor-pointer gap-5 mr-6">
          <img
            src={`${process.env.PUBLIC_URL}/images/ProfileA.png`}
            alt="Profile"
            className="w-10 h-10"
          />
          <div>
            <h1>{user.firstName || "User"}</h1>
            <p className="text-sm opacity-70">{user?.role || "Role"}</p>
          </div>
          <KeyboardArrowDownIcon />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
