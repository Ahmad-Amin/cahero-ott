import React from "react";
import StarIcon from "@mui/icons-material/Star";
const RatingsReviews = () => {
  const totalReviews = 129;
  const averageRating = 4.5;
  const ratings = [
    { stars: 5, count: 80 },
    { stars: 4, count: 30 },
    { stars: 3, count: 10 },
    { stars: 2, count: 5 },
    { stars: 1, count: 4 },
  ];

  return (
    <div className="ratings-container bg-transparent p-6 rounded-lg text-white">
      <h2 className="text-2xl font-semibold">Ratings & Reviews</h2>
      <p className="text-sm text-gray-400 mt-1">
        Rating and reviews are verified and are from people who use the service
      </p>
      <div className="flex items-center mt-4">
        <div className="text-center mr-6">
          <p className="text-4xl font-bold">{averageRating}</p>
          <p className="text-yellow-400 flex items-center">
            {[...Array(Math.round(averageRating))].map((_, index) => (
              <StarIcon key={index} fontSize="small" />
            ))}
          </p>
          <p className="text-sm">{totalReviews} reviews</p>
        </div>
        <div className="flex-1">
          {ratings.map((rating) => {
            const percentage = (rating.count / totalReviews) * 100;
            return (
              <div key={rating.stars} className="flex items-center mb-2">
                <p className="w-6 text-sm">{rating.stars}</p>
                <div className="flex-1 h-3 bg-white rounded-lg overflow-hidden mx-2">
                  <div
                    style={{ width: `${percentage}%` }}
                    className="h-full bg-blue-500"
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default RatingsReviews;
