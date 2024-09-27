import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ConfirmDelete from "../../components/Admin Components/ConfirmDelete"; // Import the DeleteConfirmation component
import { FaPlay } from "react-icons/fa"; // Import the play icon
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const Lectures = () => {
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
      duration: "3 hr 35 min 20 sec",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      image: `${process.env.PUBLIC_URL}/images/videoprofile.png`,
    },
    {
      title: "Mastering Remote Work: Tips & Tools",
      date: "September 25, 2024",
      time: "3:00 PM - 4:30 PM (GMT)",
      duration: "3 hr 35 min 20 sec",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      image: `${process.env.PUBLIC_URL}/images/videoprofile.png`,
    },
    {
      title: "Mastering Remote Work: Tips & Tools",
      date: "September 25, 2024",
      time: "3:00 PM - 4:30 PM (GMT)",
      duration: "3 hr 35 min 20 sec",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      image: `${process.env.PUBLIC_URL}/images/videoprofile.png`,
    },
    {
      title: "Mastering Remote Work: Tips & Tools",
      date: "September 25, 2024",
      time: "3:00 PM - 4:30 PM (GMT)",
      duration: "3 hr 35 min 20 sec",
      description:
        "Learn how to effectively manage remote work, collaborate with teams, and boost productivity using the best tools available.",
      image: `${process.env.PUBLIC_URL}/images/videoprofile.png`,
    },
    // Add other webinars here...
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
        {upcomingWebinars.map((webinar, index) => (
          <div
            key={index}
            className="bg-[#000000] rounded-3xl p-4 shadow-md h-auto border border-[#ffffff] relative mb-3 flex items-center"
          >
            <div className="w-1/3 relative">
              <img
                src={webinar.image}
                alt={webinar.title}
                className="rounded-lg w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FaPlay className="text-white opacity-65 text-5xl hover:opacity-85 transition-opacity duration-300" />
              </div>
            </div>

            <div className="w-full pl-4 h-full">
              <h2 className="font-bold text-xl text-white mb-3">
                {webinar.title}
              </h2>

              <div className="flex items-center mb-3">
                <CalendarTodayIcon className="text-[#6a55ea] mr-1" />
                <p className="text-white mr-2">Date:</p>
                <p className="text-[#b2b2b2]">{webinar.date}</p>
              </div>

              <div className="flex items-center mb-4">
                <AccessTimeIcon className="text-[#6a55ea] mr-1" />
                <p className="text-white mr-2">Duration:</p>
                <p className="text-[#b2b2b2]">{webinar.duration}</p>
              </div>

              <div className="flex justify-start mt-6 gap-3">
                <ModeEditIcon className="text-[#05c283] cursor-pointer hover:text-[#038f60] ease-in-out transition-colors duration-300" />
                <DeleteIcon
                  className="text-[#e53939] cursor-pointer hover:text-[#b22c2c] ease-in-out transition-colors duration-300"
                  onClick={() => setIsModalOpen(true)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmDelete
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
};

export default Lectures;
