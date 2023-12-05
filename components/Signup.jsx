import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const validateSignupData = (signupData, setMsg) => {
  if (!signupData.firstName) {
    setMsg("You have to enter your first name");
    return false;
  }
  if (!signupData.lastName) {
    setMsg("You have to enter your last name");
    return false;
  }
  if (!signupData.username || signupData.username.length < 4) {
    setMsg("Username must be at least 4 characters");
    return false;
  }
  if (!signupData.phoneNumber) {
    setMsg("You have to enter your phone number");
    return false;
  }
  for (let i = 0; i < signupData.phoneNumber.length; i++) {
    if (
      signupData.phoneNumber.charAt(i) != "+" &&
      !(
        signupData.phoneNumber.charAt(i) >= "0" &&
        signupData.phoneNumber.charAt(i) <= "9"
      )
    ) {
      setMsg("Invalid phone number, can only include numbers and '+' symobl");
      return false;
    }
  }
  if (signupData.password.length < 8) {
    setMsg("Password must be at least 8 characters");
    return false;
  }
  if (signupData.password != signupData.repeatedPassword) {
    setMsg("Repeated password doesn't match");
    return false;
  }
  return true;
};

const Signup = () => {
  const { push, reload } = useRouter();
  const [signupData, setSignupData] = useState({});
  const [msg, setMsg] = useState("");

  const handleSignup = async () => {
    if (!validateSignupData(signupData, setMsg)) {
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
      <h2 className="text-3xl mb-10">Signup for a new account!</h2>
      <div className=" border-gray-200 border-2 w-2/6 mx-auto p-4 rounded-md mb-10">
        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
            htmlFor="firstName"
          >
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
          <label
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
            htmlFor="lastName"
          >
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
          <label
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
            htmlFor="username"
          >
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
          <label
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
            htmlFor="phoneNumber"
          >
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
          <label
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
            htmlFor="password"
          >
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
          <label
            className="block mb-2 text-sm font-medium text-gray-900 text-left"
            htmlFor="repeatedPassword"
          >
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
        <div className="text-left mb-4 mt-8">
          Already have an account?{" "}
          <a className="underline text-cyan-700" href="/login">
            Login
          </a>
        </div>
        <button
          className="py-2 bg-cyan-700 text-white px-10 text-md rounded-md"
          onClick={handleSignup}
        >
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;
