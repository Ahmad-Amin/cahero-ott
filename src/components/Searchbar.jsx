import { HiOutlineAdjustments } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
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
          <HiOutlineAdjustments className="mx-2 text-xl sm:text-3xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
