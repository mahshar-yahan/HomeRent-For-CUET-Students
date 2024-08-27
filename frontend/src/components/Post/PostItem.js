import React from "react";

const PostItem = ({ post }) => {
  const {
    title,
    photos,
    seatCapacity,
    price,
    type,
    available,
    contact,
    details,
    location,
    coordinates,
  } = post;
  const isAvailable = seatCapacity > 0 ? "Available" : "Not Available";
  const textColorClass = seatCapacity > 1 ? "text-green-500" : seatCapacity === 0 ? "text-red-500" : "text-gray-700";
  const icon = seatCapacity > 1 ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="16" height="16" fill="green"><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16" height="16" fill="red"><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/></svg>;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-2xl">
      <img className="w-[300px] h-[200px]" src={`${photos[0]}`} alt={title} />
      <div className="flex flex-row justify-around">
        <div className="px-4 py-2">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-700 text-base">{location}</p>
        </div>
        <div className="px-4 py-2">
          <p className="text-gray-700 text-base flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="16" height="16" fill="#8B4513">
              <path d="M36 32.2C18.4 30.1 2.4 42.5 .2 60S10.5 93.6 28 95.8l7.9 1c16 2 28 15.6 28 31.8V160H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H64V384c0 53 43 96 96 96h32c106 0 192-86 192-192V256c0-53-43-96-96-96H272c-17.7 0-32 14.3-32 32s14.3 32 32 32h16c17.7 0 32 14.3 32 32v32c0 70.7-57.3 128-128 128H160c-17.7 0-32-14.3-32-32V224h32c17.7 0 32-14.3 32-32s-14.3-32-32-32H128V128.5c0-48.4-36.1-89.3-84.1-95.3l-7.9-1z"/>
            </svg> 
            <span className="ml-2">Price: {price}</span>
          </p>
          <p className="text-gray-700 text-base flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="16" height="16" fill="#8B4513">
            <path d="M32 32c17.7 0 32 14.3 32 32V320H288V160c0-17.7 14.3-32 32-32H544c53 0 96 43 96 96V448c0 17.7-14.3 32-32 32s-32-14.3-32-32V416H352 320 64v32c0 17.7-14.3 32-32 32s-32-14.3-32-32V64C0 46.3 14.3 32 32 32zm144 96a80 80 0 1 1 0 160 80 80 0 1 1 0-160z"/>
          </svg>
            <span className="ml-2">Vacant: {seatCapacity}</span>
          </p>
          <p className={`text-base ${textColorClass} text-gray-700 text-base flex items-center`}>
            {icon}
            <span className="ml-2 font-bold">{isAvailable}</span>
          </p>

        </div>
      </div>
    </div>


  );
};

export default PostItem;
