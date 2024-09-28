import React, { useRef, useEffect } from "react";

const ConfirmDelete = ({ isOpen, onClose, onConfirm, itemType }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-[#101011] border border-white rounded-2xl p-6 w-1/3 h-1/3 flex items-center justify-center"
      >
        <div>
          <div className="text-center mb-10">
            <h2 className="text-white text-2xl font-semibold">
              Do you really want to delete this {itemType}?
            </h2>
          </div>
          <div className="flex justify-around mx-10 gap-6">
            <button
              className="border border-[#6a55ea] text-[#6a55ea] w-44 h-12 rounded-lg hover:bg-[#6a55ea] hover:text-white transition duration-200"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="bg-[#6a55ea] text-white rounded-lg w-44 h-12 hover:bg-[#e53939] transition duration-200"
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDelete;
