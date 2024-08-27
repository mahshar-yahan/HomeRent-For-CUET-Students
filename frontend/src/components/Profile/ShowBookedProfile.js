import React from "react";

const ShowBookedProfile = ({ profiles, count }) => {
  const { name, email } = profiles;

  return (
    <div>
      <ul className="list-group">
        <li className="list-group-item bg-white text-black">
          <div className="card">
            <div className="card-body">
              {count}. || Name: {name} || Email: {email}
            </div>
          </div>
        </li>
        <li className="list-group-item bg-green-500 text-white"></li>
      </ul>
    </div>
  );
};

export default ShowBookedProfile;
