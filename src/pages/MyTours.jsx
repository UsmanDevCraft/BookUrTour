import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchDetailCards from "../components/SearchDetailCards";
import { getBookedToursApi } from "../api/api";

const MyTours = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourDays, setTourDays] = useState([]);
  const [tourName, setTourName] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const location = useLocation();
  const data = location.state;

  const [arrayData, setArrayData] = useState([]);

  const fetchAllTours = async () => {
    try {
      setLoading(true);
      const response = await getBookedToursApi();
      console.log(response);

      if (response.status) {
        setArrayData(response.data.tours || []);
      } else {
        setError("No tours found.");
      }
    } catch (error) {
      console.log({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTours();
  }, []);

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const signoutClick = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  return (
    <div className="box">
      <div className="mt-5 d-flex justify-content-between align-items-center">
        <h1 style={{ color: "#202445" }}>My Tours</h1>

        <div
          className="d-flex align-items-center gap-1"
          style={{
            fontWeight: 500,
            color: "#202445",
            border: "solid #E1E1E1 1px",
            borderRadius: "12px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
          onClick={signoutClick}
        >
          Sign Out
        </div>
      </div>

      {loading ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : arrayData.length > "0" ? (
        <div className="d-flex justify-content-center gap-5 pb-5 mt-4">
          <div className="wrapCards myToursCards justify-content-center">
            {arrayData.map(
              (
                { title, description, img, price, stayTime, city, tourId },
                index
              ) => (
                <SearchDetailCards
                  key={index}
                  title={title}
                  description={description}
                  img={img}
                  price={price}
                  stayTime={stayTime}
                  city={city}
                  myTours={"myTours"}
                  tourId={tourId}
                  setIsModalOpen={setIsModalOpen}
                  isModalOpen={isModalOpen}
                />
              )
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "calc(100vh - 200px)",
          }}
        >
          <img
            src="/Search_Page_Img.svg"
            alt="Search"
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              marginBottom: "1rem",
            }}
          />
          <p className="fs-2" style={{ textAlign: "center", color: "#797C9A" }}>
            No Tours Found, Please Book One!
            <br />
          </p>
        </div>
      )}
    </div>
  );
};

export default MyTours;
