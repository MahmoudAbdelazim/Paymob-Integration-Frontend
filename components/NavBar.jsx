import React, { useEffect, useState } from "react";

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

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
        setUserInfo(result);
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("authToken") == null) {
      setIsLoggedIn(false);
      setLoading(false);
    } else {
      fetchUserInfo();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-row px-10 py-6 content-center">
      {!loading && (
        <>
          <h2 className="text-2xl">
            <a href="/" className="hover:text-cyan-900 transition-all">Mahmoud's Paymob Integration Test App</a>
          </h2>
          <div className="flex flex-row my-auto ml-6">
            <div className="mx-4">
              <a href="/" className="hover:text-cyan-900 hover:border-b hover:pb-1 hover:border-cyan-900 transition-all">Home</a>
            </div>
            {!isLoggedIn && (
              <>
                <div className="mx-4">
                  <a href="/signup" className="hover:text-cyan-900 hover:border-b hover:pb-1 hover:border-cyan-900 transition-all">Signup</a>
                </div>
                <div className="mx-4">
                  <a href="/login" className="hover:text-cyan-900 hover:border-b hover:pb-1 hover:border-cyan-900 transition-all">Login</a>
                </div>
              </>
            )}
            {isLoggedIn && (
              <>
                <div><a href="/my-transactions" className="hover:text-cyan-900 hover:border-b hover:pb-1 hover:border-cyan-900 transition-all">{userInfo.firstName}'s Transactions</a></div>
                <div className="mx-4">
                  <a href="/#" className="hover:text-cyan-900 hover:border-b hover:pb-1 hover:border-cyan-900 transition-all" onClick={handleLogout}>
                    Logout
                  </a>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NavBar;
