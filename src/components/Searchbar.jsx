import { useEffect, useState } from "react";
import { HiOutlineAdjustments } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { Divider } from "@mui/material";

const SearchBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Today"); // Default selected option

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Prevent dropdown from closing when clicking inside it
  const handleDropdownClick = (event) => {
    event.stopPropagation();
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      const dropdown = document.getElementById("dropdown"); // Get dropdown element
      if (dropdown && !dropdown.contains(event.target)) {
        setIsDropdownOpen(false); // Close dropdown
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Add event listener

    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup listener on unmount
    };
  }, []);

  return (
    <div className="relative w-full items-center px-4 sm:px-0">
      <div className="flex items-center justify-center w-full sm:w-96 h-14 bg-transparent text-white font-bold text-xl">
        <div className="w-full sm:w-3/4 h-12 bg-transparent rounded-3xl flex items-center justify-center text-black font-normal text-lg border border-white transition-all duration-300 ease-in-out">
          <FiSearch className="mx-2 text-xl sm:text-3xl text-white" />
          <input
            type="text"
            placeholder="Search Properties..."
            className="w-full h-full px-1 bg-transparent outline-none text-white font-normal text-sm sm:text-base"
          />
          <div onClick={toggleDropdown} className="relative">
            <HiOutlineAdjustments className="mx-2 text-xl sm:text-3xl text-white cursor-pointer" />
            {isDropdownOpen && (
              <div
                id="dropdown" // Add an ID for the dropdown element
                className="absolute right-0 mt-5 mr-2 bg-[#0d0d0d] w-auto h-auto text-[#d0d0d0] rounded-lg shadow-lg z-10 flex flex-col"
                onClick={handleDropdownClick}
              >
                <div>
                  {["Today", "This week", "This month", "This year", "Set up"].map((option, index) => (
                    <div key={option}>
                      <div 
                        className={`flex items-center justify-start px-10 w-56 h-12 ${selectedOption === option ? 'bg-[#1b1a1f] rounded-lg' : ''}`}
                      >
                        <label className="flex items-center cursor-pointer">
                          <input 
                            type="radio" // Change checkbox to radio
                            name="dateOption" // All radio buttons should have the same name
                            value={option} // Set the value of the radio button
                            checked={selectedOption === option}
                            onChange={() => handleOptionChange(option)}
                            className="appearance-none w-5 h-5 border-2 border-white rounded-full cursor-pointer checked:bg-white checked:border-transparent"
                          />
                          <span className="ml-3">{option}</span>
                        </label>
                      </div>
                      {/* Add Divider after each option except the last one */}
                      {index < 4 && <Divider className="bg-[#393e40]" />}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
