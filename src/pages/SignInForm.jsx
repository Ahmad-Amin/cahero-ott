import React from "react";
import TextField from "@mui/material/TextField"; // For Material-UI
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseIcon from '@mui/icons-material/Close';

function SignInForm({ onClose, toggleSignUp }) {
  return (
    <div className="modal-overlay">
      <div className="modal bg-[#0d0d0d] text-white">
        <div className="flex justify-end p-2">
          <button onClick={onClose}><CloseIcon /></button>
        </div>
        <h2 className="text-2xl font-semibold mx-10 my-5">Login</h2>
        <p className="text-md font-normal mx-10 mb-5 opacity-60">
          Login to access your account
        </p>
        <form>
          <div className="mx-10 mb-5">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#79747E",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
              }}
            />
          </div>
          <div className="mx-10">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              sx={{
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#79747E",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "white",
                },
                "& .MuiOutlinedInput-input": {
                  color: "white",
                },
              }}
            />
          </div>
          <div className="mx-10 mt-5 flex justify-between items-center">
            <FormControlLabel
              control={
                <Checkbox
                  sx={{
                    color: "white",
                    "&.Mui-checked": {
                      color: "white",
                    },
                    "&:hover": {
                      color: "white",
                    },
                  }}
                />
              }
              label="Remember me"
            />
            <button className="text-[#6A55EA] font-bold">Forgot Password?</button>
          </div>
          <div className="mx-10 my-5">
            <button className="text-black font-semibold w-full bg-[#6A55EA] rounded-md h-10" type="submit">
              Login
            </button>
          </div>
          <div className="flex justify-center my-5">
            <p className="text-[#313131] text-sm font-semibold">
              Don't have an account?{" "}
              <button className="text-[#6A55EA]" onClick={toggleSignUp}>
                Sign up
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
