import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import NotificationsIcon from "@mui/icons-material/Notifications";

const AdminNavbar = ({ pageTitle }) => {
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
    <div className="flex justify-between items-center px-4 py-6 bg-[#101011]">
      <div>
        <h1 className="text-4xl font-semibold text-white">{pageTitle}</h1>
      </div>

      <div className="flex justify-between items-center gap-8">
        <div className="relative">
          <div
            className="bg-transparent text-white rounded-md px-4 py-6 cursor-pointer flex items-center gap-4"
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
                  onClick={() => handleLanguageChange("English", `${process.env.PUBLIC_URL}/images/flags/flag.png`)}
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
                  onClick={() => handleLanguageChange("Spanish", `${process.env.PUBLIC_URL}/images/flags/flag.png`)}
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
                  onClick={() => handleLanguageChange("French", `${process.env.PUBLIC_URL}/images/flags/flag.png`)}
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

        <div className="w-10 h-10 bg-black rounded-md flex justify-center items-center text-[#ffa412] cursor-pointer">
          <NotificationsIcon />
        </div>

        <div className="flex flex-row items-center cursor-pointer gap-5 mr-6">
          <img src={`${process.env.PUBLIC_URL}/images/ProfileA.png`} alt="Profile" />
          <div>
            <h1>Musfiq</h1>
            <p className="text-sm opacity-70">Admin</p>
          </div>
          <KeyboardArrowDownIcon />
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
