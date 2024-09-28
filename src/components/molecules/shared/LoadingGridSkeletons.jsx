import { Skeleton } from "primereact/skeleton";
import React from "react";

function LoadingGridSkeletons({ columns, height, count = 6 }) {
  return (
    <div
      className={`grid w-full gap-5 ${
        columns ? columns : "lg:grid-cols-3"
      } flex-1`}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            height: height || "260px",
          }}
          className="bg-gray-800  animate-pulse  rounded-xl"
        />
      ))}
    </div>
  );
}

export default LoadingGridSkeletons;
