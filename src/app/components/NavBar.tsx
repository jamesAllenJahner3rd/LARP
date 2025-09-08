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

    const navCss = `transition-all duration-1000 ease-in-out ${openMenu ? "inset-x-0 opacity-100" : "inset-x-100 opacity-0"} bg-neutral-200 grid grid-rows-5 min-h-5 min-w-fit max-w-[1rem] py-8 px-3 items-center justify-items-center border-1 rounded-full fixed inset-y-0 justify-self-center`

    const navMedium = ` md:overflow-hidden md:grid-cols-5  md:inset-x-0 md:mx-auto md:bottom-6 md:grid-rows-1 md:opacity-100 md:inset-y-5/6 md:duration-2000 md:min-w-0 md:min-h-fit md:py-0 md:px-0 md:max-w-[768px] ${loaded ? "md:w-[768px]" : "md:w-0"}`
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 ${loaded ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-20"} md:hover:animate-bounce`
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

                    className="rounded-lg w-full size-1/1 "
                />
                <Link href="/player" className=""><h3 className={`${h3Css} delay-1000`}>Members</h3></Link>
                <Link href="https://armstreet.com/collections/fireside-family-larp-costume-basics-and-more" className=""><h3 className={`${h3Css} delay-3000`}>Shop</h3></Link>

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


