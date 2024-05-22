import React, { useState, useEffect } from "react";

const SearchPanel = ({ onSearch }) => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      const projectID = "06ayebgsdfx5";
      const response = await fetch(
        "https://academics.newtonschool.co/api/v1/bookingportals/city?limit=40",
        {
          headers: {
            projectID: projectID,
          },
        }
      );
      const data = await response.json();
      if (data.status === "success") {
        const cityNames = data.data.cities.map(
          (city) => city.cityState.split(",")[0]
        );
        setCities(cityNames);
      }
    };

    fetchCities();
  }, []);

  const handleSearch = () => {
    onSearch(selectedCity);
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setSelectedCity(input);
    const filteredSuggestions = cities.filter(
      (city) => city.toLowerCase().indexOf(input.toLowerCase()) > -1
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setSelectedCity(suggestion);
    setSuggestions([]);
  };

  const handleCityClick = (city) => {
    setSelectedCity(city);
    setSuggestions([]);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 bg-white shadow-md rounded">
      <div className="relative">
        <input
          type="text"
          id="city"
          value={selectedCity}
          onChange={handleInputChange}
          className="flex-grow px-3 py-2 border rounded-l focus:outline-none focus:ring focus:border-blue-300"
          placeholder="Destination"
        />
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 z-10 bg-white border rounded-b w-full">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-200"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        {selectedCity.length > 0 && (
          <ul className="absolute top-full left-0 z-10 bg-white border rounded-b w-full">
            {cities
              .filter((city) =>
                city.toLowerCase().includes(selectedCity.toLowerCase())
              )
              .map((city, index) => (
                <li
                  key={index}
                  onClick={() => handleCityClick(city)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {city}
                </li>
              ))}
          </ul>
        )}
        <button
          onClick={handleSearch}
          className="bg-orange-500 text-white py-2 px-4 rounded-r hover:bg-orange-600"
        >
          Search{" >"}
        </button>
      </div>
    </div>
  );
};

export default SearchPanel;
