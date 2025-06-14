import React, { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";

const API_KEY = "71358d610c70b8d53e9be38e49759cb0"; 
async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${API_KEY}&units=metric`; // Use metric for Celsius

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Location not found");
  }

  return await response.json();
}

export default function Home() {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem("preferredPlace") || ""
  );
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("preferredPlace") || ""
  );
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedCity) {
      const loadWeather = async () => {
        setLoading(true);
        setError(null);
        try {
          const data = await fetchWeather(selectedCity);
          setWeather(data);
          localStorage.setItem("preferredPlace", selectedCity);
        } catch (err) {
          setError(err.message || "Failed to fetch weather");
          setWeather(null);
        }
        setLoading(false);
      };
      loadWeather();
    }
  }, [selectedCity]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setError("Please enter a city name.");
      return;
    }
    setSelectedCity(searchTerm.trim());
  };

  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "1rem",
      }}
    >
      <h1>Weather App</h1>

      <form onSubmit={handleSearch} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Enter city name"
          value={searchTerm}
          onChange={handleInputChange}
          style={{
            padding: "0.5rem",
            borderRadius: "4px 0 0 4px",
            border: "1px solid #ccc",
            fontSize: "1rem",
            width: "220px",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "0 4px 4px 0",
            border: "1px solid #1e90ff",
            backgroundColor: "#1e90ff",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Search
        </button>
      </form>

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && weather && <WeatherCard weather={weather} />}
    </div>
  );
}
