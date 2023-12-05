import { useRouter } from "next/navigation";
import React from "react";

const Home = () => {
  const { push, reload } = useRouter();
  return (
    <div>
      <h1 className="text-4xl mt-32">
        Welcome To My Paymob Integration Test Application!
      </h1>
      <p className="mt-10 mb-10 text-lg">A test application which I built as an assessment for <b className="text-cyan-700">iGenTech</b>!</p>
      <p className="mt-10 mb-10 text-sm">The website is built using Node.js, Express.js, React.js, Next.js, Sequelize and JWT Authentication</p>
      <p className="mt-10 mb-10 text-lg">Try it now!</p>
      <div>
        <button
          className="py-2 px-4 bg-cyan-700 text-white mx-4 text-xl rounded-md hover:bg-cyan-900 transition-all"
          onClick={() => push("/signup")}
        >
          Signup
        </button>
        <button
          className="py-2 px-4 bg-cyan-700 text-white mx-4 text-xl rounded-md hover:bg-cyan-900 transition-all"
          onClick={() => push("/login")}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Home;
