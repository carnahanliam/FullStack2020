import React, { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [countryWeather, setCountryWeather] = useState({
    temperature: null,
    windSpeed: null,
    windDirection: null,
    description: null,
    weatherIcon: null,
  });
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    console.log("weather effect");
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`
      )
      .then((response) => {
        const temp = response.data.current.temperature;
        const wind_speed = response.data.current.wind_speed;
        const wind_dir = response.data.current.wind_dir;
        const desc = response.data.current.weather_descriptions[0];
        const icon = response.data.current.weather_icons[0];
        const weatherObject = {
          temperature: temp,
          windSpeed: wind_speed,
          windDirection: wind_dir,
          description: desc,
          weatherIcon: icon,
        };
        console.log(weatherObject);
        setCountryWeather(weatherObject);
      });
  }, [capital, api_key]);

  return (
    <>
      <h2>Weather in {capital}</h2>
      <p>
        It is currently {countryWeather.description} and{" "}
        {countryWeather.temperature} degrees Celsius.
      </p>
      <img
        src={countryWeather.weatherIcon}
        alt={`${capital} weather icon`}
        width="100"
      />
      <p>
        <b>Wind:</b> {countryWeather.windSpeed} km/h{" "}
        {countryWeather.windDirection}
      </p>
    </>
  );
};

export default Weather;
