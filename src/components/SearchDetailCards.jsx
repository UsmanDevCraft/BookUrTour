import React, { useState, useEffect } from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import { LuClock4 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi2";

const SearchDetailCards = ({
  tourId,
  title,
  description,
  img,
  price,
  stayTime,
  city,
  departureLocation,
  returnDetails,
  bookingId,
  name,
  email,
  phone_number,
  adults,
  children,
  payment_method,
  refreshData,
  myTours,
  setIsModalOpen,
  isModalOpen,
  Booknow,
}) => {
  const iconStyle = {
    padding: "5px",
    backgroundColor: "#F4F4F4",
    borderRadius: "50%",
    color: "#75778B",
    fontSize: "1.7rem",
    display: "inline-block",
    lineHeight: "1.5",
  };

  const cancelBtnStyle = {
    color: "#999999",
    border: "1px solid #999999",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "10px 20px",
    fontWeight: 600,
  };

  const deleteBtnStyle = {
    color: "#FFFFFF",
    backgroundColor: "#F83030",
    border: "none",
    borderRadius: "12px",
    padding: "10px 20px",
    fontWeight: 600,
  };

  const navigate = useNavigate();

  const viewDetailScreen = () => {
    navigate("/details", {
      state: {
        tourId,
        title,
        price,
        description,
        img,
        stayTime,
        city,
        departureLocation,
        returnDetails,
      },
    });
  };

  const mytourDetailScreen = () => {
    navigate("/details", {
      state: {
        tourId,
        title,
        price,
        description,
        img,
        stayTime,
        city,
        departureLocation,
        returnDetails,
        myTour: true,
      },
    });
  };

  const confirmDelete = () => {
    setIsModalOpen(true);
    console.log({ title, stayTime });
  };

  const mytourUpdateScreen = () => {
    console.log(" Here mybooking Id in SearchDetails card ", bookingId);
    navigate("/booknow", {
      state: {
        Data: "myTourUpdate",
        tourId: tourId,
        bookingId: bookingId,
        name: name,
        email: email,
        phone_number: phone_number,
        adults: adults,
        children: children,
        payment_method: payment_method,
      },
    });
  };

  return (
    <div className="card cardForSearch">
      <img src={img} className="card-img-top" alt="..." />

      {isModalOpen && (
        <>
          <div
            className="modal fade show"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            // aria-hidden="true"
            style={{
              display: "block",
              backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="modal-dialog modal-dialog-centered">
              {" "}
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5"
                    id="staticBackdropLabel"
                    style={{ fontWeight: "600", color: "#F83030" }}
                  >
                    Delete Tour
                  </h1>
                </div>
                <div className="modal-footer">
                  {stayTime <= "3" ? (
                    <>
                      <div className="modal-body" style={{ color: "#404040" }}>
                        You can’t delete <b>“{`${title}`}”</b> because there are
                        only <b>{`${stayTime}`} days remaining</b> untill
                        beginning of this tour.
                      </div>
                      <div>
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => setIsModalOpen(false)}
                          style={cancelBtnStyle}
                        >
                          Cancel
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="modal-body" style={{ color: "#404040" }}>
                        Are you sure to delete <b>“{`${title}`}”</b> ?
                      </div>
                      <div className="d-flex gap-4">
                        <button
                          type="button"
                          className="btn-secondary"
                          onClick={() => setIsModalOpen(false)}
                          style={cancelBtnStyle}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          className="btn-danger"
                          // onClick={handleDelete}
                          style={deleteBtnStyle}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>

        {/* Default state showing 'hello' */}
        <div className="default-text d-flex justify-content-evenly">
          <p
            className="d-flex align-items-center gap-2"
            style={{ color: "#797C9A" }}
          >
            <BsCurrencyDollar style={iconStyle} />
            {price}
          </p>
          <p
            className="d-flex align-items-center gap-2"
            style={{ color: "#797C9A" }}
          >
            <LuClock4 style={iconStyle} />
            {stayTime} Days
          </p>
        </div>

        {/* Hover state showing 'View Details' button */}
        <div className="view-details-container">
          {myTours ? (
            <div className="d-flex justify-content-center align-items-center gap-3">
              <HiOutlineTrash
                className="fs-2"
                style={{ color: "#F83030" }}
                onClick={confirmDelete}
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              />
              <button
                className="btnmyTour"
                type="button"
                onClick={mytourDetailScreen}
              >
                Details
              </button>
              <button
                className="btnmyTour"
                type="button"
                onClick={mytourUpdateScreen}
              >
                Update
              </button>
            </div>
          ) : Booknow ? (
            <div>
              <button className="btn" type="button">
                Best Wishes
              </button>
            </div>
          ) : (
            <button className="btn" type="button" onClick={viewDetailScreen}>
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchDetailCards;
