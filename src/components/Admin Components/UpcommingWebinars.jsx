import React from "react";
import { Box } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";

const UpcomingWebinars = () => {
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
  ];

  return (
    <div  className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6" >
      {upcomingWebinars.map((webinar, index) => (
        <div
          key={index}
          className="bg-transparent rounded-3xl p-4 shadow-md h-auto border-2 relative mb-6"
        >
          <h2 className="font-bold text-xl text-white mt-1">{webinar.title}</h2>

          {/* Icons */}
          <div className="absolute top-3 right-3 flex gap-2">
            <ModeEditIcon className="text-white cursor-pointer hover:text-blue-500 transition-colors duration-300" />
            <DeleteIcon className="text-red-500 cursor-pointer hover:text-red-700 transition-colors duration-300" />
          </div>

          <p className="text-[#808080] mt-2">{webinar.description}</p>

          {/* Webinar Details */}
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

          {/* Joined Users */}
          <div className="flex items-center mt-2">
            <div className="text-[#6a55ea] mr-1">
              <PeopleAltIcon />
            </div>
            <p className="text-white mr-2">Joined Users:</p>
            <div className="flex ml-2">
              {webinar.joinedUsers.map((user, userIndex) => (
                <img
                  key={userIndex}
                  src={user}
                  alt={`User ${userIndex + 1}`}
                  className="inline-block w-8 h-8 rounded-full -ml-2"
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingWebinars;
