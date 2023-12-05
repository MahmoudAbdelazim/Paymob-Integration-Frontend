import React, { useEffect, useState } from "react";

const MyTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage["authToken"]);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        process.env.baseIp + "/transaction/get-my-transactions",
        requestOptions
      );
      if (response.status == 200) {
        const result = await response.json();
        setTransactions(result.transactions);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  return (
    <div className="text-center">
      <h2 className="text-3xl mt-10">My Transactions</h2>
      <p className="mt-4 mb-10">
        This is a history list of all your transactions on this application
      </p>
      <table className="border-collapse mx-auto">
        <thead>
          <tr className="border-gray-300 border-b-2">
            <th className="py-4 px-2 text-cyan-600">Amount</th>
            <th className="py-4 px-2 text-cyan-600">Time</th>
            <th className="py-4 px-2 text-cyan-600">From</th>
            <th className="py-4 px-2 text-cyan-600">Receiver Email</th>
            <th className="py-4 px-2 text-cyan-600">Receiver Company Name</th>
            <th className="py-4 px-2 text-cyan-600">Receiver Phone</th>
            <th className="py-4 px-2 text-cyan-600">Receiver Country</th>
            <th className="py-4 px-2 text-cyan-600">Receiver City</th>
            <th className="py-4 px-2 text-cyan-600">Done</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => {
            return (
              <tr className="border-gray-200 border-b-2">
                <td className="text-sm py-4 px-2">{transaction.amount} EGP</td>
                <td className="text-sm py-4 px-2">{transaction.createdAt}</td>
                <td className="text-sm py-4 px-2">{transaction.from}</td>
                <td className="text-sm py-4 px-2">
                  {transaction.receiverEmail}
                </td>
                <td className="text-sm py-4 px-2">
                  {transaction.receiverCompanyName}
                </td>
                <td className="text-sm py-4 px-2">
                  {transaction.receiverPhone}
                </td>
                <td className="text-sm py-4 px-2">
                  {transaction.receiverCountry}
                </td>
                <td className="text-sm py-4 px-2">
                  {transaction.receiverCity}
                </td>
                <td className="text-sm py-4 px-2">{`${transaction.done}`}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyTransactions;
