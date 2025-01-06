import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { loginUserApi } from "../api/api";
import Alert from "./Alert";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    alert,
    tourId,
    price,
    description,
    stayTime,
    img,
    title,
    city,
    departureLocation,
    returnDetails,
    myTour,
    navigateExploremore,
  } = location.state || {};

  const [eye, setEye] = useState(true);
  const [formValue, setFormValue] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formValue;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation regex

  const isFormValid = isValidEmail(email) && password.trim();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUserApi(formValue);
      if (response.status) {
        {
          navigateExploremore
            ? navigate("/exploremore") : 
            navigate("/exploremore")
            // : navigate("/booknow", {
            //     state: {
            //       alert: true,
            //       tourId,
            //       price,
            //       description,
            //       stayTime,
            //       img,
            //       title,
            //       city,
            //       departureLocation,
            //       returnDetails,
            //       myTour,
            //     },
            //   });
        }
        localStorage.setItem("authToken", response.data.authToken);
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  const handleChange = (e) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const navigateSignUp = () => {
    navigate("/signup", {
      state: {
        tourId,
        price,
        description,
        stayTime,
        img,
        title,
        city,
        departureLocation,
        returnDetails,
        myTour,
      },
    });
  };

  return (
    <>
      <div className="box">
        <h1 className="mt-3" style={{ color: "#202445" }}>
          Welcome To Login Page
        </h1>

        <div className="d-flex justify-content-center">
          <div style={{ width: "30em" }}>
            {alert && (
              <Alert message="SignUp was Successfull, please Login to Continue" />
            )}
          </div>
        </div>
      </div>

      <div className="box" style={{ width: "30em" }}>
        <form style={{ marginTop: "5em" }} onSubmit={loginUser}>
          <div className="mb-3 blueColor">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={handleChange}
              value={email}
            />
          </div>
          <div className="mb-3 blueColor">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <div className="d-flex justify-content-center align-items-center">
              <input
                type={!eye ? "text" : "password"}
                className="form-control"
                id="Password"
                name="password"
                onChange={handleChange}
                value={password}
              />
              <div
                style={{ padding: "0px 10px", cursor: "pointer" }}
                onClick={() => {
                  setEye((prev) => !prev);
                }}
              >
                {!eye ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>
          </div>
          <div
            className="mt-2 mb-4"
            style={{
              color: "#f16b51",
              fontWeight: 400,
            }}
            onClick={navigateSignUp}
          >
            Don't have an account, signup <u>here</u>.
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                backgroundColor: isFormValid ? "#f16b51" : "#d3d3d3",
                padding: "0.7rem 8rem",
                color: isFormValid ? "#ffffff" : "#8e8e8e",
                borderRadius: "12px",
                border: "none",
                fontWeight: 600,
                cursor: isFormValid ? "pointer" : "not-allowed",
              }}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
