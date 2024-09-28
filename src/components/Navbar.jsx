import React, { useState } from "react";
import SearchBar from "./Searchbar";
import { Modal, Box } from "@mui/material";
import SignInForm from "../pages/SignInForm";
import SignUpForm from "../pages/SignUpForm";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%", // Set width to 90% to make it responsive
  maxWidth: "700px", // Maximum width for larger screens
  boxShadow: 24,
  background: "#0d0d0d",
  borderRadius: "16px", // Add rounded border
  padding: "20px", // Optional: add padding for content spacing
};

function Navbar() {
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignIn = () => {
    setShowSignIn(true);
    setShowSignUp(false); // Close sign up if it's open
  };

  const toggleSignUp = () => {
    setShowSignUp(true);
    setShowSignIn(false); // Close sign in if it's open
  };

  const closeModal = () => {
    setShowSignIn(false);
    setShowSignUp(false);
  };

  return (
    <div
      className="w-full h-20 flex items-center justify-start bg-transparent absolute mt-10 md:mt-0" // Added mt-10 for mobile view
    >
     <SearchBar />

      <div className="flex items-center justify-end">
        <div className="h-18 w-20 text-white flex items-center">
          <button onClick={toggleSignIn} className="text-white hover:font-semibold hover:scale-[1.05] ease-in-out transition duration-300">Sign in</button>
        </div>
        <div className="h-18 w-20 text-white flex items-center">
          <button onClick={toggleSignUp} className="text-white hover:font-semibold hover:scale-[1.05] ease-in-out transition duration-300">Sign up</button>
        </div>
      </div>

      <div>
        <Modal
          open={showSignIn}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SignInForm onClose={closeModal} toggleSignUp={toggleSignUp} />
          </Box>
        </Modal>

        <Modal
          open={showSignUp}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <SignUpForm onClose={closeModal} toggleSignIn={toggleSignIn} />
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default Navbar;
