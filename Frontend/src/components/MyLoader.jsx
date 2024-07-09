import React from "react";
import { CirclesWithBar, BallTriangle } from "react-loader-spinner";

function MyLoader() {
  return (
    <div className="flex justify-center items-center h-[80vh]">
      <CirclesWithBar
        height="100"
        width="100"
        color="#2563EB"
        outerCircleColor="#2563EB"
        innerCircleColor="#2563EB"
        barColor="#2563EB"
        ariaLabel="circles-with-bar-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default MyLoader;

/*
<BallTriangle
        height={100}
        width={100}
        radius={5}
        color="#2563EB"
        ariaLabel="ball-triangle-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />

  */
