import React, { useState, useRef, useEffect } from "react";
import { MdOutlineNotifications, MdPerson } from "react-icons/md";
import { RiSearch2Line } from "react-icons/ri";
import axiosInstance from "../lib/axiosInstance";
import { useDispatch } from "react-redux";
import { logout } from "../Slice/AuthSlice";
import { Link } from "react-router-dom";

function LoginedNavbar({ position = "relative" }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileDropdownRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({ firstName: "", lastName: "", email: "", role: "" });
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axiosInstance.get("/notifications");
        // Filter the notifications based on recipientType
        const filteredNotifications = response.data.results.filter(
          (notification) => notification.recipientType === "All" || notification.recipientType === "User"
        );
        const latestNotifications = filteredNotifications.slice(0, 5); // Get the latest 5 filtered notifications
        setNotifications(latestNotifications);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching notifications:", err);
        setError("Failed to fetch notifications");
        setLoading(false);
      }
    };
  
    fetchNotifications();
  }, []);
  

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
    axiosInstance
      .get("/me")
      .then((response) => {
        const { firstName, lastName, email, role } = response.data;
        setUserData({ firstName, lastName, email, role });
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, [dispatch]);

  return (
    <div className={`w-full h-20 flex items-center justify-end bg-transparent px-4 sm:px-10 ${position}`}>
      <div className="flex items-center justify-end gap-2 sm:gap-4 relative">
        <div className="h-auto w-auto text-white flex items-center">
          <button>
            <RiSearch2Line className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Notification Icon */}
        <div className="h-auto w-auto text-white flex items-center relative" ref={dropdownRef}>
          <button onClick={toggleDropdown}>
            <MdOutlineNotifications className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 top-full mt-3 bg-[#0d0d0d] text-white rounded-md shadow-lg z-30">
              <div className="text-center py-2 font-bold border-b border-gray-600">Notifications</div>
              {Array.isArray(notifications) && notifications.length > 0 ? (
                <ul className="max-h-60 overflow-y-auto">
                  {notifications.map((notification, index) => (
                    <li key={index} className="flex items-center h-20 px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition">
                      <div className="flex flex-col justify-center flex-grow overflow-hidden">
                        <div className="font-semibold">{notification.notificationType}</div>
                        <div className="text-sm w-96 text-gray-400 overflow-hidden text-ellipsis whitespace-nowrap line-clamp-1">{notification.content}</div>
                      </div>
                      <span className="ml-4 text-xs text-gray-400" style={{ width: "100px", textAlign: "center" }}>
                        {notification.time}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="py-2 px-4 font-semibold text-lg text-white opacity-70">No notifications available</div>
              )}
              <Link to="/notifications">
                <button className="flex justify-end w-full my-3 px-3 text-sm hover:font-semibold ease-in-out transition duration-300">
                  View All
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Profile Icon */}
        <div className="h-auto w-auto text-white flex items-center relative" ref={profileDropdownRef}>
          <button onClick={toggleProfileDropdown} className="flex items-center">
            <MdPerson className="w-7 h-7 sm:w-6 sm:h-6" />
            <h1 className="text-white ml-1 text-sm sm:text-md font-normal">{userData.firstName}</h1>
          </button>
          {isProfileDropdownOpen && (
            <div className="absolute right-14 top-full mt-3 text-white rounded-md shadow-lg z-30 bg-[#0d0d0d]">
              <div className="px-4 py-3 text-sm border-b-2">
                <div className="text-lg">{userData.firstName}</div>
                <div className="font-medium truncate">{userData.email}</div>
              </div>
              <ul className="py-2 text-sm">
                <li>
                  <Link to="/" className="block px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link to="/notifications" className="block px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition">
                    Notifications
                  </Link>
                </li>
                <li>
                  <Link to="/profile-settings" className="block px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition">
                    Settings
                  </Link>
                </li>
                {userData.role === "admin" && (
                  <li>
                    <Link to="/dashboard" className="block px-4 py-2 hover:bg-[#404041] cursor-pointer ease-in-out transition border-b-2">
                      Admin Panel
                    </Link>
                  </li>
                )}
              </ul>
              <div className="py-2" onClick={handleSignOut}>
                <Link to="/" className="block px-4 py-2 text-sm text-white hover:bg-red-700 cursor-pointer ease-in-out transition">
                  Sign out
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginedNavbar;
