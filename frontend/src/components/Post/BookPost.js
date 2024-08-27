import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../utils/api";
import axiosInstance from "../../utils/axios";

const BookPost = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState({});

  const { postId } = useParams();

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
    });
  }, [postId]);

  const [formData, setFormData] = useState({
    seatCapacity: 0,
  });

  // console.log(formData);
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
      const response = await axiosInstance.post(`${api}/books/${postId}`, {
        ...formData,
      });
      if (response.data) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return (
    <>
      <div className="mt-40 mb-40 pt-6 px-12">
        {/* Ensure visibility by removing unnecessary container: */}
        <h1 className="text-2xl  mb-4">
          Book Your Seat in{" "}
          <span className="text-2xl font-bold mb-4 text-custom2">
            {post.title}
          </span>
        </h1>

        <div className="flex flex-cols-2 gap-1 justify-center items-center min-w-full ">
          <div className="w-[90vh] mx-auto my-5 p-4 bg-gray-100 rounded-lg">
            <h1 className="text-2xl font-bold mb-4">{post.location}</h1>
            <p className="text-xl mb-4">Contact {post.contact}</p>
            <p className="text-xl mb-4">Price :{post.price}</p>
            <p className="text-xl mb-4">Seat Remaining: {post.seatCapacity}</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="w-[90vh] ml-5 my-5 p-4 bg-gray-100 rounded-lg"
          >
            <label>
              Number of Seat:
              <input
                type="number"
                name="seatCapacity"
                value={formData.seatCapacity}
                onChange={handleInputChange}
                className="w-full border rounded-md p-2 mb-4"
              />
            </label>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Book Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookPost;
