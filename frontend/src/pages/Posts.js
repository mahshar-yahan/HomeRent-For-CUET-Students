import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostItem from "../components/Post/PostItem";
import Spinner from "../components/Spinner/Spinner";

const Posts = () => {
  const { posts, isLoading, isError, error } = useSelector(
    (state) => state.posts
  );

  return (
    <>
      {!isLoading && !isError && (
        <div className="flex flex-row md:justify-start md:items-start justify-center items-center flex-wrap mt-24">
          {posts.map((post) => (
            <Link
              to={`/posts/${post.id}`}
              className="m-4 border-black rounded p-4"
              key={post.id}
              style={{ background: "white" }}
            >
              <>
                <PostItem post={post} />
              </>
            </Link>
          ))}
        </div>
      )}
      {
        <div className="text-center mx-auto flex justify-center items-center">
          {isLoading && <Spinner />}
          {!isLoading && isError && error && (
            <h1
              className="border-black rounded p-4"
              style={{ background: "white" }}
            >
              {error}
            </h1>
          )}
        </div>
      }
    </>
  );
};

export default Posts;
