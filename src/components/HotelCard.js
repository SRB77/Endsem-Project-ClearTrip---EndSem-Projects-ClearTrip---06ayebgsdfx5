import React from "react";

// Function to generate a random rating count
const generateRandomRatingCount = () => {
  return Math.floor(Math.random() * 1000) + 1;
};

// Function to get review word based on rating
const getReviewWord = (rating) => {
  if (rating <= 1) return "Poor";
  if (rating <= 2) return "Fair";
  if (rating <= 3) return "Good";
  if (rating <= 4) return "Very good";
  return "Excellent";
};

const HotelCard = ({ hotel }) => {
  const ratingCount = generateRandomRatingCount();
  const reviewWord = getReviewWord(hotel.rating);

  return (
    <div className="p-4 mb-4 bg-white shadow-md rounded flex justify-between items-center">
      <div className="flex items-center">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-32 h-32 rounded mr-4"
        />
        <div>
          <h3 className="text-xl font-bold">{hotel.name}</h3>
          <p className="text-gray-600">{hotel.location.split(",")[0]}</p>
          <div className="flex items-center mt-2">
            <span className="bg-blue-100 text-blue-500 px-2 py-1 rounded">
              {hotel.rating}
            </span>
            <span className="ml-2">{reviewWord}</span>
            <span className="ml-2 text-gray-500">• {ratingCount} Ratings</span>
          </div>
          <p className="mt-2">{hotel.rooms[0]?.roomType}</p>
          <p>{hotel.rooms[0]?.bedDetail}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-xl font-bold">
          ₹{Math.floor(hotel.avgCostPerNight)}
        </p>
        <p className="text-gray-500">per night, per room</p>
      </div>
    </div>
  );
};

export default HotelCard;
