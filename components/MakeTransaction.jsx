import React, { useState } from "react";

const MakeTransaction = () => {
  const [amount, setAmount] = useState(10);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const handleStartPaymentTransaction = async () => {
    if (!email) {
      setMsg("You have to enter your Email");
      return;
    }
    if (amount < 10) {
      setMsg("You can not make a transaction of less than 10 EGP");
      return;
    }
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage["authToken"]);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      amount: amount,
      email: email,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        process.env.baseIp + "/transaction/start-transaction",
        requestOptions
      );
      if (response.status == 200) {
        const result = await response.json();
        window.location.href = 'https://accept.paymob.com/api/acceptance/iframes/806645?payment_token=' + result.paymentKey;
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="text-center pt-10">
      <h2 className="text-2xl mb-10">Make A Payment Transaction</h2>
      <p className="mb-10">
        Just enter the amount of money you want to send me and it will land
        right in my account {";))"}
      </p>
      <div className=" border-cyan-200 border-2 w-2/6 mx-auto p-4 rounded-md mb-10">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
            Enter the amount (in EGP)
          </label>
          <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="number"
            name="amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-900 text-left">
            Enter your Email
          </label>
          <input
            className="mb-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="text-red-600 mb-4">{msg}</div>
        <button
          className="py-2 px-4 bg-cyan-700 text-white mx-4 text-xl rounded-md"
          onClick={handleStartPaymentTransaction}
        >
          Send payment
        </button>
      </div>
    </div>
  );
};

export default MakeTransaction;
