import Admin from '@/components/Admin'
import AdminNavBar from '@/components/AdminNavBar'
import Footer from '@/components/Footer'
import React from 'react'

const AdminPage = () => {
  return (
    <div>
      <AdminNavBar />
      <Admin />
      <Footer />
    </div>
  )
}

export default AdminPage