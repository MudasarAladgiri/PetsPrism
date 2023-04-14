import React, { useState } from "react";
// import {Form,Button} from "react-boostrap"
import { useNavigate } from "react-router-dom";
const SearchBox = () => {
  const Navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      Navigate(`/search/${keyword}`);
    } else {
      Navigate("/");
    }
  };
  return (
    <form onSubmit={submitHandler} className="inline-flex">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="mr-2 ml-5 px-3 py-1 rounded-md border-gray-300 focus:outline-none focus:border-blue-500"
      />
      <button
        type="submit"
        className="p-2 bg-green-500 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBox;
