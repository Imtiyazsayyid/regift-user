import React from "react";

const HomePage = () => {
  return (
    <div className="p-5 flex flex-col gap-5">
      <h1 className="font-bold text-3xl md:text-6xl text-center pt-40 px-10 ">
        Welcome to <span className="text-secondary-500">Regift</span>.
      </h1>
      <div className="flex justify-center">
        <p className="w-full md:w-1/2 text-center font-poppins">
          <span className="text-secondary-500">Regift</span> we are an innovative service designed to promote giving and
          sustainability. Users can easily regift items they no longer need, such as clothing, household goods, or
          electronics, through the platform. These items are matched with individuals or organizations in need, ensuring
          they find new purpose and avoid unnecessary waste.{" "}
        </p>
      </div>
    </div>
  );
};

export default HomePage;
