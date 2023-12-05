import Footer from "@/components/Footer";
import NavBar from "@/components/NavBar";
import Signup from "@/components/Signup";
import React from "react";
import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["latin"] });

const SignupPage = () => {
  return (
    <div className={`${cairo.className}`}>
      <NavBar />
      <Signup />
      <Footer />
    </div>
  );
};

export default SignupPage;
