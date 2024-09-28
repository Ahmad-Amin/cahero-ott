import React, { useState } from 'react';
import { Box } from '@mui/material';
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: "#101011",
        minHeight: "100vh",
        padding: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <form>
        <div className="w-full h-auto flex justify-center pb-7">
        <div className=" w-1/6 h-full rounded-full overflow-hidden">
            <img src={`${process.env.PUBLIC_URL}/images/TheFireQueen.png`} alt="Profile-Image" className="scale-110 object-cover" />
        </div>
        </div>
        <div>
        <div className="flex gap-10 mt-5 mx-10">
          <div className="w-1/2">
            <label
              htmlFor="first_name"
              className="text-white font-normal text-lg block mb-2"
            >
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
              placeholder="Enter Your First Name"
              required
            />
          </div>
          <div className="w-1/2">
            <label
              htmlFor="last_name"
              className="text-white font-normal text-lg block mb-2"
            >
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              placeholder="Enter Your Last Name"
              className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
              required
            />
          </div>
        </div>
        <div className="flex gap-10 mt-5 mx-10">
          <div className="w-1/2">
            <label
              htmlFor="email"
              className="text-white font-normal text-lg block mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div className="w-1/2 relative">
            <label
              htmlFor="password"
              className="text-white font-normal text-lg block mb-2"
            >
              Password
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              placeholder="Enter Your Password"
              className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
              required
            />
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              edge="end"
              sx={{
                position: "absolute",
                right: "20px",
                top: "50%",
                
                color: "white",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </div>
        </div>
        </div>
        <div className="w-full h-auto flex justify-end mt-2 pr-10">
              <button className="text-xl font-semibold text-[#6a55ea] hover:text-[#5242b6] ease-in-out transition duration-300">Forgot Password?</button>
        </div>
        <div className="w-full h-auto flex justify-center mt-10">
              <button className="text-white text-xl font-semibold bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 w-auto h-12 px-10 flex items-center justify-center rounded-lg mt-10">Update Information</button>
        </div>
      </form>
    </Box>
  );
};

export default Profile;
