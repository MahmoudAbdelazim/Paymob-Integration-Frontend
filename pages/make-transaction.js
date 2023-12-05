import Footer from "@/components/Footer";
import MakeTransaction from "@/components/MakeTransaction";
import NavBar from "@/components/NavBar";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const MakeTransactionPage = () => {
  const {push, reload} = useRouter();
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
      } else {
        push("/login");
      }
    } catch (err) {
      console.error(err);
      push("/login");
    }
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("authToken") == null) {
      setIsLoggedIn(false);
      setLoading(false);
      push("/login");
    } else {
      fetchUserInfo();
    }
  }, []);
  return (
    <div>
      {!loading && (
        <>
          <NavBar />
          <MakeTransaction />
          <Footer />
        </>
      )}
    </div>
  );
};

export default MakeTransactionPage;
