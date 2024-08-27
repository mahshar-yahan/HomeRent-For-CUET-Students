import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import blueBackgroundImage from "../assets/bg-img.jpg";
import { fetchPosts } from "../features/posts/postsSlice";
import Posts from "./Posts";

<<<<<<< HEAD
// import blueBackgroundImage from "../assets/bg-img.jpg";

=======
>>>>>>> f4d07030505a7dc69d2636041f34f44d146a534f
const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  });
  return (
    <div
      className="flex flex-row  w-[100%]   pt-1 mt-10"
      style={{
        backgroundImage: `url(${blueBackgroundImage})`,
        // Add blur effect
      }}
    >
      <div>
        <Posts />
      </div>
    </div>
  );
};

export default Home;
