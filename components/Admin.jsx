import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Admin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const { push, reload } = useRouter();
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchUserInfo = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage["authToken"]);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        process.env.baseIp + "/auth/getUserBasicInfo",
        requestOptions
      );
      if (response.status == 200) {
        const result = await response.json();
        console.log(result);
        if (result.role != "ADMIN") {
          push("/");
        }
        setUserInfo(result);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error(err);
      push("/login");
    }
    setLoading(false);
  };

  const fetchUsers = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage["authToken"]);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        process.env.baseIp + "/user/getAllUsers",
        requestOptions
      );
      console.log(response.status);
      if (response.status == 200) {
        const result = await response.json();
        setUsers(result.users);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("authToken") == null) {
      setIsLoggedIn(false);
      setLoading(false);
      push("/login");
    } else {
      fetchUserInfo();
      fetchUsers();
    }
  }, []);

  const fetchUserTransactions = async (user) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage["authToken"]);
    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    try {
      const response = await fetch(
        process.env.baseIp +
          "/transaction/get-transactions-of-user/" +
          user.username,
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

  return (
    <div>
      {!loading && (
        <div className="text-center mt-5">
          <h2 className="text-3xl">Admin Dashboard</h2>
          <p>Please select a user to view their transactions.</p>
          <div className="flex flex-row w-5/6 mx-auto bg-gray-100 border-gray-200 mt-10 border-2">
            <div className="w-2/12 text-left border-r-2">
              {users.map((user) => {
                return (
                  <div
                    className="px-4 py-4 border-b-2 hover:bg-gray-200 hover:cursor-pointer"
                    onClick={(e) => fetchUserTransactions(user)}
                  >
                    {user.username}
                  </div>
                );
              })}
            </div>
            <div className="text-center mx-auto my-auto px-5">
              {transactions.length > 0 && (
                <table className="border-collapse mx-auto">
                  <thead>
                    <tr className="border-gray-300 border-b-2">
                      <th className="py-4 px-2 text-cyan-600">Amount</th>
                      <th className="py-4 px-2 text-cyan-600">Time</th>
                      <th className="py-4 px-2 text-cyan-600">From</th>
                      <th className="py-4 px-2 text-cyan-600">
                        Receiver Email
                      </th>
                      <th className="py-4 px-2 text-cyan-600">
                        Receiver Company Name
                      </th>
                      <th className="py-4 px-2 text-cyan-600">
                        Receiver Phone
                      </th>
                      <th className="py-4 px-2 text-cyan-600">
                        Receiver Country
                      </th>
                      <th className="py-4 px-2 text-cyan-600">Receiver City</th>
                      <th className="py-4 px-2 text-cyan-600">Done</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((transaction) => {
                      return (
                        <tr className="border-gray-200 border-b-2">
                          <td className="text-sm py-4 px-2">
                            {transaction.amount} EGP
                          </td>
                          <td className="text-sm py-4 px-2">
                            {transaction.createdAt}
                          </td>
                          <td className="text-sm py-4 px-2">
                            {transaction.from}
                          </td>
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
              )}
              {transactions.length == 0 && (
                <div>Please select a user to view their transactions.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
