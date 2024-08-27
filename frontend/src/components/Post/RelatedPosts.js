import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PostItem from "./PostItem";

const RelatedPosts = () => {
  const { isLoading, isError, error, relatedPosts } = useSelector(
    (state) => state.posts
  );

  return (
    <div className="mx-auto bg-base-300">
        {/* <div className="bg-slate-400 font-bold  font-serif  text-center p-3 ">
          See more
        </div> */}
      {!isLoading && !isError && (
        <div className="flex md:justify-start md:items-start justify-center items-center flex-wrap">
          {relatedPosts.map((post) => (
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
    </div>
  );
};

export default RelatedPosts;
