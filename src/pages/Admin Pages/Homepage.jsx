import React, { useState } from "react";
import { Box } from "@mui/material";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DescriptionIcon from "@mui/icons-material/Description";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DeleteIcon from "@mui/icons-material/Delete";

const AdminHomepage = () => {
  const [activeTab, setActiveTab] = useState("upcoming"); // State to manage active tab

  // Sample data for webinars
  const upcomingWebinars = [
    {
      title: "Mastering Remote Work: Tips & Tools",
      date: "September 25, 2024",
      time: "3:00 PM - 4:30 PM (GMT)",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      joinedUsers: [
        `${process.env.PUBLIC_URL}/images/ellipse/1.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/2.png`,
      ],
    },
    {
      title: "Effective Communication in Teams",
      date: "September 26, 2024",
      time: "4:00 PM - 5:30 PM (GMT)",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      joinedUsers: [
        `${process.env.PUBLIC_URL}/images/ellipse/3.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/4.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/5.png`,
      ],
    },
    {
      title: "Time Management Strategies",
      date: "September 27, 2024",
      time: "2:00 PM - 3:30 PM (GMT)",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      joinedUsers: [
        `${process.env.PUBLIC_URL}/images/ellipse/1.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/2.png`,
      ],
    },
    {
      title: "The Future of Remote Work",
      date: "September 28, 2024",
      time: "1:00 PM - 2:30 PM (GMT)",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      joinedUsers: [
        `${process.env.PUBLIC_URL}/images/ellipse/3.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/4.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/5.png`,
      ],
    },
    // Add more webinars if needed
  ];

  const pastWebinars = [
    {
      title: "Mastering Remote Work: Tips & Tools",
      date: "September 25, 2024",
      time: "3:00 PM - 4:30 PM (GMT)",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      joinedUsers: [
        `${process.env.PUBLIC_URL}/images/ellipse/1.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/2.png`,
      ],
      engagement: 145,
    },
    {
      title: "Effective Communication in Teams",
      date: "September 26, 2024",
      time: "4:00 PM - 5:30 PM (GMT)",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      joinedUsers: [
        `${process.env.PUBLIC_URL}/images/ellipse/3.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/4.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/5.png`,
      ],
      engagement: 120,
    },
    {
      title: "Time Management Strategies",
      date: "September 27, 2024",
      time: "2:00 PM - 3:30 PM (GMT)",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      joinedUsers: [
        `${process.env.PUBLIC_URL}/images/ellipse/1.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/2.png`,
      ],
      engagement: 100,
    },
    {
      title: "The Future of Remote Work",
      date: "September 28, 2024",
      time: "1:00 PM - 2:30 PM (GMT)",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      joinedUsers: [
        `${process.env.PUBLIC_URL}/images/ellipse/3.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/4.png`,
        `${process.env.PUBLIC_URL}/images/ellipse/5.png`,
      ],
      engagement: 200,
    },
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 p-4 items-center px-16">
        <div className="bg-[#ffe2e5] rounded-3xl shadow-md aspect-square">
          <div className="w-full flex justify-start items-center">
            <div className="bg-[#fa5a7d] rounded-full w-20 h-20 mx-6 my-7 flex justify-center items-center text-white">
              <AnalyticsIcon fontSize="large" />
            </div>
          </div>
          <div className="w-auto justify-start items-center mx-7 my-5">
            <div className="space-y-3">
              <h1 className="text-[#151d48] font-bold text-3xl">$ 1K</h1>
              <h1 className="text-[#425166] font-bold text-2xl">Total Sales</h1>
              <h1 className="text-[#4079ed] font-bold text-xl">
                +8% from Last Month
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-[#fff4de] rounded-3xl shadow-md aspect-square">
          <div className="w-full flex justify-start items-center">
            <div className="bg-[#ff947a] rounded-full w-20 h-20 mx-6 my-7 flex justify-center items-center text-white">
              <DescriptionIcon fontSize="large" />
            </div>
          </div>
          <div className="w-auto justify-start items-center mx-7 my-5">
            <div className="space-y-3">
              <h1 className="text-[#151d48] font-bold text-3xl">120</h1>
              <h1 className="text-[#425166] font-bold text-2xl">
                Active Users
              </h1>
              <h1 className="text-[#4079ed] font-bold text-xl">
                +5% from Yesterday
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-[#dcfce7] rounded-3xl shadow-md aspect-square">
          <div className="w-full flex justify-start items-center">
            <div className="bg-[#3cd856] rounded-full w-20 h-20 mx-6 my-7 flex justify-center items-center text-white">
              <LocalOfferIcon fontSize="large" />
            </div>
          </div>
          <div className="w-auto justify-start items-center mx-7 my-5">
            <div className="space-y-3">
              <h1 className="text-[#151d48] font-bold text-3xl">357</h1>
              <h1 className="text-[#425166] font-bold text-2xl">
                Total Subscribers
              </h1>
              <h1 className="text-[#4079ed] font-bold text-xl">
                +1.2% from Yesterday
              </h1>
            </div>
          </div>
        </div>
        <div className="bg-[#f3e8ff] rounded-3xl shadow-md aspect-square">
          <div className="w-full flex justify-start items-center">
            <div className="bg-[#bf83ff] rounded-full w-20 h-20 mx-6 my-7 flex justify-center items-center text-white">
              <PersonAddAlt1Icon fontSize="large" />
            </div>
          </div>
          <div className="w-auto justify-start items-center mx-7 my-5">
            <div className="space-y-3">
              <h1 className="text-[#151d48] font-bold text-3xl">8</h1>
              <h1 className="text-[#425166] font-bold text-2xl w-32">
                Upcoming Webinars
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black rounded-2xl mx-10 py-10 mt-10 flex content-between">
        <div>
        <div className="flex items-center mx-10 gap-10">
          <button
            onClick={() => setActiveTab("upcoming")}
            className={`mx-2 text-3xl font-semibold ${
              activeTab === "upcoming"
                ? "text-white"
                : "text-[#808080] hover:text-white ease-in-out transition duration-300"
            }`}
          >
            Upcoming Webinars
          </button>
          <button
            onClick={() => setActiveTab("past")}
            className={`mx-2 text-3xl font-semibold ${
              activeTab === "past"
                ? "text-white"
                : "text-[#808080] hover:text-white ease-in-out transition duration-300"
            }`}
          >
            Past Webinars
          </button>
        </div>
        <div className="w-full flex justify-end px-10">

        <button className="w-52 h-16 bg-[#6a55ea] text-white rounded-xl text-lg font-semibold hover:bg-[#3b2f83] ease-in-out transition duration-300"> Create Webinar</button>

        </div>

        <div className="grid grid-cols-2 gap-4 py-4 mx-10">
          {(activeTab === "upcoming" ? upcomingWebinars : pastWebinars).map(
            (webinar, index) => (
              <div
                key={index}
                className="bg-transparent rounded-3xl p-4 shadow-md h-auto border-2 relative" // Added relative position
              >
                <h2 className="font-bold text-xl text-white mt-1">
                  {webinar.title}
                </h2>
                <DeleteIcon className="absolute top-3 right-3 text-red-500 cursor-pointer" />
                <p className="text-[#808080] mt-2">{webinar.description}</p>
                <div className="flex items-center mt-2">
                  <div className="text-[#6a55ea] mr-1">
                    <CalendarTodayIcon />
                  </div>
                  <p className="text-white mr-2">Date:</p>
                  <p className="text-[#b2b2b2]">{webinar.date}</p>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-[#6a55ea] mr-1">
                    <AccessTimeIcon />
                  </div>
                  <p className="text-white mr-2">Time:</p>
                  <p className="text-[#b2b2b2]">{webinar.time}</p>
                </div>
                <div className="flex items-center mt-2">
                  <div className="text-[#6a55ea] mr-1">
                    <PeopleAltIcon />
                  </div>
                  <p className="text-white mr-2">Joined Users:</p>
                  <div className="flex ml-2">
                    {" "}
                    {webinar.joinedUsers.map((user, userIndex) => (
                      <img
                        key={userIndex}
                        src={user}
                        alt={`User ${userIndex + 1}`}
                        className="inline-block w-8 h-8 rounded-full -ml-2" // Adjust margin for overlap
                      />
                    ))}
                  </div>
                </div>
                  {webinar.engagement && (
                    <div className="flex items-center mt-2">
                      <div className="text-[#6a55ea] mr-1">
                        <PeopleAltIcon />
                      </div>
                      <p className="text-white mr-2">Engagement:</p>
                      <p className="text-[#b2b2b2]">{webinar.engagement}</p>
                    </div>
                  )}{" "}
                </div>
            )
          )}
        </div>
        </div>
      </div>
    </Box>
  );
};

export default AdminHomepage;
