import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div
      style={{
        backgroundColor: "#f0f8ff",
        padding: "1.5rem",
        borderRadius: "10px",
        width: "300px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2>
        {weather.name}, {weather.sys.country}
      </h2>
      <p>
        <strong>Temperature:</strong> {weather.main.temp}°C
      </p>
      <p>
        <strong>Weather:</strong> {weather.weather[0].description}
      </p>
      <p>
        <strong>Humidity:</strong> {weather.main.humidity}%
      </p>
      <p>
        <strong>Wind Speed:</strong> {weather.wind.speed} m/s
      </p>
    </div>
  );
};

export default WeatherCard;
