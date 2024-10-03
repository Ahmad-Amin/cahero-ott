import React, { useState, useEffect } from "react";
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

function SignInForm({ onClose, toggleSignUp }) {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const userData = useSelector((state) => state.auth.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = credentials;
    const token = 'mock-token-123'; 

    console.log("Dispatching login with:", { user: { email, password }, token });
    dispatch(login({ user: { email, password }, token }));

    const mockUser = {
      email,
      role: email === "admin@example.com" ? "admin" : "user",
    };

    if (mockUser.role === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/"); 
    }

    if (rememberMe) {
      localStorage.setItem("email", email);
    }
    
  };

  useEffect(() => {
    console.log("User Data from Redux Store: ", userData);
  }, [userData]);

  return (
    <div className="modal-overlay">
      <div className="modal bg-[#0d0d0d] text-white">
        <div className="flex justify-end p-2">
          <button onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        <h2 className="text-2xl font-semibold mx-10 my-5">Login</h2>
        <p className="text-md font-normal mx-10 mb-5 opacity-60">
          Login to access your account
        </p>
        <form onSubmit={handleLogin}>
          <div className="mx-10 mb-5">
            <TextField
              className="w-full"
              id="outlined-basic"
              label="Email"
              variant="outlined"
              type="email"
              name="email" // Add name attribute
              value={credentials.email} // Access email from credentials
              onChange={handleChange} // Use the combined handler
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
              type={showPassword ? "text" : "password"}
              name="password" // Add name attribute
              value={credentials.password} // Access password from credentials
              onChange={handleChange} // Use the combined handler
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
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />
            <button className="text-[#6a55ea]" onClick={toggleSignUp}>
              Sign Up
            </button>
          </div>
          <div className="mx-10 mt-5 mb-10">
            <button
              className="bg-[#6a55ea] text-white rounded-lg py-2 w-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
