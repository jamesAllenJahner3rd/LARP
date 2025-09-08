"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import HamburgerMenu from './HamburgerMenu'
import Image from 'next/image'




const NavBar = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setLoaded(true), 1000); // slight delay to trigger transition
        return () => clearTimeout(timeout);
    }, []);

    const [openMenu, setOpenMenu] = useState(false);
    const navCss = `bg-neutral-200 grid grid-rows-4 min-h-5 min-w-fit grid py-8 px-3 items-center justify-items-center w-content border-1 rounded-full fixed inset-y-0 max-h-fit m-auto max-w-fit transition-all duration-1000 ease-in-out ${openMenu ? "inset-x-0 opacity-100" : "inset-x-100 opacity-0"}`
    const navMedium = "md:h-fit md:overflow-hidden md:m-auto md:min-w-fit md:grid-cols-4 md:max-w-fit md:grid md:py-2 md:px-3 md:items-center md:justify-items-center md:w-content md:border-1 md:rounded-full md:fixed md:inset-x-0 md:mx-auto md:bottom-6 md:grid-rows-1 md:opacity-100 md:inset-y-5/6 transition-transform "
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 ${loaded ? "md:translate-y-0" : "md:translate-y-20"} md:hover:animate-bounce`
    return (
        <>
            <HamburgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <nav className={`${navCss}  ${navMedium}`}>
                <Link href="/" className=""><h3 className={`${h3Css} delay-0 `}>Welcome </h3></Link>
                <Link href="/explore" className=""><h3 className={`${h3Css} delay-2000`}>Explore</h3></Link>
                <Image
                    src="/images/NavBarIcon.webp"
                    alt="Group of characters ready to adventure"
                    width={1200}
                    height={800}
                    sizes="100vw"

                    className="rounded-lg w-full size-1/1  shadow-md"
                />
                <Link href="/player" className=""><h3 className={`${h3Css} delay-1000`}>Members</h3></Link>
                <Link href="https://armstreet.com/collections/fireside-family-larp-costume-basics-and-more" className=""><h3 className={`${h3Css} delay-3000`}>Shop</h3></Link>

            </nav >
            <p>apple `${loaded}`</p>

        </>
    )
}

export default NavBar
{/* <div id="nav-icon1">
  <span></span>
  <span></span>
  <span></span>
</div> */}


