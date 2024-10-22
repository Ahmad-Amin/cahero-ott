import React from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const CreateNotifications = () => {
  return (
    <>
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
        <div className="p-5">
          <div className="flex flex-row items-center">
            <h1 className="flex-1 text-3xl font-semibold text-white py-8">
              Create New Notification
            </h1>
            <div className=" space-x-5">
              <button className="w-44 px-3 h-12 bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 rounded-xl text-white font-semibold text-lg">
                Send Now
              </button>
            
            <Link to="/dashboard/notifications">
              <button className="w-44 h-12 hover:bg-[#b22c2c] bg-[#e53939] text-white text-lg font-semibold rounded-xl ease-in-out transition duration-300">
                Cancel
              </button>
            </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-3/5 px-5">
          <div className="flex-1 w-full md:w-4/6 py-8">
            <div>
              <label
                htmlFor="title"
                className="text-white font-normal text-lg block mb-2"
              >
                Notification Type
              </label>
              <select
                id="type"
                name="type"
                className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
              >
                <option
                  className="bg-[#101011] text-white"
                  value="system-update"
                >
                  System Update
                </option>
                <option
                  className="bg-[#101011] text-white"
                  value="user-notification"
                >
                  User Notification
                </option>
                <option
                  className="bg-[#101011] text-white"
                  value="upcomming-webinar"
                >
                  Upcomming Webinar
                </option>
                <option
                  className="bg-[#101011] text-white"
                  value="new-documentary"
                >
                  New Documentary
                </option>
                <option
                  className="bg-[#101011] text-white"
                  value="new-book"
                >
                  New Book
                </option>
              </select>
            </div>
            <div className="flex flex-col md:flex-row gap-10 mt-5">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="type"
                  className="text-white font-normal text-lg block mb-2"
                >
                  Recipient Type
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                >
                  <option className="bg-[#101011] text-white" value="Admin">
                    All
                  </option>
                  <option className="bg-[#101011] text-white" value="Host">
                    Admins
                  </option>
                  <option
                    className="bg-[#101011] text-white"
                    value="Participents"
                  >
                    Users
                  </option>
                  </select>
              </div>
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="specific-user"
                  className="text-white font-normal text-lg block mb-2"
                >
                  Specific Recipient (Not Mandatory)
                </label>
                <input
                  type="text"
                  id="specific-user"
                  className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3"
                  placeholder="By Username"
                />
              </div>
            </div>
            <div className="mt-5">
              
              <div className="mt-5">
                <label
                  htmlFor="title"
                  className="text-white font-normal text-lg block mb-2"
                >
                  External Notification Delivery
                </label>
                <select
                  id="type"
                  name="type"
                  className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                >
                  <option
                    className="bg-[#101011] text-white"
                    value="none"
                  >
                    None
                  </option>
                  <option
                    className="bg-[#101011] text-white"
                    value="all"
                  >
                    All
                  </option>
                  <option
                    className="bg-[#101011] text-white"
                    value="email"
                  >
                    Email
                  </option>
                  <option
                    className="bg-[#101011] text-white"
                    value="phone-number"
                  >
                    Phone Number
                  </option>
                </select>
              </div>
            </div>
            <div className="mt-5">
              <label
                className="text-white font-normal text-lg block mb-2"
                htmlFor="description"
              >
                Content of the Notification
              </label>

              <textarea
                id="text"
                className="w-full h-32 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 pt-4"
                placeholder="Content"
                required
              />
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default CreateNotifications;
