import { useRef } from "react";
import React from "react";

const SearchQuery = (query, setDocument) => {
  fetch(`http://localhost:2222/?query=${query}`)
    .then((response) => response.json())
    .then((data) => setDocument(data))
    .catch((error) => console.error(error));
};

export default function Search({ setDocument }) {
  const query = useRef();
  return (
    <div className="flex justify-center">
      <div className="flex justify-between w-2/4 p-3 mt-10 border rounded-lg">
        <input
          className="w-full focus:outline-none"
          ref={query}
          type="text"
          placeholder="Search Here"
        />
        <button
          onClick={() => SearchQuery(query.current.value, setDocument)}
          className="p-2 text-white bg-red-700 rounded-lg"
        >
          Search
        </button>
      </div>
    </div>
  );
}
