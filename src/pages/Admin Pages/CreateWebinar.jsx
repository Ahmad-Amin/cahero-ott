import React, { useState } from "react";
import { Box } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify";
import LoadingWrapper from "../../components/ui/LoadingWrapper";

const CreateWebinars = () => {
  const [paymentType, setPaymentType] = useState("unpaid");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    startDate: "",
    description: "",
    type: "",
    price: "",
  });

  const navigate = useNavigate();

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "startTime" || name === "endTime") {
      const timeParts = value.split(":");
      let hours = parseInt(timeParts[0]);
      const minutes = timeParts[1];

      if (value.includes("PM") && hours < 12) {
        hours += 12;
      } else if (value.includes("AM") && hours === 12) {
        hours = 0;
      }

      const formattedHours = String(hours).padStart(2, "0");
      console.log(`Selected ${name}: ${formattedHours}:${minutes}`);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (paymentType === "unpaid") {
      try {
        setLoading(true);
        const response = await axiosInstance.post("/webinars", {
          title: formData.title,
          startTime: formData.startTime,
          endTime: formData.endTime,
          startDate: formData.startDate,
          description: formData.description,
          price: paymentType === "paid" ? formData.price : undefined,
        });
        console.log("Webinar created:", response.data);
        navigate("/dashboard");
      } catch (error) {
        toast.error(error?.response?.data?.error || "Error creating webinar");
        console.error("Error creating webinar:", error);
      } finally {
        setLoading(false);
      }
    } else {
      alert("Only unpaid webinars are accepted.");
    }
  };

  return (
    <LoadingWrapper loading={loading}>
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
          <form onSubmit={handleSubmit}>
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
                  name="title"
                  className="w-full h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
                  placeholder="Enter Webinar Title"
                  value={formData.title}
                  onChange={handleChange}
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
                    name="startTime"
                    className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                    required
                    onChange={handleChange}
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
                    name="endTime"
                    className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                    required
                    onChange={handleChange}
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
                  name="startDate"
                  className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 appearance-none"
                  required
                  onChange={handleChange}
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
                  name="description"
                  className="w-full h-32 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3 pt-4 resize-none"
                  placeholder="Enter Description"
                  required
                  onChange={handleChange}
                />
              </div>

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
                    name="price"
                    min="0"
                    className="w-full h-16 rounded-xl border-2 border-white focus:border-none bg-transparent px-3 text-white"
                    placeholder="Enter Webinar Price"
                    value={formData.price}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="flex flex-row gap-6 mt-8">
                <div className="">
                  <button
                    type="button"
                    className="w-56 h-12 bg-transparent border-2 border-[#6a55ea] hover:border-0 hover:bg-[#6a55ea] ease-in-out transition duration-300 rounded-xl text-white font-semibold text-lg"
                  >
                    Share Invite Link
                  </button>
                </div>
                <div className="">
                  <button
                    type="submit"
                    className="w-56 h-12 bg-[#6a55ea] hover:bg-[#5242b6] ease-in-out transition duration-300 rounded-xl text-white font-semibold text-lg"
                  >
                    Create Webinar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </LoadingWrapper>
  );
};

export default CreateWebinars;
