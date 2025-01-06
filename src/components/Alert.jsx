import React, { useState, useEffect } from "react";

const Alert = ({ message }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="alert alert-info" role="alert">
      {message}
    </div>
  );
};

export default Alert;
