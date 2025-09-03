"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import HamburgerMenu from './HamburgerMenu'





const NavBar = () => {
    const [openMenu, setOpenMenu] = useState(false);
    const navCss = `grid grid-rows-4 min-h-5 min-w-fit grid py-8 px-3 items-center justify-items-center w-content border-1 rounded-full fixed inset-y-0 max-h-fit m-auto max-w-fit transition-all duration-1000 ease-in-out ${openMenu ? "inset-x-0 opacity-100" : "inset-x-100 opacity-0"}`
    const navMedium = "md:m-auto md:min-w-fit md:grid-cols-4 md:max-w-fit md:grid md:py-2 md:px-3 md:items-center md:justify-items-center md:w-content md:border-1 md:rounded-full md:fixed md:inset-x-0 md:mx-auto md:bottom-6 md:grid-rows-1 md:opacity-100 md:inset-y-300"

    return (
        <>
            <HamburgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <nav className={`${navCss}  ${navMedium}`}>
                <Link href="" className=""><h3 className=''>Welcome </h3></Link>
                <Link href="" className=""><h3 className=''>Explore</h3></Link>
                <Link href="" className=""><h3 className=''>Members</h3></Link>
                <Link href="" className=""><h3 className=''>Shop</h3></Link>

            </nav >



        </>
    )
}

export default NavBar
{/* <div id="nav-icon1">
  <span></span>
  <span></span>
  <span></span>
</div> */}


