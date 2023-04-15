import React from "react";

export default function Search() {
  return (
    <div className="flex justify-center">
      <div className="border p-3 w-2/4 mt-10 rounded-lg justify-between flex">
        <input type="text" placeholder="Search Here" />
        <button className="text-white bg-red-700 p-2 rounded-lg">Search</button>
      </div>
    </div>
  );
}
