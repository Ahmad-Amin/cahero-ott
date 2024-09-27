import React, { useState } from "react";
import { Box } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { Link } from "react-router-dom";
import UpcommingWebinars from "../../components/Admin Components/UpcommingWebinars";
import PastWebinars from "../../components/Admin Components/PastWebinars";

const AdminHomepage = () => {
  const [activeTab, setActiveTab] = useState("upcoming");

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
      <div className="px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-10 items-center">
          <div className="bg-[#ffe2e5] rounded-3xl shadow-md h-full">
            <div className="w-full flex justify-start items-center">
              <div className="bg-[#fa5a7d] rounded-full w-20 h-20 mx-6 my-7 flex justify-center items-center text-white">
                <AnalyticsIcon fontSize="large" />
              </div>
            </div>
            <div className="w-auto justify-start items-center mx-7 my-5">
              <div className="space-y-3">
                <h1 className="text-[#151d48] font-bold text-2xl md:text-4xl">
                  $ 1K
                </h1>
                <h1 className="text-[#425166] font-bold text-lg md:text-2xl">
                  Total Sales
                </h1>
                <h1 className="text-[#4079ed] font-bold text-lg md:text-xl">
                  +8% from Last Month
                </h1>
              </div>
            </div>
          </div>
          <div className="bg-[#fff4de] rounded-3xl shadow-md h-full">
            <div className="w-full flex justify-start items-center">
              <div className="bg-[#ff947a] rounded-full w-20 h-20 mx-6 my-7 flex justify-center items-center text-white">
                <DescriptionIcon fontSize="large" />
              </div>
            </div>
            <div className="w-auto justify-start items-center mx-7 my-5">
              <div className="space-y-3">
                <h1 className="text-[#151d48] font-bold text-2xl md:text-4xl">
                  120
                </h1>
                <h1 className="text-[#425166] font-bold text-lg md:text-2xl">
                  Active Users
                </h1>
                <h1 className="text-[#4079ed] font-bold text-lg md:text-xl">
                  +5% from Yesterday
                </h1>
              </div>
            </div>
          </div>
          <div className="bg-[#dcfce7] rounded-3xl shadow-md h-full">
            <div className="w-full flex justify-start items-center">
              <div className="bg-[#3cd856] rounded-full w-20 h-20 mx-6 my-7 flex justify-center items-center text-white">
                <LocalOfferIcon fontSize="large" />
              </div>
            </div>
            <div className="w-auto justify-start items-center mx-7 my-5">
              <div className="space-y-3">
                <h1 className="text-[#151d48] font-bold text-2xl md:text-4xl">
                  357
                </h1>
                <h1 className="text-[#425166] font-bold text-lg md:text-2xl">
                  Total Subscribers
                </h1>
                <h1 className="text-[#4079ed] font-bold text-lg md:text-xl">
                  +1.2% from Yesterday
                </h1>
              </div>
            </div>
          </div>
          <div className="bg-[#f3e8ff] rounded-3xl shadow-md h-full">
            <div className="w-full flex justify-start items-center">
              <div className="bg-[#bf83ff] rounded-full w-20 h-20 mx-6 my-7 flex justify-center items-center text-white">
                <PersonAddAlt1Icon fontSize="large" />
              </div>
            </div>
            <div className="w-auto justify-start items-center mx-7 my-5">
              <div className="space-y-3">
                <h1 className="text-[#151d48] font-bold text-2xl lg:text-4xl md:text-2xl">
                  8
                </h1>
                <h1 className="text-[#425166] font-bold text-lg lg:text-2xl md:text-xl w-32">
                  Upcoming Webinars
                </h1>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black rounded-2xl p-10 mt-10 flex flex-row gap-8">
          <div className="flex-1">
            <div className="flex items-center mb-5 gap-10">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={` text-3xl font-semibold ${
                  activeTab === "upcoming"
                    ? "text-white"
                    : "text-[#808080] hover:text-white ease-in-out transition duration-300"
                }`}
              >
                Upcoming Webinars
              </button>
              <button
                onClick={() => setActiveTab("past")}
                className={` text-3xl font-semibold ${
                  activeTab === "past"
                    ? "text-white"
                    : "text-[#808080] hover:text-white ease-in-out transition duration-300"
                }`}
              >
                Past Webinars
              </button>
            </div>
            <div className="w-auto h-auto flex justify-end">
            <Link to="/dashboard/webinars/create-webinar">
              <button className="w-52 h-12 bg-[#6a55ea] text-white rounded-lg text-lg font-semibold hover:bg-[#3b2f83] ease-in-out transition duration-300">
                Create Webinar
              </button>
            </Link>
          </div>
            <div className="py-4 w-full">
              {activeTab === "upcoming" ? (
                <UpcommingWebinars />
              ) : (
                <PastWebinars />
              )}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

export default AdminHomepage;
