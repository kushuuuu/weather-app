import React, { useEffect, useState } from "react";
import WeatherCard from "../components/WeatherCard";

const API_KEY = "71358d610c70b8d53e9be38e49759cb0"; // Use your actual OpenWeatherMap API key

const CITIES = [
  "New York",
  "London",
  "Paris",
  "Kathmandu",
  "Tokyo",
  "Delhi",
  "Sydney",
  "Cairo",
  "Toronto",
  "Beijing",
];

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
  const [selectedCity, setSelectedCity] = useState(
    localStorage.getItem("preferredPlace") || CITIES[0]
  );
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    if (selectedCity) {
      loadWeather();
    }
  }, [selectedCity]);

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
  };

  return (
    <div
      style={{
       
      }}
    >
      <h1>Weather App</h1>

      <label style={{ marginBottom: "1rem", fontSize: "1rem" }}>
        Select a city:
        <select
          value={selectedCity}
          onChange={handleCityChange}
          style={{
            marginLeft: "1rem",
            padding: "0.5rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        >
          {CITIES.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </label>

      {loading && <p>Loading weather...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && weather && <WeatherCard weather={weather} />}
    </div>
  );
}
