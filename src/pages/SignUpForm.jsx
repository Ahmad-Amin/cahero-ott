import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Slice/AuthSlice";

function SignUpForm({ onClose, toggleSignIn }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const userData = useSelector((state) => state.auth.user);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const { firstName, lastName, email, phone, password, confirmPassword, agreeToTerms } = formData;
    const token = 'mock-token-123'; 

    console.log("Dispatching login with:", { user: { firstName, lastName, email, phone, password, confirmPassword, agreeToTerms }, token });
    dispatch(login({ user: { firstName, lastName, email, phone, password, confirmPassword, agreeToTerms }, token }));

    navigate("/"); 
    

    
    
  };

  useEffect(() => {
    console.log("User Data from Redux Store: ", userData);
  }, [userData]);
  

  const textfieldStyles = {
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
  };

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
        <form onSubmit={handleSignup}>
          <div className="mb-5 gap-4 flex flex-col sm:flex-row">
            <TextField
              className="w-full sm:w-1/2"
              id="first-name"
              name="firstName"
              label="First Name"
              variant="outlined"
              value={formData.firstName}
              onChange={handleChange}
              sx={textfieldStyles} // Using textfieldStyles here
            />
            <TextField
              className="w-full sm:w-1/2"
              id="last-name"
              name="lastName"
              label="Last Name"
              variant="outlined"
              value={formData.lastName}
              onChange={handleChange}
              sx={textfieldStyles} // Using textfieldStyles here
            />
          </div>
          <div className="mb-5 gap-4 flex flex-col sm:flex-row">
            <TextField
              className="w-full sm:w-1/2"
              id="email"
              name="email"
              label="Email"
              variant="outlined"
              type="email"
              value={formData.email}
              onChange={handleChange}
              sx={textfieldStyles} // Using textfieldStyles here
            />
            <TextField
              className="w-full sm:w-1/2"
              id="phone"
              name="phone"
              label="Phone Number"
              variant="outlined"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              sx={textfieldStyles} // Using textfieldStyles here
            />
          </div>
          <div className="mb-5">
            <TextField
              className="w-full"
              id="password"
              name="password"
              label="Password"
              variant="outlined"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              sx={textfieldStyles} // Using textfieldStyles here
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="mb-5">
            <TextField
              className="w-full"
              id="confirm-password"
              name="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              sx={textfieldStyles} // Using textfieldStyles here
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                      sx={{ color: "white" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div className="mb-5 flex items-center">
            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
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
                  I agree to all the{" "}
                  <button className="text-[#6A55EA] hover:text-[#5242b6] ease-in-out transition duration-300">terms</button> and{" "}
                  <button className="text-[#6A55EA] hover:text-[#5242b6] ease-in-out transition duration-300">privacy policies</button>
                </span>
              }
            />
          </div>
          <div className="my-5">
            <button
              className="text-black font-semibold w-full bg-[#6A55EA] hover:bg-[#5242b6] ease-in-out transition duration-300 rounded-md h-10"
              type="submit"
            >
              Create Account
            </button>
          </div>
          <div className="flex justify-center my-5">
            <p className="text-[#313131] text-sm font-semibold">
              Already have an account?{" "}
              <button className="text-[#6A55EA] hover:text-[#5242b6] ease-in-out transition duration-300" onClick={toggleSignIn}>
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
