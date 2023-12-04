import { Cairo } from "next/font/google";
import NavBar from "@/components/NavBar";
import Home from "@/components/Home";

const cairo = Cairo({ subsets: ["latin"] });

export default function HomePage() {
  return (
    <main
      className={`min-h-screen flex-col items-center text-center ${cairo.className}`}
    >
      <NavBar />
      <Home />
    </main>
  );
}
