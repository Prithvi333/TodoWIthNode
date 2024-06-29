import React, { useState, useEffect } from "react";

const ErrorMessage = ({ message }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (message) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div
      className={`transition-opacity duration-1000 ease-in-out ${
        show ? "opacity-100 z-20" : "opacity-0 z-0"
      } fixed top-4 right-4 bg-red-500 text-white p-4 rounded shadow-lg`}
    >
      {message}
    </div>
  );
};

export default ErrorMessage;
