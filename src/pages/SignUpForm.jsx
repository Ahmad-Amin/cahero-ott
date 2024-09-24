import React from "react";
import TextField from "@mui/material/TextField"; // For Material-UI
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseIcon from "@mui/icons-material/Close";

function SignUpForm({ onClose, toggleSignIn }) {
  return (
    <div className="modal-overlay">
      <div className="modal bg-[#0d0d0d] text-white p-5 sm:p-10">
        <div className="flex justify-end">
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <h2 className="text-2xl font-semibold my-5">Sign Up</h2>
        <p className="text-md font-normal mb-5 opacity-60">
          Let’s get you all set up so you can access your personal account.
        </p>
        <form>
          <div className="mb-5 gap-4 flex flex-col sm:flex-row">
            <TextField
              className="w-full sm:w-1/2"
              id="first-name"
              label="First Name"
              variant="outlined"
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
            <TextField
              className="w-full sm:w-1/2"
              id="last-name"
              label="Last Name"
              variant="outlined"
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
          <div className="mb-5 gap-4 flex flex-col sm:flex-row">
            <TextField
              className="w-full sm:w-1/2"
              id="email"
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
            <TextField
              className="w-full sm:w-1/2"
              id="phone"
              label="Phone Number"
              variant="outlined"
              type="tel"
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
          <div className="mb-5">
            <TextField
              className="w-full"
              id="password"
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
          <div className="mb-5">
            <TextField
              className="w-full"
              id="confirm-password"
              label="Confirm Password"
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
          <div className="mb-5 flex items-center">
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
              className="text-[#313131]"
              label={
                <span className="font-extrabold text-sm">
                  I agree to all the <button className="text-[#6A55EA]">terms</button> and <button className="text-[#6A55EA]">privacy policies</button>
                </span>
              }
            />
          </div>
          <div className="my-5">
            <button
              className="text-black font-semibold w-full bg-[#6A55EA] rounded-md h-10"
              type="submit"
            >
              Create Account
            </button>
          </div>
          <div className="flex justify-center my-5">
            <p className="text-[#313131] text-sm font-semibold">
              Already have an account?{" "}
              <button className="text-[#6A55EA]" onClick={toggleSignIn}>
                Sign in
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
