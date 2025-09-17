"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import HamburgerMenu from './HamburgerMenu'
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation"
import { getNavForPath } from '@/lib/navConfig'
import { get } from 'http'
import { useAuth } from "@/app/providers/AuthProvider";
import { account } from '@/lib/appwrite'
import { revalidatePath } from 'next/cache'






const NavBar = () => {
    const { user, logout } = useAuth();
    const pathname = usePathname();
    const { heading, hyperRef } = getNavForPath(pathname);
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    const { setUser } = useAuth();
    useEffect(() => {
        const timeout = setTimeout(() => setLoaded(true), 1000); // slight delay to trigger transition
        return () => clearTimeout(timeout);
    }, []);

    const [openMenu, setOpenMenu] = useState(false);

    const navCss = `transition-all duration-1000 ease-in-out ${openMenu ? "inset-x-0 opacity-100" : "inset-x-100 opacity-0"} bg-[var(--navbar-background)] grid grid-rows-5 min-h-5 min-w-fit max-w-[1rem] py-8 px-3 items-center justify-items-center border-1 rounded-full fixed inset-y-0 justify-self-center`

    const navMedium = ` md:overflow-hidden md:grid-cols-5  md:inset-x-0 md:mx-auto md:bottom-6 md:grid-rows-1 md:opacity-100 md:inset-y-5/6 md:duration-2000 md:min-w-0 md:min-h-fit md:py-0 md:px-0 md:max-w-[768px] ${loaded ? "md:w-[768px]" : "md:w-0"}`
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 ${loaded ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-20"} md:hover:animate-bounce`
    const logoutHandler = async () => {
        if (!account) return;
        await account.deleteSession("current");
        router.push("/")
        setUser(null)


    }
    return (

        <>
            <HamburgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <nav className={`${navCss}  ${navMedium}`}>
                <Link href={hyperRef[0]} className=""><h3 className={`${h3Css} delay-0 `} onClick={() => setOpenMenu(!openMenu)}>{heading[0]} </h3></Link>
                <Link href={hyperRef[1]} className=""><h3 className={`${h3Css} delay-2000`} onClick={() => setOpenMenu(!openMenu)}>{heading[1]}</h3></Link>
                <Link href="/" className="rounded-lg w-full size-1/1 " onClick={() => setOpenMenu(!openMenu)}><Image
                    src="/images/NavBarIcon.webp"
                    alt="Group of characters ready to adventure"
                    width={1200}
                    height={800}
                    sizes="100vw"

                    className="rounded-lg w-full size-1/1 "
                /></Link>
                <Link href={hyperRef[2]} className=""><h3 className={`${h3Css} delay-1000`} onClick={() => setOpenMenu(!openMenu)}>{heading[2]}</h3></Link>
                {!user && (<Link href={hyperRef[3]} className=""><h3 className={`${h3Css} delay-3000`} onClick={() => setOpenMenu(!openMenu)}>{heading[3]}</h3></Link>)}
                {user && (<h3 className={`${h3Css} flex  items-center delay-3000`} onClick={logoutHandler}>Log Out</h3>)}

            </nav >
        </>
    )
}

export default NavBar



