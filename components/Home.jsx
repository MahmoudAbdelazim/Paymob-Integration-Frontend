import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const { push, reload } = useRouter();
  return (
    <div>
      <h1 className="text-4xl my-32">
        Welcome To My Paymob Integration Test Application!
      </h1>
      <div>
        <button
          className="py-2 px-4 bg-cyan-700 text-white mx-4 text-xl rounded-md"
          onClick={() => push("/signup")}
        >
          Signup
        </button>
        <button
          className="py-2 px-4 bg-cyan-700 text-white mx-4 text-xl rounded-md"
          onClick={() => push("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
