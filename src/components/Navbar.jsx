import React from 'react'

const Navbar = () => {
  return (
  

<nav className="bg-white border-gray-200 flex h-[50px]">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
    <a href="https://www.ksolves.com/" className="flex items-center space-x-3 rtl:space-x-reverse">
        <img src="https://www.ksolves.com/wp-content/uploads/ksLogo.svg" className="h-8" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap">Ksolves Tag Manager</span>
    </a>

  </div>
</nav>


  )
}

export default Navbar
