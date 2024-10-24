import React from "react";
import { Box, Divider } from "@mui/material";
import LoginedNavbar from "../components/LoginedNavbar";
import { useSelector } from 'react-redux';
import Navbar from "../components/Navbar";


const drawerWidth = 280;

const SubscriptionPlans = () => {

  const currentUser = useSelector((state) => state.auth.user); 

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
            {currentUser ? <LoginedNavbar  /> : <Navbar />}


      <div>
        <div
          style={{ position: "relative", zIndex: 2 }}
          className="mx-4 md:mx-8 mt-14 text-white text-xl font-semibold"
        >
          Subscription Plans
        </div>
      </div>

      <div className="w-auto h-auto mx-4 md:mx-20 mt-10 grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="w-full p-4 overflow-hidden rounded-3xl">
          <div className="relative ">
            <img
              src={`${process.env.PUBLIC_URL}/images/Bg.png`}
              alt="Basic Plan"
              className="w-full h-full scale-[1.4] rounded-lg"
            />
            <div className="absolute inset-0">
              <div className="flex flex-col space-y-5 items-center justify-center text-white h-full gap-5">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Basic</h2>
                <h3 className="text-base font-extralight">
                  Monthly Charges
                </h3>
                <h4 className="text-4xl md:text-5xl font-extrabold text-[#6a55ea]">
                  $14.44
                </h4>
                <Divider
                  sx={{
                    width: "90%",
                    my: 2,
                    bgcolor: "white",
                    mx: 2,
                    opacity: 0.5,
                  }}
                />
                <h2 className="text-white font-bold text-xl">Option 1</h2>
                <h2 className="text-white font-bold text-xl mt-2">Option 1</h2>
                <h2 className="text-white font-bold text-xl mt-2">Option 1</h2>
                <Divider
                  sx={{
                    width: "90%",
                    my: 2,
                    bgcolor: "white",
                    mx: 2,
                    opacity: 0.5,
                  }}
                />
                <button
                  variant="outlined"
                  className="mt-2 w-full max-w-[150px] sm:max-w-[200px] md:w-44 h-16 rounded-full border-2 border-[#6a55ea] text-[#6a55ea] hover:bg-[#6a55ea] font-bold hover:text-black ease-in-out transition duration-300"
                >
                  Get Started
                </button>
                <button className="text-white mt-2 mb-4 text-sm underline font-semibold hover:text-[#6a55ea] ease-in-out transition duration-300">
                  Start Your 30 Day Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-4 rounded-3xl overflow-hidden">
          <div className="relative ">
            <img
              src={`${process.env.PUBLIC_URL}/images/Bg.png`}
              alt="Basic Plan"
              className="w-full h-full scale-[1.4] rounded-lg"
            />
            <div className="absolute inset-0 ">
              <div className="flex flex-col space-y-5 items-center justify-center text-white h-full gap-5">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Standard</h2>
                <h3 className="text-base font-extralight">
                  Monthly Charges
                </h3>
                <h4 className="text-4xl md:text-5xl font-extrabold text-[#6a55ea]">
                  $49.99
                </h4>
                <Divider
                  sx={{
                    width: "90%",
                    my: 2,
                    bgcolor: "white",
                    mx: 2,
                    opacity: 0.5,
                  }}
                />
                <h2 className="text-white font-bold text-xl">Option 2</h2>
                <h2 className="text-white font-bold text-xl mt-2">Option 2</h2>
                <h2 className="text-white font-bold text-xl mt-2">Option 2</h2>
                <Divider
                  sx={{
                    width: "90%",
                    my: 2,
                    bgcolor: "white",
                    mx: 2,
                    opacity: 0.5,
                  }}
                />
                <button
                  variant="outlined"
                  className="mt-2 w-full max-w-[150px] sm:max-w-[200px] md:w-44 h-16 rounded-full border-2 border-[#6a55ea] text-[#6a55ea] hover:bg-[#6a55ea] font-bold hover:text-black ease-in-out transition duration-300"
                >
                  Get Started
                </button>
                <button className="text-white mt-2 mb-4 text-sm underline font-semibold hover:text-[#6a55ea] ease-in-out transition duration-300">
                  Start Your 30 Day Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full p-4  rounded-3xl overflow-hidden">
          <div className="relative">
            <img
              src={`${process.env.PUBLIC_URL}/images/Bg.png`}
              alt="Basic Plan"
              className="w-full h-full scale-[1.4] rounded-lg"
            />
            <div className="absolute inset-0 ">
              <div className="flex flex-col space-y-5 items-center justify-center text-white h-full gap-5">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Premium</h2>
                <h3 className="text-base font-extralight">
                  Monthly Charges
                </h3>
                <h4 className="text-4xl md:text-5xl font-extrabold text-[#6a55ea]">
                  $89.99
                </h4>
                <Divider
                  sx={{
                    width: "90%",
                    my: 2,
                    bgcolor: "white",
                    mx: 2,
                    opacity: 0.5,
                  }}
                />
                <h2 className="text-white font-bold text-xl">Option 1</h2>
                <h2 className="text-white font-bold text-xl mt-2">Option 1</h2>
                <h2 className="text-white font-bold text-xl mt-2">Option 1</h2>
                <Divider
                  sx={{
                    width: "90%",
                    my: 2,
                    bgcolor: "white",
                    mx: 2,
                    opacity: 0.5,
                  }}
                />
                <button
                  variant="outlined"
                  className="mt-2 w-full max-w-[150px] sm:max-w-[200px] md:w-44 h-16 rounded-full border-2 border-[#6a55ea] text-[#6a55ea] hover:bg-[#6a55ea] font-bold hover:text-black ease-in-out transition duration-300"
                >
                  Get Started
                </button>
                <button className="text-white mt-2 mb-4 font-semibold text-sm underline hover:text-[#6a55ea] ease-in-out transition duration-300">
                  Start Your 30 Day Free Trial
                </button>
              </div>
            </div>
          </div>
        </div>

        
      </div>
    </Box>
  );
};

export default SubscriptionPlans;
