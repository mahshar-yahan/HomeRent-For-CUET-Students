import React from "react";

const Sidebar = () => {
  return (
    <aside className="bg-gray-200 p-4 w-[15%] ">
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2 mt-3">Filters</h2>
        {/* Render filtering options */}
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-black ml-5">Male</span>
            <input
              type="radio"
              name="radio-10"
              className="radio border-red-900 checked:bg-black mr-10"
              checked
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-black ml-5">Female</span>
            <input
              type="radio"
              name="radio-10"
              className="radio border-red-900 checked:bg-black mr-10"
              checked
            />
          </label>
        </div>
        {/* <ul>
          <li className="text-center text-gray-700 p-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="radio-2"
                className="radio radio-primary"
                checked
              />
              <span className="ml-2">Male</span>
            </label>
          </li>
          <li className="text-center text-gray-700 p-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="radio-2"
                className="radio radio-primary"
              />
              <span className="ml-2">Female</span>
            </label>
          </li>
          <li className="text-center text-gray-700  p-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="radio-2"
                className="radio radio-primary"
              />
              <span className="ml-2">Home</span>
            </label>
          </li>
        </ul> */}
      </div>
    </aside>
  );
};

export default Sidebar;
