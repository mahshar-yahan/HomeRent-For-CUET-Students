import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login.svg";
import { fetchLoggedInUser } from "../../features/auth/authSlice";
import { fetchPosts } from "../../features/posts/postsSlice";

import blueBackgroundImage from "../../assets/bg-img.jpg";
const Login = () => {
  const { isLoading, isError, error, isLoggedIn, isRegistered } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchLoggedInUser(formData));

    dispatch(fetchPosts());

    setMessage(error);
    console.log(error);
    if (error !== null) {
      navigate("/");
    }
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  if (!isLoading && !isError && isLoggedIn) {
    localStorage.setItem(
      "auth",
      JSON.stringify({
        email: formData.email,
        password: formData.password,
      })
    );
  }
  return (
    <div
      className="flex flex-col justify-center items-center  opacity-100 mt-20 "
      style={{ backgroundImage: `url(${blueBackgroundImage})` }}
    >
      <div className="flex m-12 p-12 flex-row w-[70%] justify-center  opacity-100  items-center h-[50%] bg-slate-50 border ">
        <div className="flex flex-col  justify-center items-center  w-[80vh] h-[90%]">
          <img
            src={loginImage}
            alt="login_image"
            className="w-[80vh] h-[70vh] mr-10"
          />
        </div>
        <div>Adding authentcation</div>
        <div className="flex justify-center items-center w-[80vh] h-[90%]">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[70vh] h-[90%]"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black focus:outline-none focus:shadow-outline"
                name="email"
                type="text"
                required
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-black  focus:outline-none focus:shadow-outline"
                name="password"
                type="password"
                required
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isLoading && "opacity-50 cursor-not-allowed"
                }`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Logging In..." : "Login"}
              </button>
            </div>
            {!isLoading && isError && !isLoggedIn && (
              <p className="text-red-500 text-sm mt-2">{message}</p>
            )}

            <div className="mt-4 text-center">
              <h3>
                Don't have an account? Create a new account!
                <strong className="m-1 text-indigo-700">
                  <Link to="/register">Register</Link>
                </strong>
              </h3>
              <h3>
                Forgot Password
                <strong className="m-1 text-indigo-700">
                  <Link to="/register">Register</Link>
                </strong>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
