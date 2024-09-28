import React from "react";
import { Box } from "@mui/material";
import LoginedNavbar from "../components/LoginedNavbar";

const drawerWidth = 280;

const ProfileSettings = () => {
  return (
    <>
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
                <button className="text-[#6a55ea] hover:text-[#5242b6]  ease-in-out transition duration-300 font-medium text-base mt-4">
                  Change image
                </button>
              </div>
              <div className="mt-10 ml-10 w-auto flex-1">
                <div className="flex justify-between items-center">
                  <h1 className="text-white text-4xl font-semibold">
                    Star Shah
                  </h1>
                  <div className=" whitespace-nowrap">
                    <button className="text-[#6a55ea] hover:text-[#5242b6]  ease-in-out transition duration-300 text-base font-medium">
                      Edit Profile
                    </button>
                  </div>
                </div>
                <div className="flex justify-between mt-4 flex-wrap">
                  <p className="text-white opacity-85 text-lg font-normal mr-4">
                    Downtown, London
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
                  <button className="text-[#6a55ea] hover:text-[#5242b6]  ease-in-out transition duration-300 font-medium">
                    Edit Bio
                  </button>
                </div>
              </div>
              <p className="text-white font-light mx-8 opacity-65 mt-3">
                Hello! I'm Star shah a devoted parent and homeowner who values
                quality care and reliable service. With a busy schedule and a
                growing family, I rely on trusted professionals for babysitting
                and home care needs. Using WELPCO I ensure that my loved ones
                and home are always in good hands. The platform's vetted and
                background-checked caregivers provide me with peace of mind,
                allowing me to focus on my work and personal commitments. From
                expert babysitters to dedicated home care professionals, I count
                on [App Name] to connect me with the best services available.
              </p>

              <div className="mx-8 mt-5">
                <h1 className="text-xl font-semibold text-white">
                  Verified Info
                </h1>
              </div>

              <div className="text-white mt-3 mx-4 md:mx-8 text-base font-normal flex justify-between w-auto">
                <h1 className="text-lg opacity-85 font-thin">
                  starshah1@gmail.com
                </h1>
                <div className=" whitespace-nowrap">
                  <button className="text-[#6a55ea] hover:text-[#5242b6]  ease-in-out transition duration-300 font-medium">
                    Edit Email
                  </button>
                </div>
              </div>
              <div className="text-white mt-10 mx-4 md:mx-8 text-base font-normal flex justify-between w-auto">
                <h1 className="text-lg opacity-85 font-thin">+44 765 1342</h1>
                <div className=" whitespace-nowrap">
                  <button className="text-[#6a55ea] hover:text-[#5242b6]  ease-in-out transition duration-300 font-medium">
                    Edit Phone
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProfileSettings;
