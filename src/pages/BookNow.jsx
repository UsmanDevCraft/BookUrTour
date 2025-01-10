import React, { useState, useEffect } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import {
  bookTourApi,
  getTourByIdApi,
  getTourByIdandUpdateApi,
} from "../api/api";
import Alert from "../components/Alert";
import SearchDetailCards from "../components/SearchDetailCards";

const BookNow = () => {
  const location = useLocation();
  const {
    tourId,
    Data,
    title,
    description,
    img,
    price,
    stayTime,
    city,
    departureLocation,
    returnDetails,
    myTour,
    alert,
  } = location.state || {};

  const [phoneError, setPhoneError] = useState("");

  const [isData, setData] = useState(Data);

  const formStyle = {
    width: "70%",
    color: "#999999",
  };
  const formStyleSmall = {
    width: "45%",
    color: "#999999",
  };

  const isFormComplete = () => {
    // const { name, email, phone, adults, childs } = Data
    //   ? updateValue
    //   : formDataBook;

    const { name, email, phone, adults, childs } = getDatabyId
      ? getDatabyId
      : formDataBook;

    return (
      name.trim() && email.trim() && phone.trim() && adults > 0 && childs >= 0
    );
  };

  const handleInputChange = (e, type) => {
    const value = e.target.value;
    setPhone((prev) => {
      const updatedPhone = { ...prev, [type]: value };
      const combinedPhone = `${updatedPhone.code}${updatedPhone.number}`;
      setformDataBook((prevFormData) => ({
        ...prevFormData,
        [e.target.name]: e.target.value,
        phone: combinedPhone,
      }));
      return updatedPhone;
    });
  };

  const [phone, setPhone] = useState({ code: "", number: "" });
  const [formDataBook, setformDataBook] = useState({
    name: "",
    email: "",
    phone: "",
    adults: "",
    childs: "",
    tourId,
    title,
    description,
    img: "",
    price,
    stayTime,
    city,
  });

  // Function to convert image URL to Base64
  const convertToBase64 = async (imagePath) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob); // Convert Blob to Base64
      });
    } catch (error) {
      console.error("Error converting image to Base64:", error);
      return "";
    }
  };

  // Convert img prop to Base64 and update formDataBook
  useEffect(() => {
    if (img) {
      convertToBase64(img).then((base64Image) => {
        setformDataBook((prev) => ({
          ...prev,
          img: base64Image, // Update img property with Base64 string
        }));
      });
    }
  }, [img]);

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    try {
      const response = await bookTourApi(formDataBook);
      console.log(response);
      if (response.status) {
        navigate("/mytours");
      }
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  const [getDatabyId, setGetDatabyId] = useState("");
  const getTourById = async () => {
    try {
      const response = await getTourByIdApi(tourId);
      console.log(response);
      setGetDatabyId(response.data.tours[0]);
    } catch (error) {
      console.log({ error: error.message });
    }
  };

  useEffect(() => {
    if (tourId) {
      getTourById();
    }
    console.log(tourId);
  }, [tourId]);

  useEffect(() => {
    if (getDatabyId) {
      const { name, email, phone, adults, childs } = getDatabyId;
      setUpdateValue({ name, email, phone, adults, childs });
    }
  }, [getDatabyId]);
  const [updateValue, setUpdateValue] = useState({});
  const handleUpdateValues = (e) => {
    setUpdateValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateTour = async (e) => {
    e.preventDefault();
    try {
      const response = await getTourByIdandUpdateApi(tourId, updateValue);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const navigate = useNavigate();

  const countryCodes = [
    { code: "+93", name: "Afghanistan" },
    { code: "+355", name: "Albania" },
    { code: "+213", name: "Algeria" },
    { code: "+1-684", name: "American Samoa" },
    { code: "+376", name: "Andorra" },
    { code: "+244", name: "Angola" },
    { code: "+1-264", name: "Anguilla" },
    { code: "+672", name: "Antarctica" },
    { code: "+1-268", name: "Antigua and Barbuda" },
    { code: "+54", name: "Argentina" },
    { code: "+374", name: "Armenia" },
    { code: "+297", name: "Aruba" },
    { code: "+61", name: "Australia" },
    { code: "+43", name: "Austria" },
    { code: "+994", name: "Azerbaijan" },
    { code: "+1-242", name: "Bahamas" },
    { code: "+973", name: "Bahrain" },
    { code: "+880", name: "Bangladesh" },
    { code: "+1-246", name: "Barbados" },
    { code: "+375", name: "Belarus" },
    { code: "+32", name: "Belgium" },
    { code: "+501", name: "Belize" },
    { code: "+229", name: "Benin" },
    { code: "+1-441", name: "Bermuda" },
    { code: "+975", name: "Bhutan" },
    { code: "+591", name: "Bolivia" },
    { code: "+387", name: "Bosnia and Herzegovina" },
    { code: "+267", name: "Botswana" },
    { code: "+55", name: "Brazil" },
    { code: "+246", name: "British Indian Ocean Territory" },
    { code: "+1-284", name: "British Virgin Islands" },
    { code: "+673", name: "Brunei" },
    { code: "+359", name: "Bulgaria" },
    { code: "+226", name: "Burkina Faso" },
    { code: "+257", name: "Burundi" },
    { code: "+855", name: "Cambodia" },
    { code: "+237", name: "Cameroon" },
    { code: "+1", name: "Canada" },
    { code: "+238", name: "Cape Verde" },
    { code: "+1-345", name: "Cayman Islands" },
    { code: "+236", name: "Central African Republic" },
    { code: "+235", name: "Chad" },
    { code: "+56", name: "Chile" },
    { code: "+86", name: "China" },
    { code: "+61", name: "Christmas Island" },
    { code: "+61", name: "Cocos Islands" },
    { code: "+57", name: "Colombia" },
    { code: "+269", name: "Comoros" },
    { code: "+682", name: "Cook Islands" },
    { code: "+506", name: "Costa Rica" },
    { code: "+385", name: "Croatia" },
    { code: "+53", name: "Cuba" },
    { code: "+599", name: "Curacao" },
    { code: "+357", name: "Cyprus" },
    { code: "+420", name: "Czech Republic" },
    { code: "+243", name: "Democratic Republic of the Congo" },
    { code: "+45", name: "Denmark" },
    { code: "+253", name: "Djibouti" },
    { code: "+1-767", name: "Dominica" },
    { code: "+1-809", name: "Dominican Republic" },
    { code: "+593", name: "Ecuador" },
    { code: "+20", name: "Egypt" },
    { code: "+503", name: "El Salvador" },
    { code: "+240", name: "Equatorial Guinea" },
    { code: "+291", name: "Eritrea" },
    { code: "+372", name: "Estonia" },
    { code: "+251", name: "Ethiopia" },
    { code: "+500", name: "Falkland Islands" },
    { code: "+298", name: "Faroe Islands" },
    { code: "+679", name: "Fiji" },
    { code: "+358", name: "Finland" },
    { code: "+33", name: "France" },
    { code: "+594", name: "French Guiana" },
    { code: "+689", name: "French Polynesia" },
    { code: "+241", name: "Gabon" },
    { code: "+220", name: "Gambia" },
    { code: "+995", name: "Georgia" },
    { code: "+49", name: "Germany" },
    { code: "+233", name: "Ghana" },
    { code: "+350", name: "Gibraltar" },
    { code: "+30", name: "Greece" },
    { code: "+299", name: "Greenland" },
    { code: "+1-473", name: "Grenada" },
    { code: "+590", name: "Guadeloupe" },
    { code: "+1-671", name: "Guam" },
    { code: "+502", name: "Guatemala" },
    { code: "+44-1481", name: "Guernsey" },
    { code: "+224", name: "Guinea" },
    { code: "+245", name: "Guinea-Bissau" },
    { code: "+592", name: "Guyana" },
    { code: "+509", name: "Haiti" },
    { code: "+504", name: "Honduras" },
    { code: "+852", name: "Hong Kong" },
    { code: "+36", name: "Hungary" },
    { code: "+354", name: "Iceland" },
    { code: "+91", name: "India" },
    { code: "+62", name: "Indonesia" },
    { code: "+98", name: "Iran" },
    { code: "+964", name: "Iraq" },
    { code: "+353", name: "Ireland" },
    { code: "+44-1624", name: "Isle of Man" },
    { code: "+972", name: "Israel" },
    { code: "+39", name: "Italy" },
    { code: "+1-876", name: "Jamaica" },
    { code: "+81", name: "Japan" },
    { code: "+44-1534", name: "Jersey" },
    { code: "+962", name: "Jordan" },
    { code: "+7", name: "Kazakhstan" },
    { code: "+254", name: "Kenya" },
    { code: "+686", name: "Kiribati" },
    { code: "+383", name: "Kosovo" },
    { code: "+965", name: "Kuwait" },
    { code: "+996", name: "Kyrgyzstan" },
    { code: "+856", name: "Laos" },
    { code: "+371", name: "Latvia" },
    { code: "+961", name: "Lebanon" },
    { code: "+266", name: "Lesotho" },
    { code: "+231", name: "Liberia" },
    { code: "+218", name: "Libya" },
    { code: "+423", name: "Liechtenstein" },
    { code: "+370", name: "Lithuania" },
    { code: "+352", name: "Luxembourg" },
    { code: "+853", name: "Macau" },
    { code: "+389", name: "North Macedonia" },
    { code: "+261", name: "Madagascar" },
    { code: "+265", name: "Malawi" },
    { code: "+60", name: "Malaysia" },
    { code: "+960", name: "Maldives" },
    { code: "+223", name: "Mali" },
    { code: "+356", name: "Malta" },
    { code: "+692", name: "Marshall Islands" },
    { code: "+596", name: "Martinique" },
    { code: "+222", name: "Mauritania" },
    { code: "+230", name: "Mauritius" },
    { code: "+262", name: "Mayotte" },
    { code: "+52", name: "Mexico" },
    { code: "+691", name: "Micronesia" },
    { code: "+373", name: "Moldova" },
    { code: "+377", name: "Monaco" },
    { code: "+976", name: "Mongolia" },
    { code: "+382", name: "Montenegro" },
    { code: "+1-664", name: "Montserrat" },
    { code: "+212", name: "Morocco" },
    { code: "+258", name: "Mozambique" },
    { code: "+95", name: "Myanmar" },
    { code: "+264", name: "Namibia" },
    { code: "+674", name: "Nauru" },
    { code: "+977", name: "Nepal" },
    { code: "+31", name: "Netherlands" },
    { code: "+687", name: "New Caledonia" },
    { code: "+64", name: "New Zealand" },
    { code: "+505", name: "Nicaragua" },
    { code: "+227", name: "Niger" },
    { code: "+234", name: "Nigeria" },
    { code: "+683", name: "Niue" },
    { code: "+672", name: "Norfolk Island" },
    { code: "+850", name: "North Korea" },
    { code: "+47", name: "Norway" },
    { code: "+968", name: "Oman" },
    { code: "+92", name: "Pakistan" },
    { code: "+680", name: "Palau" },
    { code: "+970", name: "Palestine" },
    { code: "+507", name: "Panama" },
    { code: "+675", name: "Papua New Guinea" },
    { code: "+595", name: "Paraguay" },
    { code: "+51", name: "Peru" },
    { code: "+63", name: "Philippines" },
    { code: "+48", name: "Poland" },
    { code: "+351", name: "Portugal" },
    { code: "+1-787", name: "Puerto Rico" },
    { code: "+974", name: "Qatar" },
    { code: "+242", name: "Republic of the Congo" },
    { code: "+40", name: "Romania" },
    { code: "+7", name: "Russia" },
    { code: "+250", name: "Rwanda" },
    { code: "+590", name: "Saint Barthelemy" },
    { code: "+290", name: "Saint Helena" },
    { code: "+1-869", name: "Saint Kitts and Nevis" },
    { code: "+1-758", name: "Saint Lucia" },
    { code: "+590", name: "Saint Martin" },
    { code: "+508", name: "Saint Pierre and Miquelon" },
    { code: "+1-784", name: "Saint Vincent and the Grenadines" },
    { code: "+685", name: "Samoa" },
    { code: "+378", name: "San Marino" },
    { code: "+239", name: "Sao Tome and Principe" },
    { code: "+966", name: "Saudi Arabia" },
    { code: "+221", name: "Senegal" },
    { code: "+381", name: "Serbia" },
    { code: "+248", name: "Seychelles" },
    { code: "+232", name: "Sierra Leone" },
    { code: "+65", name: "Singapore" },
    { code: "+421", name: "Slovakia" },
    { code: "+386", name: "Slovenia" },
    { code: "+677", name: "Solomon Islands" },
    { code: "+252", name: "Somalia" },
    { code: "+27", name: "South Africa" },
    { code: "+82", name: "South Korea" },
    { code: "+211", name: "South Sudan" },
    { code: "+34", name: "Spain" },
    { code: "+94", name: "Sri Lanka" },
    { code: "+249", name: "Sudan" },
    { code: "+597", name: "Suriname" },
    { code: "+46", name: "Sweden" },
    { code: "+41", name: "Switzerland" },
    { code: "+963", name: "Syria" },
    { code: "+886", name: "Taiwan" },
    { code: "+992", name: "Tajikistan" },
    { code: "+255", name: "Tanzania" },
    { code: "+66", name: "Thailand" },
    { code: "+670", name: "Timor-Leste" },
    { code: "+228", name: "Togo" },
    { code: "+690", name: "Tokelau" },
    { code: "+676", name: "Tonga" },
    { code: "+1-868", name: "Trinidad and Tobago" },
    { code: "+216", name: "Tunisia" },
    { code: "+90", name: "Turkey" },
    { code: "+993", name: "Turkmenistan" },
    { code: "+1-649", name: "Turks and Caicos Islands" },
    { code: "+688", name: "Tuvalu" },
    { code: "+256", name: "Uganda" },
    { code: "+380", name: "Ukraine" },
    { code: "+971", name: "United Arab Emirates" },
    { code: "+44", name: "United Kingdom" },
    { code: "+1", name: "United States" },
    { code: "+598", name: "Uruguay" },
    { code: "+998", name: "Uzbekistan" },
    { code: "+678", name: "Vanuatu" },
    { code: "+58", name: "Venezuela" },
    { code: "+84", name: "Vietnam" },
    { code: "+681", name: "Wallis and Futuna" },
    { code: "+212", name: "Western Sahara" },
    { code: "+967", name: "Yemen" },
    { code: "+260", name: "Zambia" },
    { code: "+263", name: "Zimbabwe" },
  ];

  return (
    <div className="box mainBooknow">
      <div className="d-flex justify-content-between mt-5 paretBookTour">
        <div
          className="d-flex justify-content-center leftDivBooknow"
          style={{ width: "60%" }}
        >
          <div>
            <h1 style={{ color: "#202445", marginBottom: "2rem" }}>
              {isData ? "Update" : "Confirm"} Your Booking
            </h1>

            <div style={{ width: "30em" }}>
              {alert && <Alert message="Login was Successful" />}
            </div>

            <div>
              <form
                onSubmit={getDatabyId ? handleUpdateTour : handleSubmitBooking}
              >
                <div className="mb-4" style={formStyle}>
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={getDatabyId ? updateValue.name : formDataBook.name}
                    onChange={
                      getDatabyId ? handleUpdateValues : handleInputChange
                    }
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="mb-4" style={formStyle}>
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={getDatabyId ? updateValue.email : formDataBook.email}
                    onChange={
                      getDatabyId ? handleUpdateValues : handleInputChange
                    }
                    aria-describedby="emailHelp"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="exampleInputPhone"
                    className="form-label"
                    style={{ color: "#999999" }}
                  >
                    Phone
                  </label>

                  <div
                    style={{
                      ...formStyle,
                      border: phoneError ? "1px solid red" : "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      {/* Dropdown for Country Code */}
                      <select
                        id="countryCode"
                        onChange={(e) => handleInputChange(e, "code")}
                        disabled={getDatabyId ? true : false}
                        style={{
                          border: "none",
                          padding: "5px",
                          borderRadius: "5px",
                          width: "20%",
                          color: "#202445",
                        }}
                      >
                        {countryCodes.map(({ code, name }) => (
                          <option key={countryCodes.code} value={code}>
                            {code} ({name})
                          </option>
                        ))}
                      </select>

                      {/* Vertical Line Separator */}
                      <div
                        style={{
                          width: "1px",
                          backgroundColor: "#ccc",
                          height: "30px",
                        }}
                      ></div>

                      {/* Input for Phone Number */}
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={
                          getDatabyId ? updateValue.phone : formDataBook.phone
                        }
                        disabled={getDatabyId ? true : false}
                        onChange={(e) => handleInputChange(e, "number")}
                        aria-describedby="phoneHelp"
                        style={{
                          border: "none",
                          borderRadius: "5px",
                          width: "100%",
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="d-flex justify-content-between"
                  style={{ width: "70%" }}
                >
                  <div className="mb-4" style={formStyleSmall}>
                    <label htmlFor="numberOfAdults" className="form-label">
                      Number of Adults
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="adults"
                      value={
                        getDatabyId ? updateValue.adults : formDataBook.adults
                      }
                      onChange={
                        getDatabyId ? handleUpdateValues : handleInputChange
                      }
                      min="0"
                      defaultValue="0"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                  <div className="mb-4" style={formStyleSmall}>
                    <label htmlFor="numberOfChildren" className="form-label">
                      Number of Children
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="childs"
                      value={
                        getDatabyId ? updateValue.childs : formDataBook.childs
                      }
                      onChange={
                        getDatabyId ? handleUpdateValues : handleInputChange
                      }
                      min="0"
                      defaultValue="0"
                      style={{
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                      }}
                    />
                  </div>
                </div>
                <div className="mb-4" style={formStyle}>
                  <label htmlFor="paymentMethod" className="form-label">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="paymentmethod"
                    value={getDatabyId ? updateValue.payment : formDataBook.payment}
                    onChange={
                      getDatabyId ? handleUpdateValues : handleInputChange
                    }
                    aria-describedby="paymentHelp"
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "5px",
                    }}
                  />
                </div>
                <div style={{ width: "70%" }}>
                  <div className="mt-5 d-flex justify-content-center">
                    <button
                      type="submit"
                      className="bookConBtn"
                      style={{
                        backgroundColor: isFormComplete() ? "#f16b51" : "#ccc",
                        padding: "0.7rem 10em",
                        color: isFormComplete() ? "#ffffff" : "#666",
                        borderRadius: "12px",
                        border: "none",
                        fontWeight: 600,
                        cursor: isFormComplete() ? "pointer" : "not-allowed",
                      }}
                      disabled={getDatabyId ? false : !isFormComplete()}
                    >
                      {isData ? "Update" : "Confirm"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="rightDivBooknow" style={{ width: "50%" }}>
          <SearchDetailCards
            tourId={tourId}
            title={getDatabyId?.title || title}
            description={getDatabyId?.description || description}
            img={getDatabyId?.img || img}
            price={getDatabyId?.price || price}
            stayTime={getDatabyId?.stayTime || stayTime}
            city={getDatabyId?.city || city}
            departureLocation={departureLocation}
            Booknow="booknow"
          />
        </div>
      </div>

      {/* Add this CSS to style focus effect */}
      <style jsx>{`
        .form-control:focus {
          border: 1px solid #202445 !important; /* Black border on focus */
          outline: none; /* Remove default outline */
        }
      `}</style>
    </div>
  );
};

export default BookNow;
