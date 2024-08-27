import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";
export default function Carousel({ slides }) {
    const navigate = useNavigate();
  const goHome = () => {
    navigate("/home");
  };
  let [current, setCurrent] = useState(0);

  let previousSlide = () => {
    if (current === 0) setCurrent(slides.length - 1);
    else setCurrent(current - 1);
  };

  let nextSlide = () => {
    if (current === slides.length - 1) setCurrent(0);
    else setCurrent(current + 1);
  };

  return (
    <div className="relative">
  <div className="overflow-hidden relative">
    <div
      className="flex transition ease-out duration-400"
      style={{
        transform: `translateX(-${current * 100}%)`,
      }}
    >
      {slides.map((s) => {
        return <img src={s}  className="w-full max-w-full"/>;
      })}
    </div>

    <div className="absolute top-0 h-full w-full justify-between items-center flex text-white px-10 text-3xl">
      <button onClick={previousSlide}>
        <BsFillArrowLeftCircleFill />
      </button>
      <button onClick={nextSlide}>
        <BsFillArrowRightCircleFill />
      </button>
    </div>

    
  </div>

  <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
    {slides.map((s, i) => {
      return (
        <div
          onClick={() => {
            setCurrent(i);
          }}
          key={"circle" + i}
          className={`rounded-full w-2 h-2 cursor-pointer  ${
            i === current ? "bg-white" : "bg-gray-500"
          }`}
        ></div>
      );
    })}
  </div>
</div>


  );
}