import React, { useEffect, useState } from "react";
import { GoSun } from "react-icons/go";
import { CiCloudOn } from "react-icons/ci";
import {
  getWeatherCurrentApi,
  getWeatherPastApi,
  getWeatherFutureApi,
} from "../api/api";

const WeatherCards = ({ city }) => {
  const [tempDay1, setTempDay1] = useState("18");
  const [textDay1, settextDay1] = useState("Sunny");
  const [iconDay1, seticonDay1] = useState(<GoSun />);
  const [loc, setLoc] = useState("");
  const [tempDay2, setTempDay2] = useState("18");
  const [textDay2, settextDay2] = useState("Sunny");
  const [iconDay2, seticonDay2] = useState(<GoSun />);
  const [tempDay14, setTempDay14] = useState("18");
  const [textDay14, settextDay14] = useState("Sunny");
  const [iconDay14, seticonDay14] = useState(<GoSun />);
  const today = new Date();
  const date = today.toISOString().split("T")[0];
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const endDate = tomorrow.toISOString().split("T")[0];
  const nextWeek = new Date();
  nextWeek.setDate(today.getDate() + 14);
  const futureDate = nextWeek.toISOString().split("T")[0];

  const arrayWeather = [
    {
      day: "Yesterday",
      temp: tempDay2,
      text: textDay2,
      icon: iconDay2,
      location: loc,
    },
    {
      day: "Today",
      temp: tempDay1,
      text: textDay1,
      icon: iconDay1,
      location: loc,
    },
    {
      day: "Next Week",
      temp: tempDay14,
      text: textDay14,
      icon: iconDay14,
      location: loc,
    },
  ];

  const fecthTodayWeather = async () => {
    try {
      const response = await getWeatherCurrentApi(city);
      setTempDay1(response.data.current.temp_c);
      settextDay1(response.data.current.condition.text);
      seticonDay1(response.data.current.condition.icon);
      setLoc(response.data.location.country);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fecthPastWeather = async () => {
    try {
      const response = await getWeatherPastApi(city, date, endDate);
      setTempDay2(response.data.forecast.forecastday[0].day.avgtemp_c);
      settextDay2(response.data.forecast.forecastday[0].day.condition.text);
      seticonDay2(response.data.forecast.forecastday[0].day.condition.icon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const fecthFutureWeather = async () => {
    try {
      const response = await getWeatherFutureApi(city, futureDate);
      setTempDay14(response.data.forecast.forecastday[0].day.avgtemp_c);
      settextDay14(response.data.forecast.forecastday[0].day.condition.text);
      seticonDay14(response.data.forecast.forecastday[0].day.condition.icon);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fecthTodayWeather();
    fecthPastWeather();
    fecthFutureWeather();
  }, [city]);

  return (
    <div className="d-flex gap-5">
      {arrayWeather &&
        arrayWeather.map(({ day, temp, text, icon, location }, index) => (
          <div
            className="card"
            style={{
              width: "27rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            key={index}
          >
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start">
                <h5 className="card-title" style={{ color: "#202445" }}>
                  {day}
                </h5>
                <div className="d-flex align-items-center justify-content-center gap-2">
                  <img src={icon} alt="" />
                  <h5 style={{ color: "#202445" }}>
                    {temp}
                    <sup>&#x2022;</sup>C
                  </h5>
                </div>
              </div>
              <p className="card-text mt-3" style={{ color: "#404040" }}>
                {text}
              </p>
              <p className="card-text mt-3" style={{ color: "#404040" }}>
                {location}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default WeatherCards;
