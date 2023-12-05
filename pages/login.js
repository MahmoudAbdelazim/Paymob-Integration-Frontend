import Footer from "@/components/Footer";
import Login from "@/components/Login";
import NavBar from "@/components/NavBar";
import { Cairo } from "next/font/google";
import React from "react";

const cairo = Cairo({ subsets: ["latin"] });

const LoginPage = () => {
  return (
    <div className={`${cairo.className}`}>
      <NavBar />
      <Login />
      <Footer />
    </div>
  );
};

export default LoginPage;
