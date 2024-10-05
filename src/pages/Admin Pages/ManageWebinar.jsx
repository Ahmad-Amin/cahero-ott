import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ConfirmDelete from "../../components/Admin Components/ConfirmDelete";
import axiosInstance from "../../lib/axiosInstance";
import { toast } from "react-toastify";
import LoadingWrapper from "../../components/ui/LoadingWrapper";

const ManageWebinars = () => {
  const { id } = useParams(); // Get webinar ID from route params
  const [paymentType, setPaymentType] = useState("unpaid");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [webinarData, setWebinarData] = useState({
    title: "",
    startTime: "",
    endTime: "",
    startDate: "",
    description: "",
    price: 0,
  });

  useEffect(() => {
    const fetchWebinar = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/webinars/${id}`);
        const data = response.data;
        
        const formattedStartDate = new Date(data.startDate).toISOString().split("T")[0];


        setWebinarData({
          title: data.title,
          startTime: data.startTime,
          endTime: data.endTime,
          startDate: formattedStartDate, // Format the date here
          description: data.description,
          price: data.price || 0,
        });
        setPaymentType(data.price ? "paid" : "unpaid");
      } catch (error) {
        console.error("Error fetching webinar data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWebinar();
  }, [id]);

  // Helper function to format date from '2024-10-06T00:00:00.000Z' to 'mm/dd/yyyy'
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handlePaymentTypeChange = (event) => {
    setPaymentType(event.target.value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWebinarData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteConfirm = () => {
    console.log("Webinar deleted");
    setIsModalOpen(false);
  };

  const handleUpdateWebinar = async () => {
    try {
      setLoading(true);
      await axiosInstance.patch(`/webinars/${id}`, {
        ...webinarData,
        price: paymentType === "paid" ? webinarData.price : null,
      });
      console.log("Webinar updated successfully!");
      toast.success("Webinar updated successfully!");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Error updating webinar");
      console.error("Error updating webinar:", error);
    } finally {
      setLoading(false);
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
          <div className="flex flex-row items-center gap-5">
            <h1 className="flex-1 text-3xl font-semibold text-white py-8">
              Manage Webinars
            </h1>
            <Link to="/dashboard/webinars">
              <button className="w-44 h-12 hover:bg-[#b22c2c] bg-[#e53939] text-white text-lg font-semibold rounded-xl ease-in-out transition duration-300">
                Cancel
              </button>
            </Link>
            <DeleteOutlineIcon
              className="w-8 h-8 hover:text-[#b22c2c] text-[#e53939] ease-in-out transition duration-300"
              onClick={() => setIsModalOpen(true)}
            />
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
                name="title"
                value={webinarData.title}
                onChange={handleInputChange}
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
                  name="startTime" // Set name for handling input change
                  value={webinarData.startTime}
                  onChange={handleInputChange} // Handle input change
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
                  name="endTime" // Set name for handling input change
                  value={webinarData.endTime}
                  onChange={handleInputChange} // Handle input change
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
                type="date" // Change this to text to accept formatted date
                id="start_date"
                name="startDate" // Set name for handling input change
                value={webinarData.startDate}
                onChange={handleInputChange} // Handle input change
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
                name="description"
                value={webinarData.description}
                onChange={handleInputChange}
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
                  name="price" // Set name for handling input change
                  min="0" // Prevent number input below 0
                  value={webinarData.price}
                  onChange={handleInputChange} // Handle input change
                  className="w-full h-16 rounded-xl border-2 border-white text-white focus:border-none bg-transparent px-3"
                  required
                />
              </div>
            )}

            <div className="flex justify-between mt-5">
              <button
                onClick={handleUpdateWebinar}
                className="w-48 h-12 bg-[#6a55ea] text-white text-lg font-semibold rounded-xl hover:bg-[#5a4bcf] ease-in-out transition duration-300"
              >
                Update Webinar
              </button>
            </div>
          </div>
        </div>
      </Box>
      <ConfirmDelete
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </LoadingWrapper>
  );
};

export default ManageWebinars;
