import React from "react";
import HotelCard from "./HotelCard";

const HotelList = ({ hotels }) => {
  return (
    <div className="mt-10 max-w-4xl mx-auto">
      {hotels.length > 0 && (
        <h2 className="text-2xl font-bold mb-4">
          Showing Properties In {hotels[0]?.location}
        </h2>
      )}
      {hotels.map((hotel, index) => (
        <HotelCard key={index} hotel={hotel} />
      ))}
    </div>
  );
};

export default HotelList;
