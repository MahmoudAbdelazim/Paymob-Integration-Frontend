import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Login = () => {
  const { push, reload } = useRouter();
  const [loginData, setLoginData] = useState({});
  const [msg, setMsg] = useState("");

  const handleLogin = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(loginData);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        process.env.baseIp + "/auth/login",
        requestOptions
      );
      if (response.status == 200) {
        const result = await response.json();
        localStorage.setItem('authToken', result.user.token);
        push("/");
      } else {
        const result = await response.json();
        setMsg(result.message);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="text-center pt-10">
      <div className=" border-cyan-200 border-2 w-2/6 mx-auto p-4 rounded-md mb-10">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
            Username or Phone number
          </label>
          <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            name="username"
            id="username"
            value={loginData.usernameOrPhoneNumber}
            onChange={(e) =>
              setLoginData({ ...loginData, usernameOrPhoneNumber: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
            Password
          </label>
          <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="password"
            name="password"
            id="password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
        </div>
        <div className="text-red-600 mb-4">{msg}</div>
        <button
          className="py-2 px-4 bg-cyan-700 text-white mx-4 text-xl rounded-md"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
