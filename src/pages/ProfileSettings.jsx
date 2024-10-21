import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";  // Import js-cookie
import LoginedNavbar from "../components/LoginedNavbar";
import LoadingWrapper from "../components/ui/LoadingWrapper";
import axiosInstance from "../lib/axiosInstance";
import { updateUser } from "../Slice/AuthSlice";  // Adjust path according to your project structure

const drawerWidth = 280;

const ProfileSettings = () => {
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState({
    profile: false,
    email: false,
    phoneNumber: false,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/me");
        const { firstName, lastName, email, phoneNumber } = response.data;

        console.log("Fetched profile data:", response.data);  // Log fetched data

        setProfileData((prevData) => ({
          ...prevData,
          firstName,
          lastName,
          email,
          phoneNumber,
        }));
      } catch (error) {
        console.error("Error fetching profile data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditToggle = (field) => {
    setIsEditing((prevState) => ({
      ...prevState,
      [field]: !prevState[field],
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async (field) => {
    try {
      setLoading(true);

      // Log data before sending
      console.log("Updating field:", field, profileData[field]);

      const response = await axiosInstance.patch("/me", {
        [field]: profileData[field],
      });

      console.log("Server response:", response.data);  // Log server response

      const token = Cookies.get("token");

      console.log("Token:", token);  // Log token to ensure it's being retrieved

      // Dispatch user update to Redux
      dispatch(updateUser({ user: response.data, token }));

      setIsEditing((prevState) => ({
        ...prevState,
        [field]: false,
      }));
    } catch (error) {
      console.error(`Error updating ${field}:`, error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        backgroundColor: "#131213",
        minHeight: "100vh",
        padding: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "70px",
            height: "100%",
            background:
              "linear-gradient(to right, #220e37 0%, rgba(34, 14, 55, 0) 100%)",
            zIndex: 1,
          }}
        />
        <div>
          <LoginedNavbar />
        </div>

        <LoadingWrapper loading={loading}>
          <div className="mr-10">
            <div
              style={{ position: "relative", zIndex: 2 }}
              className="mx-4 md:mx-8 mt-14 text-white text-xl font-semibold"
            >
              Profile Settings
            </div>
            <div
              style={{ position: "relative", zIndex: 2 }}
              className="mt-10 mx-4 md:mx-8 flex flex-col md:flex-row justify-start"
            >
              <div className="flex flex-col items-center">
                <img
                  src={`${process.env.PUBLIC_URL}/images/profile.png`}
                  alt="Profile"
                  className="w-full md:w-auto h-auto"
                />
                <button className="text-[#6a55ea] hover:text-[#5242b6] ease-in-out transition duration-300 font-medium text-base mt-4">
                  Change image
                </button>
              </div>
              <div className="mt-10 ml-10 w-auto flex-1">
                <div className="flex justify-between items-center">
                  {isEditing.profile ? (
                    <div>
                      <input
                        type="text"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleInputChange}
                        className="text-white bg-transparent border-b-2 px-2 py-1 mr-2"
                      />
                      <input
                        type="text"
                        name="lastName"
                        value={profileData.lastName}
                        onChange={handleInputChange}
                        className="text-white bg-transparent border-b-2 px-2 py-1"
                      />
                    </div>
                  ) : (
                    <h1 className="text-white text-4xl font-semibold">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                  )}
                  <div className="whitespace-nowrap">
                    {isEditing.profile ? (
                      <button
                        className="text-[#6a55ea] hover:text-[#5242b6] transition duration-300 text-base font-medium"
                        onClick={() => handleSave("profile")}
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        className="text-[#6a55ea] hover:text-[#5242b6] transition duration-300 text-base font-medium"
                        onClick={() => handleEditToggle("profile")}
                      >
                        Edit Profile
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex justify-between mt-4 flex-wrap">
                  <p className="text-white opacity-85 text-lg font-normal mr-4">
                    {profileData.address || "No Address Available"}
                  </p>
                </div>
                <div className="flex justify-between mt-4 flex-wrap">
                  <p className="text-white opacity-65 text-lg font-thin mr-4">
                    Member Since 2024
                  </p>
                </div>
                <div className="flex justify-between mt-4 flex-wrap">
                  <p className="text-white opacity-65 text-lg font-thin mr-4">
                    Hired&nbsp;&nbsp;&nbsp;24&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;Posted&nbsp;20&nbsp;Reviews
                  </p>
                </div>
              </div>
            </div>

            <div style={{ position: "relative", zIndex: 2 }}>
              <div className="text-white mt-10 mx-4 md:mx-8 text-base font-normal flex justify-between w-auto">
                <h1 className="text-xl font-semibold">Bio</h1>
                <div className=" whitespace-nowrap">
                  <button className="text-[#6a55ea] hover:text-[#5242b6] ease-in-out transition duration-300 font-medium">
                    Edit Bio
                  </button>
                </div>
              </div>
              <p className="text-white font-light mx-8 opacity-65 mt-3">
                {profileData.bio || "You have no bio"}
              </p>

              <div className="mx-8 mt-5">
                <h1 className="text-xl font-semibold text-white">
                  Verified Info
                </h1>
              </div>

              <div className="text-white mt-3 mx-4 md:mx-8 text-base font-normal flex justify-between w-auto">
                {isEditing.email ? (
                  <input
                    type="text"
                    name="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="text-white bg-transparent border-b-2 px-2 py-1 w-1/4"
                  />
                ) : (
                  <h1 className="text-lg opacity-85 font-thin">
                    {profileData.email}
                  </h1>
                )}
                <div className="whitespace-nowrap">
                  {isEditing.email ? (
                    <button
                      className="text-[#6a55ea] hover:text-[#5242b6] transition duration-300 font-medium"
                      onClick={() => handleSave("email")}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-[#6a55ea] hover:text-[#5242b6] transition duration-300 font-medium"
                      onClick={() => handleEditToggle("email")}
                    >
                      Edit Email
                    </button>
                  )}
                </div>
              </div>

              <div className="text-white mt-10 mx-4 md:mx-8 text-base font-normal flex justify-between w-auto">
                {isEditing.phoneNumber ? (
                  <input
                    type="text"
                    name="phoneNumber"
                    value={profileData.phoneNumber}
                    onChange={handleInputChange}
                    className="text-white bg-transparent border-b-2 px-2 py-1 w-1/4"
                  />
                ) : (
                  <h1 className="text-lg opacity-85 font-thin">
                    {profileData.phoneNumber || "No phone number available"}
                  </h1>
                )}
                <div className="whitespace-nowrap">
                  {isEditing.phoneNumber ? (
                    <button
                      className="text-[#6a55ea] hover:text-[#5242b6] transition duration-300 font-medium"
                      onClick={() => handleSave("phoneNumber")}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="text-[#6a55ea] hover:text-[#5242b6] transition duration-300 font-medium"
                      onClick={() => handleEditToggle("phoneNumber")}
                    >
                      Edit Phone Number
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </LoadingWrapper>
      </div>
    </Box>
  );
};

export default ProfileSettings;
