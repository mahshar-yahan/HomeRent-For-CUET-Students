import { format } from "date-fns";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import avatar from "../../src/assets/avatar.jpg";
import blueBackgroundImage from "../assets/bg-img.jpg";
import UserPostsDetails from "../components/Profile/UserPostsDetails";
import { fetchUser } from "../features/auth/authSlice";
import { fetchBookedPost } from "../features/books/booksSlice";
const Profile = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, error, isLoggedIn, user, isRegistered } =
    useSelector((state) => state.auth);

  const { profile } = useSelector((state) => state.profile);
  const { books } = useSelector((state) => state.books);

  function formatTimestamp(timestamp) {
    return format(new Date(timestamp), "yyyy-MM-dd HH:mm:ss");
  }

  useEffect(() => {
    dispatch(fetchUser());
    dispatch(fetchBookedPost());
  }, []);
  let bookArrays = null;
  const name = user?.name;
  const email = user?.email;
  const role = user?.role;
  const posts = user?.posts;
  const book = user?.book;
  const phone1 = profile?.phone;

  let image = user?.profile?.images[0];

  if (!image && !image !== null) {
    image = avatar;
  }

  const address = user?.profile?.address;
  const phone = user?.profile?.phone;
  const createdAt = user?.profile?.createdAt;

  let profileCard = (
    <div class="max-w-4xl flex items-center h-auto flex-wrap mx-auto my-32 mx-20 ">
      <div id="profile" class="w-full shadow-2xl bg-white opacity-85 mx-6 ">
        <div class="p-4 text-center">
          <div
            className="block  rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>

          <h1 class="text-3xl font-bold pt-8 ">{name || "Not provided"}</h1>
          <div class="mx-auto  w-4/5 pt-3 border-b-2 border-green-500 opacity-25"></div>
          <p class="pt-4 px-12 text-base font-bold flex items-center justify-left ">
            <svg
              class="h-4 fill-current text-green-700 pr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
            </svg>{" "}
            {role || "Not provided"}
          </p>
          <p class="pt-2 px-12 text-gray-600 text-md  flex items-center justify-left ">
            <svg
              class="h-4 fill-current text-green-700 pr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
            >
              <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
            </svg>
            {address || "Not provided"}
          </p>
          <p class="pt-2 px-12 text-gray-600 text-md flex items-center justify-left ">
            <svg
              class="h-4 fill-current text-green-700 pr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
            </svg>
            {phone1 || "Not provided"}
          </p>
          <p class="pt-2 px-12 text-gray-600 text-md  flex items-center justify-left ">
            <svg
              class="h-4 fill-current text-green-700 pr-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
            {email || "Not provided"}
          </p>
          {/* <p class="pt-0 p text-sm"></p> */}

          <div class="pt-12 pb-8">
            <button class="bg-green-700 hover:bg-green-900 text-white font-bold py-2 px-4 rounded-full">
              <Link to="/profile/edit">Update Profile</Link>
            </button>
          </div>
        </div>
      </div>

      <div class="absolute top-0 right-0 h-12 w-18 p-4">
        <button class="js-change-theme focus:outline-none">🌙</button>
      </div>
    </div>
  );

  return (
    <div
      className="flex flex-row  w-[100%]   pt-1 mt-10"
      style={{
        backgroundImage: `url(${blueBackgroundImage})`,
        // Add blur effect
      }}
    >
      {profileCard}
      <div className="mockup-window border bg-base-300 mr-6 ml-28 mt-20 mb-4 px-20">
        <div className="">
          {(role === "ADMIN" || role === "SELLER") && (
            <div>
              {/* <h1 className="text-center text-black bg-blue-500 p-5">
                Your Posted Property Lists:{" "}
              </h1> */}
              <div class="chat chat-start">
                <div class="chat-image avatar">
                  <div class="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={image} />
                  </div>
                </div>
                <div class="chat-bubble">Your Property Lists</div>
              </div>

              {posts.length !== 0 ? (
                <UserPostsDetails books={posts} />
              ) : (
                <p>You haven't Post yet</p>
              )}
            </div>
          )}
          {role === "BUYER" && (
            <div>
              <div class="chat chat-start">
                <div class="chat-image avatar">
                  <div class="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src={image} />
                  </div>
                </div>
                <div class="chat-bubble">Your Booked Property Lists: </div>
              </div>

              {books.length !== 0 ? (
                ((bookArrays = books.map((book) => book.post)),
                (<UserPostsDetails books={bookArrays} />))
              ) : (
                <p>You Book No property</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
