import React, { useState, useRef, useEffect } from "react";
import { MdOutlineNotifications } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { MdOutlinePerson2 } from "react-icons/md";
import axiosInstance from "../lib/axiosInstance";
import { useDispatch } from "react-redux";
import { logout } from "../Slice/AuthSlice";

function LoginedNavbar({ position = "relative" }) {  // Accepting position prop
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", role: "" });
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
    if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target)) {
      setIsProfileDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = () => {
    dispatch(logout());
  };

  useEffect(() => {
    axiosInstance.get("/me")
      .then(response => {
        const { firstName, lastName, email, role } = response.data;
        setUserData({ firstName, lastName, email, role });
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
  }, [dispatch]);

  return (
    <div className={`w-full h-20 flex items-center justify-end bg-transparent px-4 sm:px-10 ${position}`}>
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
              </ul>
            </div>
          )}
        </div>

        <div className="h-auto w-auto text-white flex items-center relative" ref={profileDropdownRef}>
          <button onClick={toggleProfileDropdown} className="flex items-center">
            <MdOutlinePerson2 className="w-7 h-7 sm:w-6 sm:h-6" />
            <h1 className="text-white ml-1 text-sm sm:text-md font-normal">{userData.firstName}</h1>
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-14 top-full mt-3  text-white rounded-md shadow-lg z-30 bg-[#0d0d0d]">
              <div className="px-4 py-3 text-sm border-b-2">
                <div className="text-lg">{userData.firstName}</div>
                <div className="font-medium truncate">{userData.email}</div>
              </div>
              <ul className="py-2 text-sm">
                <li>
                  <a href="/" className="block px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition">Dashboard</a>
                </li>
                <li>
                  <a href="/profile-settings" className="block px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition">Settings</a>
                </li>
                {userData.role === "admin" && ( 
                  <li>
                    <a href="/dashboard" className="block px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition border-b-2">Admin Panel</a>
                  </li>
                )}
              </ul>
              <div className="py-2" onClick={handleSignOut}>
                <a  className="block px-4 py-2 text-sm text-white hover:bg-[#404041] cursor-pointer ease-in-out transition">Sign out</a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginedNavbar;
