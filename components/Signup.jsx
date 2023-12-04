import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Signup = () => {
  const { push, reload } = useRouter();
  const [signupData, setSignupData] = useState({});
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    if (signupData.password != signupData.repeatedPassword) {
      setMsg("Repeated password doesn't match");
      return;
    }

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var raw = JSON.stringify(signupData);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        process.env.baseIp + "/auth/signup",
        requestOptions
      );
      if (response.status == 200) {
        const result = await response.json();
        push("/login");
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
            First Name
          </label>
          <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            name="firstName"
            id="firstName"
            value={signupData.firstName}
            onChange={(e) =>
              setSignupData({ ...signupData, firstName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
            Last Name
          </label>
          <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            name="lastName"
            id="lastName"
            value={signupData.lastName}
            onChange={(e) =>
              setSignupData({ ...signupData, lastName: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
            Username
          </label>
          <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            name="username"
            id="username"
            value={signupData.username}
            onChange={(e) =>
              setSignupData({ ...signupData, username: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
            Phone Number
          </label>
          <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={signupData.phoneNumber}
            onChange={(e) =>
              setSignupData({ ...signupData, phoneNumber: e.target.value })
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
            value={signupData.password}
            onChange={(e) =>
              setSignupData({ ...signupData, password: e.target.value })
            }
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
            Repeat Password
          </label>
          <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="password"
            name="repeatedPassword"
            id="repeatedPassword"
            value={signupData.repeatedPassword}
            onChange={(e) =>
              setSignupData({ ...signupData, repeatedPassword: e.target.value })
            }
          />
        </div>
        <div className="text-red-600 mb-4">{msg}</div>
        <button
          className="py-2 px-4 bg-cyan-700 text-white mx-4 text-xl rounded-md"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
