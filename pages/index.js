import NavBar from "@/components/NavBar";
import Home from "@/components/Home";
import { useEffect, useState } from "react";
import UserHome from "@/components/UserHome";
import Footer from "@/components/Footer";
import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["latin"] });

export default function HomePage() {
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

  return (
    <main
      className={`min-h-screen flex-col items-center text-center ${cairo.className}`}
    >
      {!loading && (
        <>
          <NavBar />
          {!isLoggedIn && <Home />}
          {isLoggedIn && <UserHome userInfo={userInfo} />}
          <Footer />
        </>
      )}
    </main>
  );
}
