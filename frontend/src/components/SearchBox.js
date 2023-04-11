import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const Navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      Navigate(`/search/${keyword}`);
    } else {
      Navigate("/");
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form onSubmit={submitHandler} className="inline-flex">
        <input
          type="text"
          name="q"
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Search Products..."
          className="mr-2 ml-5 border rounded-l-lg py-2 px-3 border-gray-400 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="border border-blue-500 bg-blue-500 text-white rounded-r-lg py-2 px-4 transition duration-300 ease-in-out hover:bg-blue-700 hover:border-blue-700"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
