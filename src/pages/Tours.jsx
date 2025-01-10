import React, { useEffect, useState } from "react";
import SearchDetailCards from "../components/SearchDetailCards";
import { GiHamburgerMenu } from "react-icons/gi";
import hotels from "../json/hotels.json";

const Tours = () => {
  const [arrayData, setArrayData] = useState(hotels);

  return (
    <div className="box">
      <div
        className="d-flex"
        style={{
          justifyContent: "flex-end", // Aligns child elements to the right
        }}
      >
        <div
          className="d-flex align-items-center gap-1"
          style={{
            fontWeight: 500,
            color: "#202445",
            border: "solid #E1E1E1 1px",
            borderRadius: "12px",
            padding: "10px 20px",
          }}
        >
          <GiHamburgerMenu />
          Filters
        </div>
      </div>

      {arrayData && arrayData.length > "0" ? (
        <div className="d-flex justify-content-center gap-5 pb-5 mt-5">
          <div className="wrapCards">
            {arrayData.map((tour, index) => (
              // ( index)
              <SearchDetailCards
                key={index}
                title={tour.title}
                tourId={tour.id}
                description={tour.description}
                img={tour.img}
                price={tour.price}
                stayTime={tour.stayTime}
                city={tour.city}
              />
            ))}
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
            Sorry, We didn’t find any tour right now <br />
          </p>
        </div>
      )}
    </div>
  );
};

export default Tours;
