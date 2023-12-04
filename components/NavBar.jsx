import React from "react";

const NavBar = () => {
  return (
    <div className="flex flex-row px-10 py-6 content-center">
      <h2 className="text-2xl"><a href="/">Mahmoud Paymob Integration Test App</a></h2>
      <div className="flex flex-row my-auto ml-6">
        <div className="mx-2"><a href="/">Home</a></div>
        <div className="mx-2"><a href="/signup">Signup</a></div>
        <div className="mx-2"><a href="/login">Login</a></div>
        <div className="mx-2"><a href="/logout">Logout</a></div>
      </div>
    </div>
  );
};

export default NavBar;
