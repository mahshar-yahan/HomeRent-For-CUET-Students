import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import blueBackgroundImage from "../../assets/bg-img.jpg";
import { fetchAllUsers, fetchUser } from "../../features/auth/authSlice";
import { related } from "../../features/posts/postsSlice";
import { api } from "../../utils/api";
import axiosInstance from "../../utils/axios";
import GoogleMap from "./GoogleMap";
import RelatedPosts from "./RelatedPosts";

async function fetchPosts(postId) {
  try {
    const response = await axiosInstance.get(`${api}/posts/${postId}`);
    // console.log(response);
    return response.data;
  } catch (error) {
    console.error(error);
    return {};
  }
}

const PostDescription = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    error,
    isLoggedIn,
    user,
    posts,
    isRegistered,
    fetchAllUser,
    allUser,
  } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const [post, setPost] = useState({});
 
  const [message, setMessage] = useState("");
  const { postId } = useParams();

  let map = null;
  let latitude, longitude;
  const coordinate = post?.coordinates;
  const seatCapacity = post?.seatCapacity;
  if (coordinate) {
    [latitude, longitude] = coordinate.split(",");
    map = <GoogleMap latitude={latitude} longitude={longitude} />;
  }

  const role = user?.role;

 

  const handleBooked = () => {
    if (isLoggedIn) {
      navigate(`/books/${postId}`);
    } else {
      setMessage("You are not logged in!, Please login to your account first!");
      navigate(`/login`);
    }
  };

  useEffect(() => {
    fetchPosts(postId).then((data) => {
      setPost(data);
    });
    dispatch(related(postId));

    dispatch(fetchUser());
    dispatch(fetchAllUsers());
  }, [postId, dispatch]);

  const bookeditems = post.book;

  let bookedId = bookeditems?.map((item) => item.userId);
  let usersInBookedId =
    allUser && bookedId
      ? allUser.filter((user) => bookedId.includes(user.id))
      : [];

  return (
    <div
      className="flex flex-col  w-[100%]   pt-1 mt-24"
      style={{
        backgroundImage: `url(${blueBackgroundImage})`,
      }}
    >
      {/* main */}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mx-20 ">
        {/* image  */}
        <div class="bg-white pb-6 m-2 mockup-window border bg-base-300">
          <div className="pl-6 pb-2">
            <h3 className="chat-bubble mb-4 text-left">Photos</h3>
            <div className="flex justify-center">
              {post.photos && post.photos.length > 0 && (
                <div className="carousel w-full md:w-[80%]">
                  {post.photos.map((photo, index) => (
                    <div
                      key={index}
                      className={`carousel-item relative w-full overflow-hidden ${
                        index === 0 ? "active" : ""
                      }`}
                      id={`slide${index}`}
                    >
                      <img
                        src={photo}
                        alt={`PhotoNo ${index + 1}`}
                        className="w-full"
                      />
                      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                        <a
                          href={`#slide${index - 1}`}
                          className="btn btn-circle"
                        >
                          ❮
                        </a>
                        <a
                          href={`#slide${index + 1}`}
                          className="btn btn-circle"
                        >
                          ❯
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* address  */}
        <div class="bg-white m-2 pt-6 mockup-window border bg-base-300">
  <div className="px-6">
    <div class="chat-bubble mb-2 text-xl font-semibold">{post.title}</div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <p className="text-lg">
          <strong>Seat Capacity:</strong> {post.seatCapacity}
        </p>
        <p className="text-lg">
          <strong>Type:</strong> {post.type}
        </p>
        <p className="text-lg">
          <strong>Available:</strong> {post.available ? "Yes" : "No"}
        </p>
      </div>
      <div>
        <p className="text-lg">
          <strong>Contact:</strong> {post.contact}
        </p>
        <p className="text-lg">
          <strong>Details:</strong> {post.details}
        </p>
        <p className="text-lg">
          <strong>Location:</strong> {post.location}
        </p>
      </div>

      <div className="flex flex-col mt-4">
        <div className="button-container">
          {post.seatCapacity === 0 ? (
            <button
              className="py-3 bg-red-500 text-white rounded-md cursor-not-allowed w-full"
              type="button"
              disabled
            >
              Not Available
            </button>
          ) : (
            <button
              onClick={handleBooked}
              className="py-3 bg-custom1 text-white rounded-md hover:bg-custom2 cursor-pointer w-full"
              type="button"
            >
              Book Now
            </button>
          )}
        </div>

        {(role === "ADMIN" || role === "SELLER") && post.userId === user.id && (
          <div className="py-3">
            <div className="button-container">
              <button
                className="py-3 mb-3 bg-blue-800 rounded-md hover:bg-blue-600 cursor-pointer w-full"
                type="button"
              >
                <Link to={`/posts/${postId}/edit`} className="text-white">
                  Edit
                </Link>
              </button>
            </div>

            <div className="button-container">
              <button
                className="py-3 bg-red-800 rounded-md hover:bg-red-600 cursor-pointer w-full"
                type="button"
              >
                <Link to={`/posts/${postId}/delete`} className="text-white">
                  Delete
                </Link>
              </button>
            </div>
          </div>
        )}
      </div>
      {<p className="font-bold text-red-600">{message}</p>}
    </div>
  </div>
</div>





        {/* map  */}
        <div class="col-span-2 m-2 pt-5 mockup-window border bg-base-300">
          <div className="text-center py-2 px-4 rounded-t-md"style={{ backgroundColor: 'rgb(168, 162, 158)' }}>
            <h3 className="text-white font-semibold">Show Map</h3>
          </div>
          <div className="px-6 h-[440px] py-2">{map}</div>
        </div>
      </div>
      <div>
        {post.userId === user.id && (
          <div class="col-span-2 ml-20 mr-20 m-2 pt-5 mockup-window border bg-base-300">
            <div
              className="text-center py-2 px-4 rounded-t-md"
              style={{ backgroundColor: "rgb(168, 162, 158)" }}
            >
              <h3 className="text-white font-bold font-serif ml-4 mr-4">
                Booked Profiles
              </h3>
            </div>
            <div className="px-6 py-2 ml-4 mr-4">
              <div className="text-center">
                {usersInBookedId.length !== 0 ? (
                  usersInBookedId.map((profile, index) => (
                    <div className="border-b border-gray-300 py-3" key={index}>
                      <p className="text-lg font-semibold mb-1">{`${
                        index + 1
                      }. ${profile.name}`}</p>
                      <p className="text-gray-600">{profile.email}</p>
                    </div>
                  ))
                ) : (
                  <p>No booked student</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="col-span-2 m-2 ml-20 mr-20 pt-5 mockup-window border bg-base-300">
        <div
          className="text-center py-2 px-4 rounded-t-md"
          style={{ backgroundColor: "rgb(168, 162, 158)" }}
        >
          <h3 className="text-white font-semibold">Related Posts</h3>
        </div>
        <div className="px-6 py-2">
          {/* Replace the following line with the content of your RelatedPosts component */}
          <RelatedPosts/>
        </div>
      </div>
    </div>
  );
};

export default PostDescription;
