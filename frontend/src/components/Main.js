import React , {useEffect}from "react";
import { useNavigate } from "react-router-dom";
import Caraosel from "./Carousel/carasol";
import { useDispatch ,useSelector} from "react-redux";
import { fetchPosts } from "../features/posts/postsSlice";
const Main = () => {

  
  const navigate = useNavigate();
  // const { posts, isLoading, isError, error } = useSelector(
  //   (state) => state.posts
  // );
  // const vacants = posts.filter((post)=> post.seatCapacity>0);
  // console.log(vacants);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  });

  const goHome = () => {
    navigate("/home");
  };

  let slides = [
    "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcTwGTmgN4WclFT5_MqG2LWj9nSsaabJ_hdFIxxBFf_SPblOvYwmOQdGu6cSOEmULMLm595LQ_FahMEgDtjqqDU",
    "http://t0.gstatic.com/licensed-image?q=tbn:ANd9GcSQ69jQfXUnTCgxvqI3vPFQXbhFvjEsrCpaJg93TaPToPajR-WLog6wKi1_duCqj-1YSNmMR8TJVFNy4yniXcE",
    "http://t1.gstatic.com/licensed-image?q=tbn:ANd9GcRkXBpCv0_aA9rtR69FyYsewBE9MJXUSVwfCh0y-gvEUd6xPRdILqtUAiqaw1QoiK5q98rAAmEBmQLWGrlUmtE",
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
  <div>
  <div className="grid grid-cols-1 md:grid-cols-2 bg-[#F9F3F2]">
    <div className="md:col-span-1 md:order-2 relative flex flex-col justify-center p-4 md:p-8 lg:p-12 text-center">
      <div className="text-lg text-gray-600 font-semibold mb-4">
        <h2 className="text-xl font-bold">Rent Your Dream Home</h2>
        <p>
           Discover a collection of beautiful homes for rent. Find the perfect place to call home for your next adventure.
        </p>
      </div>
      <button
        onClick={goHome}
        className="text-white bg-custom1 rounded-lg text-2xl md:text-xl font-semibold shadow-md hover:bg-custom2 transition duration-300 p-4 md:p-2 lg:p-4"
      >
        Go Explore Home
      </button>
    </div>


    <div className="md:col-span-1 md:order-1 w-full pt-4 md:pt-11 text-center md:text-right">
      <Caraosel slides={slides} />
    </div>
    {/* {vacants.map(post=><div key={post.id}>
      <h1>
       {post.location}
      </h1>
      </div>)} */}
  </div>










</div>




  

  );
};

export default Main;
