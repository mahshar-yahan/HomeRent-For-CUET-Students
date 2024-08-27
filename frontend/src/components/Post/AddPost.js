import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import blueBackgroundImage from "../../assets/bg-img.jpg";
import { api } from "../../utils/api";
import axiosInstance from "../../utils/axios";
import Spinner from "../Spinner/Spinner";
const AddPost = () => {
  const { isLoading, isError, error, isLoggedIn, user, isRegistered } =
    useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const handleImageUpload = async (e) => {
    setLoading(true);
    const files = e.target.files;

    const data = new FormData();

    console.log(files);

    for (let i = 0; i < files.length; i++) {
      data.append("file", files[i]);
      data.append("upload_preset", "software");
      data.append("tags", "multiple_images");
      try {
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
          data
        );

        setImages((prevImages) => [
          ...prevImages,
          prevImages.push(res.data.secure_url),
        ]);
        setLoading(true);
      } catch (err) {
        console.error("Error uploading image: ", err);
      }
    }
    setLoading(false);
  };

  const [formData, setFormData] = useState({
    title: "",
    seatCapacity: 0,
    price: 0,
    photos: images,
    type: "",
    available: true,
    contact: "",
    details: "",
    location: "",
    coordinates: "",
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

    if (
      formData.title !== "" &&
      formData.seatCapacity !== 0 &&
      formData.price !== 0 &&
      formData.photos.length > 0 &&
      formData.type !== "" &&
      formData.contact !== "" &&
      formData.details !== "" &&
      formData.location !== "" &&
      formData.coordinates !== ""
    ) {
      try {
        const response = await axiosInstance.post(`${api}/posts/create/`, {
          ...formData,
        });

        console.log(response.data);

        if (response.data) {
          navigate("/");
          setFormData({
            title: "",
            seatCapacity: 0,
            price: 0,
            photos: [],
            type: "",
            contact: "",
            details: "",
            location: "",
            coordinates: "",
          });
        }
      } catch (error) {
        setMessage(error);
      }
    } else {
      setMessage("Please fill up all the input fields!");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <div
      className=" pt-28 bg-gray-200 flex flex-col  w-[100%] mt-10"
      style={{ backgroundImage: `url(${blueBackgroundImage})` }}
    >
      <h1 className="ml-3 mb-4 text-3xl font-bold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white text-center">
        Housing Information
      </h1>
      <form
        onSubmit={handleSubmit}
        className="w-[90vh] mx-auto my-5 p-4 bg-gray-50 rounded-lg"
      >
        <div className="grid grid-cols-2 gap-4">
          <div className="relative mb-0" data-te-input-wrapper-init>
            <label htmlFor="title" className="block text-lg font-semibold mb-2">
              Home Name:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full border rounded-md p-2 mb-4 text-black"
            />
          </div>

          <div className="relative mb-0" data-te-input-wrapper-init>
            <label htmlFor="price" className="block text-lg font-semibold mb-2">
              House Rent:
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Price"
              className="w-full border rounded-md p-2 mb-4 text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative mb-0" data-te-input-wrapper-init>
            <label
              htmlFor="contact"
              className="block text-lg font-semibold mb-2"
            >
              Contact:
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleInputChange}
              placeholder="Contact"
              className="w-full border rounded-md p-2 mb-4 text-black"
            />
          </div>
          <div className="relative mb-0" data-te-input-wrapper-init>
            <label
              htmlFor="location"
              className="block text-lg font-semibold mb-2"
            >
              Location:
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="Location"
              className="w-full border rounded-md p-2 mb-4 text-black"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="relative mb-0" data-te-input-wrapper-init>
            <label
              htmlFor="seatCapacity"
              className="block text-lg font-semibold mb-2"
            >
              Seat Capacity:
            </label>
            <input
              type="number"
              id="seatCapacity"
              name="seatCapacity"
              value={formData.seatCapacity}
              onChange={handleInputChange}
              placeholder="Seat Capacity"
              className="w-full border rounded-md p-2 mb-4 text-black"
            />
          </div>

          <div className="relative mb-0" data-te-input-wrapper-init>
            {/* <label htmlFor="type" className="block text-lg font-semibold mb-2">
            Type:
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            placeholder="Type"
            className="w-full border rounded-md p-2 mb-4 text-black"
          /> */}
            <label htmlFor="type" className="block text-lg font-semibold mb-4">
              Type:
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              className="w-full border rounded-md p-2 mb-4 text-black"
            >
              <option value="" disabled>
                Select Type
              </option>
              <option value="Single Room">Single Room</option>
              <option value="Apartment">Apartment</option>
            </select>
          </div>
        </div>

        <label htmlFor="details" className="block text-lg font-semibold mb-2">
          Details:
        </label>
        <textarea
          id="details"
          name="details"
          value={formData.details}
          onChange={handleInputChange}
          placeholder="Details"
          className="w-full border rounded-md p-2 mb-4 text-black"
          rows="4"
        ></textarea>

        <label
          htmlFor="coordinates"
          className="block text-lg font-semibold mb-2"
        >
          Coordinates:
        </label>
        <input
          type="text"
          id="coordinates"
          name="coordinates"
          value={formData.coordinates}
          onChange={handleInputChange}
          placeholder="Coordinates"
          className="w-full border rounded-md p-2 mb-4 text-black"
        />

        <label htmlFor="image" className="block text-lg font-semibold mb-2">
          Upload Image:
        </label>
        <input
          type="file"
          id="image"
          onChange={handleImageUpload}
          multiple
          className="mb-4"
        />

        {loading && (
          <p className="text-red-500">
            <Spinner />
          </p>
        )}
        {<p className="text-red-600 m-3">{message}</p>}
        {formData.photos.length > 0 && (
          <div className="mb-4 flex flex-row">
            {formData.photos.map((photo, index) => (
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
          disabled={loading}
          className="bg-custom1 text-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPost;
