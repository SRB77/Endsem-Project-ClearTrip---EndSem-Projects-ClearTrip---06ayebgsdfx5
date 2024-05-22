import React, { useState } from "react";
import SearchPanel from "../components/SearchPanel";
import HotelList from "../components/HotelList";

const Home = () => {
  const [hotels, setHotels] = useState([]);

  const handleSearch = async (city) => {
    const projectID = "06ayebgsdfx5";
    const response = await fetch(
      `https://academics.newtonschool.co/api/v1/bookingportals/hotel?search={"location":"${city}"}`,
      {
        headers: {
          projectID: projectID,
        },
      }
    );
    const data = await response.json();

    if (data.message === "success") {
      setHotels(data.data.hotels);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <SearchPanel onSearch={handleSearch} />
      <HotelList hotels={hotels} />
    </div>
  );
};

export default Home;
