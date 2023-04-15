import React from "react";

export default function Nav() {
  return (
    <div>
      <nav className="flex justify-between align-middle">
        <div className="text-red-700 text-2xl font-bold">Ethiopian Reporter</div>
        <div className="flex space-x-4 text-lg">
          <p>ማኅበራዊ</p>
          <p>ስፖርት</p>
          <p>ፖለቲካ</p>
        </div>
      </nav>
    </div>
  );
}
