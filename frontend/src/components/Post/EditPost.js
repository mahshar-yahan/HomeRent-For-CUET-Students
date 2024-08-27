import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import axiosInstance from "../../utils/axios";

const EditPost = () => {
  const [post, setPost] = useState({});
  const { postId } = useParams();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    seatCapacity: 0,
    price: 0,
    // photos: images,
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
      formData.type !== "" &&
      formData.contact !== "" &&
      formData.details !== "" &&
      formData.location !== "" &&
      formData.coordinates !== ""
    ) {
      try {
        const response = await axiosInstance.put(
          `${api}/posts/${postId}`,
          formData
        );

        if (response.data) {
          navigate(-1);
        }
      } catch (error) {
        setMessage(error);
      }
    } else {
      setMessage("Please fill up all the input fields!");
      setTimeout(() => {
        setMessage("");
      }, 2000);
    }
  };

  async function fetchPosts(postId) {
    try {
      const response = await axiosInstance.get(`${api}/posts/${postId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  }

  useEffect(() => {
    fetchPosts(postId).then((data) => {
      setPost(data);

      setFormData({
        title: data.title,
        seatCapacity: data.seatCapacity,
        price: data.price,
        // photos: images,
        type: data.type,
        available: data.available,
        contact: data.contact,
        details: data.details,
        location: data.location,
        coordinates: data.coordinates,
      });
    });
  }, [postId]);

  return (
    <div className="pt-40">
      <div>edit</div>
      <div className=" pt-28 bg-gray-200">
        <h1 className="ml-3 mb-4 text-3xl font-bold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white text-center">
          Housing Information
        </h1>
        <form
          onSubmit={handleSubmit}
          className="w-[90vh] mx-auto my-5 p-4 bg-gray-50 rounded-lg"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="relative mb-0" data-te-input-wrapper-init>
              <label
                htmlFor="title"
                className="block text-lg font-semibold mb-2"
              >
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
              <label
                htmlFor="price"
                className="block text-lg font-semibold mb-2"
              >
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
                value={formData.location.toLowerCase().trim()}
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
              <label
                htmlFor="type"
                className="block text-lg font-semibold mb-4"
              >
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

          {/* <label htmlFor="image" className="block text-lg font-semibold mb-2">
            Upload Image:
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            multiple
            className="mb-4"
          />

          {loading && <p className="text-red-500">Uploading...</p>}
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
          )} */}

          <button
            type="submit"
            disabled={loading}
            className="bg-custom1 text-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
