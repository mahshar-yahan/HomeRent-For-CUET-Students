import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostItem from "../Post/PostItem";

const SearchPosts = () => {
  const dispatch = useDispatch();

  const { isLoading, isError, error, searchedPosts } = useSelector(
    (state) => state.posts
  );

  return (
    <>
      {!isLoading && !isError && (
        <div className="flex md:justify-start md:items-start justify-center items-center flex-wrap">
          {searchedPosts.map((post) => (
            <Link to={`/posts/${post.id}`} className="m-4" key={post.id}>
              <PostItem post={post} />
            </Link>
          ))}
        </div>
      )}
      {
        <div className="text-center mx-auto flex justify-center items-center">
          {isLoading && <h1>Loading....</h1>}
          {!isLoading && isError && error && <h1>{error}</h1>}
        </div>
      }
    </>
  );
};

export default SearchPosts;
