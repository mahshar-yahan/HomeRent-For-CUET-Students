import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4">
      <div className="text-center mt-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} RentSpot. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
