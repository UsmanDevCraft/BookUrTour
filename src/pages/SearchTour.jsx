import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchDetailCards from "../components/SearchDetailCards";
import hotels from "../json/hotels.json";

const SearchTour = () => {
  const location = useLocation();
  const { destination, price, date, endDate, category, userId } =
    location.state || {};
  const [isData, setIsData] = useState(true);

  const [arrayData, setArrayData] = useState(() => {
    const foundCity = hotels.filter((hotel) => hotel.city === destination);
    return foundCity;
  });

  return (
    <div className="box">
      <div className="d-flex justify-content-between mt-5 mb-5">
        <h1 style={{ color: "#202445" }}>
          Top Destinations at <span>{destination}</span>
        </h1>
      </div>
      {arrayData && arrayData.length > 0 ? (
        // {isData ? (
        <div className="d-flex justify-content-center flex-wrap gap-4 pb-5">
          <div className="wrapCards">
            {arrayData.map(
              (
                {
                  id,
                  title,
                  description,
                  img,
                  price,
                  stayTime,
                  city,
                  departure_location,
                  return_details,
                },
                index
              ) => (
                <SearchDetailCards
                  key={index}
                  tourId={id}
                  title={title}
                  description={description}
                  img={img}
                  price={price}
                  stayTime={stayTime}
                  city={city}
                  departureLocation={departure_location}
                  returnDetails={return_details}
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
            Sorry, We didn’t find any tour for <i>{destination}</i> right now{" "}
            <br />
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchTour;
