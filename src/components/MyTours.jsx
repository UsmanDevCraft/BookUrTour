import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SearchDetailCards from "./SearchDetailCards";
import { getBookedToursApi } from "../api/api";

const MyTours = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tourDays, setTourDays] = useState([]);
  const [tourName, setTourName] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const location = useLocation();
  const data = location.state;

  const [arrayData, setArrayData] = useState([
    // {
    //   id: 1,
    //   title: "Pérez Art Museum Miami",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, eos. Rerum doloremque laboriosam ab ratione veritatis itaque dolor.",
    //   img: "/dest_test_img_1.png",
    //   price: "$50 - $200",
    //   stayTime: "3",
    //   city: "Miami",
    // },
    // {
    //   id: 1,
    //   title: "Hard Rock Stadium",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, eos. Rerum doloremque laboriosam ab ratione veritatis itaque dolor.",
    //   img: "/dest_test_img_2.png",
    //   price: "$50 - $80",
    //   stayTime: "1",
    // },
    // {
    //   id: 1,
    //   title: "Matheson Hammock Park",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, eos. Rerum doloremque laboriosam ab ratione veritatis itaque dolor.",
    //   img: "/dest_test_img_3.png",
    //   price: "$50 - $100",
    //   stayTime: "9",
    // },
    // {
    //   id: 1,
    //   title: "The Wharf Miami",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, eos. Rerum doloremque laboriosam ab ratione veritatis itaque dolor.",
    //   img: "/dest_test_img_4.png",
    //   price: "$50 - $200",
    //   stayTime: "2",
    // },
    // {
    //   id: 1,
    //   title: "Miami Tower",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, eos. Rerum doloremque laboriosam ab ratione veritatis itaque dolor.",
    //   img: "/dest_test_img_5.png",
    //   price: "$30 - $200",
    //   stayTime: "3",
    // },
    // {
    //   id: 1,
    //   title: "Skyviews Miami",
    //   description:
    //     "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sapiente, eos. Rerum doloremque laboriosam ab ratione veritatis itaque dolor.",
    //   img: "/dest_test_img_6.png",
    //   price: "$50 - $200",
    //   stayTime: "7",
    // },
  ]);

  const fetchAllTours = async () => {
    try {
      setLoading(true);
      const response = await getBookedToursApi();
      console.log(response);

      if (response.status) {
        // setArrayData(response.data.tours || []);
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

  return (
    <div className="box">
      <h1 className="mt-5" style={{ color: "#202445" }}>
        My Tours
      </h1>

      {loading ? (
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : arrayData.length > "0" ? (
        <div className="d-flex justify-content-center gap-5 pb-5 mt-4">
          <div className="wrapCards">
            {arrayData.map(
              ({ title, description, img, price, stayTime, city }, index) => (
                <SearchDetailCards
                  key={index}
                  title={title}
                  description={description}
                  img={img}
                  price={price}
                  stayTime={stayTime}
                  city={city}
                  myTours={"myTours"}
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
