import React, { ReactNode } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/sidebar'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div>
      <Navbar />
      {children}
      <Sidebar />
    </div>
  )
}

export default AdminLayout