import { baseUrl } from "./baseurl";
const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
const weatherUrl = import.meta.env.VITE_WEATHER_BASE_URL;
const weatherUrlPast = import.meta.env.VITE_WEATHER_BASE_URL_PAST;
const weatherUrlFuture = import.meta.env.VITE_WEATHER_BASE_URL_FUTURE;
import axios from "axios";
const Token = localStorage.getItem("authToken");
const isTokenValid = () => {
  const expiry = localStorage.getItem("expiry");
  const currentTime = Math.floor(Date.now() / 1000); // Get current time in seconds

  if (expiry && currentTime < expiry) {
    return true; // Token is still valid
  } else {
    return false; // Token has expired
  }
};
if (!isTokenValid()) {
  localStorage.removeItem("authToken");
  localStorage.removeItem("expiry");
}

// < --------------------------------------------- API FOR POST NEW USER --------------------------------------------- >

export const signUpUserApi = async (formValue) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/createuser`,
      formValue,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response status indicates success (2xx range)
    if (response.status >= 200 && response.status < 300) {
      return { status: true, data: response.data };
    } else {
      return { status: false, error: response.data };
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { status: false, error: error.message };
  }
};

// < --------------------------------------------- API FOR POST LOGIN USER --------------------------------------------- >

export const loginUserApi = async (formValue) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/auth/loginuser`,
      formValue,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the response status indicates success (2xx range)
    if (response.status >= 200 && response.status < 300) {
      return { status: true, data: response.data };
    } else {
      return { status: false, error: response.data };
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { status: false, error: error.message };
  }
};

// < --------------------------------------------- API FOR POST BOOK TOUR --------------------------------------------- >

export const bookTourApi = async (formValue) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/tour/tourbooked`,
      formValue,
      {
        headers: {
          "Content-Type": "application/json",
          "auth-token": Token,
        },
      }
    );

    // Check if the response status indicates success (2xx range)
    if (response.status >= 200 && response.status < 300) {
      return { status: true, data: response.data };
    } else {
      return { status: false, error: response.data };
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { status: false, error: error.message };
  }
};

// < --------------------------------------------- API FOR GET ALL BOOK TOURS --------------------------------------------- >

export const getBookedToursApi = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/tour/getalltours`, {
      headers: {
        "Content-Type": "application/json",
        "auth-token": Token,
      },
    });

    // Check if the response status indicates success (2xx range)
    if (response.status >= 200 && response.status < 300) {
      return { status: true, data: response.data };
    } else {
      return { status: false, error: response.data };
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { status: false, error: error.message };
  }
};


// < --------------------------------------------- API FOR GET WEATHER CURRENT --------------------------------------------- >

export const getWeatherCurrentApi = async (city) => {
  try {
    const response = await axios.get(`${weatherUrl}?q=${city}&lang=en&key=${apiKey}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response status indicates success (2xx range)
    if (response.status >= 200 && response.status < 300) {
      return { status: true, data: response.data };
    } else {
      return { status: false, error: response.data };
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { status: false, error: error.message };
  }
};


// < --------------------------------------------- API FOR GET WEATHER PAST --------------------------------------------- >

export const getWeatherPastApi = async (city, date, endDate) => {
  try {
    const response = await axios.get(`${weatherUrlPast}?q=${city}&dt=${date}&end_dt=${endDate}&hour=12&lang=en&key=${apiKey}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response status indicates success (2xx range)
    if (response.status >= 200 && response.status < 300) {
      return { status: true, data: response.data };
    } else {
      return { status: false, error: response.data };
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { status: false, error: error.message };
  }
};

// < --------------------------------------------- API FOR GET WEATHER FUTURE --------------------------------------------- >

export const getWeatherFutureApi = async (city, date ) => {
  try {
    const response = await axios.get(`${weatherUrlFuture}?q=${city}&dt=${date}&lang=en&key=${apiKey}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Check if the response status indicates success (2xx range)
    if (response.status >= 200 && response.status < 300) {
      return { status: true, data: response.data };
    } else {
      return { status: false, error: response.data };
    }
  } catch (error) {
    console.error("Error creating user:", error.message);
    return { status: false, error: error.message };
  }
};