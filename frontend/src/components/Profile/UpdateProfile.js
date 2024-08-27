import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { updateProfile } from "../../features/profile/profileSlice";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const address = user?.profile?.address;
  const phone = user?.profile?.phone;

  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const handleImageUpload = async (e) => {
    setLoading(true);
    const files = e.target.files;

    const data = new FormData();
    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
      data.append("upload_preset", "software");
      data.append("tags", "multiple_images");
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/du55ossud/image/upload`,
          data
        );

        setImages((prevImages) => [
          ...prevImages,
          prevImages.push(res.data.secure_url),
        ]);
      } catch (err) {
        console.error("Error uploading image: ", err);
      }
    }
    setLoading(false);
  };

  const [formData, setFormData] = useState({
    address: address,
    images: images,
    phone: phone,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "number" ? parseInt(value) : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateProfile(formData));
      navigate("/profile");
      // const response = await axiosInstance.put(`${api}/profile/edit`, {
      //   ...formData,
      // });
      // if (response.data) {
      //   navigate("/");
      //   setFormData({
      //     address: "",
      //     images: [],
      //     phone: "",
      //   });
      // }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <div className="w-[60%] h-screen mx-auto flex flex-row justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" w-[90vh] h-auto  mx-auto my-5 p-4 bg-gray-100 rounded-lg"
      >
        <label>
          <span style={{fontStyle: 'italic'}}>Address:</span>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            placeholder="Address"
            className="w-full border rounded-md p-2 mb-4"
          />
        </label>
        <label>
          <span style={{fontStyle: 'italic'}}>Phone:</span>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Phone"
            className="w-full border rounded-md p-2 mb-4"
          />
        </label>
        <h2><span style={{fontStyle: 'italic'}}>Upload profile photo:</span></h2>
        <input
          type="file"
          onChange={handleImageUpload}
          multiple
          className="mb-4"
        />

        {loading && <p className="text-red-500">Uploading...</p>}

        {formData.images.length > 0 && (
          <div className="mb-4 flex flex-row">
            {formData.images.map((photo, index) => (
              <img
                key={index}
                src={photo}
                alt={`Photo_no ${index}`}
                className="w-20 h-20 object-cover mr-2 mb-2"
              />
            ))}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
