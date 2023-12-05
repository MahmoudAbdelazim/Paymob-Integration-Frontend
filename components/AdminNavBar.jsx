import React, { useEffect, useState } from "react";

const AdminNavBar = () => {
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };
  return (
    <div className="flex flex-row px-10 py-6 content-center">
      <h2 className="text-2xl">
        <a href="/admin" className="hover:text-cyan-900 transition-all">
          Mahmoud's Paymob Integration Test App
        </a>
      </h2>
      <div className="flex flex-row my-auto ml-6">
        <div className="mx-4">
          <a
            href="/admin"
            className="hover:text-cyan-900 hover:border-b hover:pb-1 hover:border-cyan-900 transition-all"
          >
            Home
          </a>
        </div>
        <div className="mx-4">
          <a
            href="/#"
            className="hover:text-cyan-900 hover:border-b hover:pb-1 hover:border-cyan-900 transition-all"
            onClick={handleLogout}
          >
            Logout
          </a>
        </div>
      </div>
    </div>
  );
};

export default AdminNavBar;
