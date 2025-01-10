import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import ExploreMore from "./pages/ExploreMore";
import SearchTour from "./pages/SearchTour";
import DetailsTour from "./pages/DetailsTour";
import BookNow from "./pages/BookNow";
import Tours from "./pages/Tours";
import MyTours from "./pages/MyTours";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Signup from "./components/Signup";

const AppLayout = () => {
  const location = useLocation();

  const containerStyles = {
    width: "100%",
    height: "60vh",
    backgroundImage: "url(/ExploreMoreBGIMG.png)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    color: "#fff",
    fontSize: "2rem",
    position: "relative",
  };

  const navbarOverlayStyles = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    background: "transparent",
    zIndex: 10,
  };

  return (
    <>
      {location.pathname === "/exploremore" ? (
        <div style={containerStyles}>
          <div style={navbarOverlayStyles}>
            <Navbar />
          </div>
        </div>
      ) : (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/exploremore" element={<ExploreMore />} />
        <Route path="/searchtour" element={<SearchTour />} />
        <Route path="/details" element={<DetailsTour />} />
        <Route path="/booknow" element={<BookNow />} />
        <Route path="/tours" element={<Tours />} />
        <Route path="/mytours" element={<MyTours />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
