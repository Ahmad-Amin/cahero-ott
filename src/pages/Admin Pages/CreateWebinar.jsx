import React, { useState } from "react";
import { Box } from "@mui/material";
import { Link } from "react-router-dom";

const CreateWebinars = () => {
  const [paymentType, setPaymentType] = useState("unpaid"); // State to track payment type

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

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
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-semibold text-white py-8">
              Create Webinars
            </h1>
            <Link to="/dashboard/webinars">
              <button className="w-44 h-12 hover:bg-[#b22c2c] bg-[#e53939] text-white text-lg font-semibold rounded-xl ease-in-out transition duration-300">
                Cancel
              </button>
            </Link>
          </div>
          <div className="py-8 w-4/6">
            <div>
              <label
                htmlFor="webinar_title"
                className="text-white font-normal text-lg block mb-2"
              >
                Webinar Title
              </label>
              <input
                type="text"
                id="webinar_title"
                className="w-full h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
                placeholder="Enter Webinar Title"
                required
              />
            </div>
            <div className="flex gap-10 mt-5">
              <div className="w-1/2">
                <label
                  htmlFor="start_time"
                  className="text-white font-normal text-lg block mb-2"
                >
                  Start Time
                </label>
                <input
                  type="time"
                  id="start_time"
                  className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                  required
                />
              </div>
              <div className="w-1/2">
                <label
                  htmlFor="end_time"
                  className="text-white font-normal text-lg block mb-2"
                >
                  End Time
                </label>
                <input
                  type="time"
                  id="end_time"
                  className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                  required
                />
              </div>
            </div>
            <div className="mt-5">
              <label
                htmlFor="start_date"
                className="text-white font-normal text-lg block mb-2"
              >
                Start Date
              </label>
              <input
                type="date"
                id="start_date"
                className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                required
              />
            </div>
            <div className="mt-5">
              <label
                htmlFor="description"
                className="text-white font-normal text-lg block mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full h-32 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 pt-4 resize-none"
                placeholder="Enter Description"
                required
              />
            </div>
            
            {/* Radio Button Section */}
            <div className="mt-5 flex items-center">
              <label className="text-white font-normal text-lg mr-5 flex items-center">
                Paid
                <input
                  type="radio"
                  name="payment_type"
                  value="paid"
                  checked={paymentType === "paid"}
                  onChange={handlePaymentTypeChange}
                  className="ml-2 appearance-none border border-[#6a55ea] checked:bg-[#6a55ea] rounded-full w-5 h-5 cursor-pointer"
                />
              </label>
              <label className="text-white font-normal text-lg flex items-center">
                Unpaid
                <input
                  type="radio"
                  name="payment_type"
                  value="unpaid"
                  checked={paymentType === "unpaid"}
                  onChange={handlePaymentTypeChange}
                  className="ml-2 appearance-none border border-[#6a55ea] checked:bg-[#6a55ea] rounded-full w-5 h-5 cursor-pointer"
                />
              </label>
            </div>

            {/* Conditionally Render the Webinar Price Input */}
            {paymentType === "paid" && (
              <div className="mt-5">
                <label
                  htmlFor="webinar_price"
                  className="text-white font-normal text-lg block mb-2"
                >
                  Webinar Price
                </label>
                <input
                  type="number"
                  id="webinar_price"
                  min="0" // Prevent number input below 0
                  className="w-full h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
                  placeholder="Enter Webinar Price"
                  required
                />
              </div>
            )}

            <div className="flex flex-row gap-6  mt-8">
              <div className=""> <button className="w-56 h-12 bg-transparent border-2 border-[#6a55ea] hover:border-0 hover:bg-[#6a55ea] ease-in-out transition duration-300 rounded-xl text-white font-semibold text-lg">Share Invite Link</button></div>
              <div className=""><button className="w-56 h-12 bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 rounded-xl text-white font-semibold text-lg">Create Webinar</button></div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default CreateWebinars;
