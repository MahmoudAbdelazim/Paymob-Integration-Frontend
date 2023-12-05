import Admin from '@/components/Admin'
import AdminNavBar from '@/components/AdminNavBar'
import Footer from '@/components/Footer'
import React from 'react'
import { Cairo } from "next/font/google";

const cairo = Cairo({ subsets: ["latin"] });

const AdminPage = () => {
  return (
    <div className={`${cairo.className}`}>
      <AdminNavBar />
      <Admin />
      <Footer />
    </div>
  )
}

export default AdminPage