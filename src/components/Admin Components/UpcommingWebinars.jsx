import React, { useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Link } from "react-router-dom";
import ConfirmDelete from "../../components/Admin Components/ConfirmDelete"; // Import the DeleteConfirmation component

const UpcomingWebinars = () => {
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  const handleDeleteConfirm = () => {
    console.log("Webinar deleted");
    setIsModalOpen(false);
  };

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
    <>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {upcomingWebinars.map((webinar, index) => (
          <div
            key={index}
            className="bg-transparent rounded-3xl p-4 shadow-md h-auto border-2 relative mb-6"
          >
            <div className="flex flex-row gap-3">
            <div className="flex-1"> 
            <h2 className="font-bold text-lg md:text-xl lg:text-2xl text-white mt-1">
              {webinar.title}
            </h2>
            </div>

            <div>
              <Link to="/dashboard/webinars/manage-webinar">
                <ModeEditIcon className="text-[#05c283] cursor-pointer hover:text-[#038f60] ease-in-out transition-colors duration-300" />
              </Link>
            </div>
            <div>
            <DeleteIcon
                className="text-[#e53939] cursor-pointer hover:text-[#b22c2c] ease-in-out transition-colors duration-300"
                onClick={() => setIsModalOpen(true)} // Open modal on click
              />
            </div>
            </div>

            <p className="text-[#808080] mt-2 text-sm md:text-base">
              {webinar.description}
            </p>

            <div className="flex items-center mt-2 text-sm md:text-base">
              <CalendarTodayIcon className="text-[#6a55ea] mr-1" />
              <p className="text-white mr-2">Date:</p>
              <p className="text-[#b2b2b2]">{webinar.date}</p>
            </div>
            <div className="flex items-center mt-2 text-sm md:text-base">
              <AccessTimeIcon className="text-[#6a55ea] mr-1" />
              <p className="text-white mr-2">Time:</p>
              <p className="text-[#b2b2b2]">{webinar.time}</p>
            </div>

            {/* Joined Users */}
            <div className="flex items-center mt-2">
              <PeopleAltIcon className="text-[#6a55ea] mr-1" />
              <p className="text-white mr-2">Joined Users:</p>
              <div className="flex ml-2">
                {webinar.joinedUsers.map((user, userIndex) => (
                  <img
                    key={userIndex}
                    src={user}
                    alt={`User ${userIndex + 1}`}
                    className="inline-block w-6 h-6 md:w-8 md:h-8 rounded-full -ml-2"
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDelete
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)} // Close modal
        onConfirm={handleDeleteConfirm} // Handle delete confirmation
      />
    </>
  );
};

export default UpcomingWebinars;
