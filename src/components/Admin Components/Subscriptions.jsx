import React from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";

const Subscriptions = () => {
  const plans = [
    {
      name: "Basic Plan",
      price: "2,499",
      features: [
        "Access to Videos",
        "Exclusive content",
        "Exclusive content",
        "Exclusive content",
        "Exclusive content",
      ],
    },
    {
      name: "Extended Plan",
      price: "2,499",
      features: [
        "Access to Videos",
        "Exclusive content",
        "Exclusive content",
        "Exclusive content",
        "Exclusive content",
      ],
    },
    {
      name: "Premium Plan",
      price: "2,499",
      features: [
        "Access to Videos",
        "Exclusive content",
        "Exclusive content",
        "Exclusive content",
        "Exclusive content",
      ],
    },
  ];

  return (
    <div className="p-8 bg-transparent min-h-screen">
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-[#000000] border border-[#6a55ea] rounded-xl p-6 text-white relative"
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-row gap-3 flex-1">
                <h3 className="text-xl font-semibold text-[#6a55ea]">
                  {plan.name}
                </h3>
              </div>
              <div className="flex items-center gap-3">
                <ModeEditIcon className="text-[#05c283] cursor-pointer hover:text-[#038f60] ease-in-out transition-colors duration-300 mr-2" />
                <DeleteIcon
                  className="text-[#e53939] cursor-pointer hover:text-[#b22c2c] ease-in-out transition-colors duration-300"
                />
              </div>
            </div>
            <h2 className="text-3xl font-bold my-4">
              {plan.price} <span className="text-lg">$/mo</span>
            </h2>
            <ul className="space-y-2 mb-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-lg">
                  <span className="text-[#6a55ea] mr-2">●</span>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="w-full flex justify-center">
              <button className="bg-[#6a55ea] w-1/2 py-3 rounded-md text-lg font-semibold hover:bg-[#5242b6] transition ease-in-out">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscriptions;
