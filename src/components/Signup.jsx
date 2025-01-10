import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { signUpUserApi } from "../api/api";

const Signup = () => {
  const navigate = useNavigate();
  const [eye, setEye] = useState(true);
  const [formValue, setFormValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = formValue;

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation regex

  const isFormValid = name.trim() && isValidEmail(email) && password.trim();

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      const response = await signUpUserApi(formValue);
      if (response.status) {
        navigate("/exploremore", {state: {alert: true}});
        localStorage.setItem("authToken", response.data.authToken);
        localStorage.setItem("expiry", response.data.expiry);
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  const handleChange = (e) => {
    setFormValue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="box">
        <h1 className="mt-3" style={{ color: "#202445" }}>
          Welcome To Signup Page
        </h1>
      </div>

      <div className="box" style={{ width: "30em" }}>
        <form style={{ marginTop: "5em" }} onSubmit={signupUser}>
          <div className="mb-3 blueColor">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="name"
              onChange={handleChange}
              value={name}
            />
          </div>
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
            onClick={() => {
              navigate("/login");
            }}
          >
            Already have an account, login <u>here</u>.
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
