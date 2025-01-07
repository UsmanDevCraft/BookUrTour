import { baseUrl } from "./baseurl";
import axios from "axios";
const Token = localStorage.getItem("authToken");
if (!Token) {
  console.error("Auth token is missing. Please log in.");
}
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
