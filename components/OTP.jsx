import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OTP = ({ username }) => {
  const { push } = useRouter();
  const [otp, setOtp] = useState("");
  const [msg, setMsg] = useState("");

  const handleSubmitOTP = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      otp: otp,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        process.env.baseIp + "/auth/submit-otp",
        requestOptions
      );
      if (response.status == 200) {
        const result = await response.json();
        localStorage["authToken"] = result.user.token;
        if (result.user.role == "ADMIN") {
          push("/admin");
        } else {
          push("/");
        }
      } else {
        setMsg("Incorrect OTP");
      }
    } catch (err) {
      console.error(err);
      setMsg("And error occured");
    }
  };

  return (
    <div className=" border-gray-200 border-2 w-2/6 mx-auto p-5 rounded-md mb-10">
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
          Enter the OTP Code sent to your phone number
        </label>
        <input
          className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          type="text"
          name="otp"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
      </div>
      <div className="text-red-600 mb-4">{msg}</div>
      <button
        className="py-2 px-10 bg-cyan-700 text-white mx-4 text-md rounded-md"
        onClick={handleSubmitOTP}
      >
        Submit OTP Code
      </button>
    </div>
  );
};

export default OTP;
