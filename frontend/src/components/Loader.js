import React from "react";
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="spinner border-4 border-gray-200 h-12 w-12 rounded-full mb-4"></div>
      <p className="text-gray-500 font-bold">Loading...</p>
    </div>

    // <Spinner animation="border"
    // role="status"
    // style={{
    //     width:"100px",
    //     height:"100px",
    //     margin:"auto",
    //     display:"block",
    //     }}>

    //   <span class="sr-only"></span>
    // </Spinner>
  );
};

export default Loader;
