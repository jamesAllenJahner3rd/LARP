"use client"
import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import HamburgerMenu from '../HamburgerMenu'
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation"
import { getNavForPath } from '@/lib/navConfig'
import { get } from 'http'
import { useAuth } from "@/app/providers/AuthProvider";
import { account } from '@/lib/appwrite'
import { revalidatePath } from 'next/cache'
import { toast } from 'react-toastify'







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



    const navMedium = ` md:overflow-hidden md:grid md:grid-cols-5  md:inset-x-0 md:mx-auto md:bottom-6 md:grid-rows-1 md:opacity-100 md:inset-y-5/6 md:duration-2000 md:min-w-0 md:min-h-fit md:py-0 md:px-0 md:max-w-[768px] ${loaded ? "md:w-[768px]" : "md:w-0"}`
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 ${loaded ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-20"} md:hover:animate-bounce`
    const logoutHandler = async () => {
        if (!account) return;
        await account.deleteSession("current");
        toast.success("Logged Out")
        setTimeout(() => router.push("/"), 700);
        setUser(null)

    }
    const tabLinks = "md:bg-[var(--navbar-background)] md:w-35 md:flex md:h-auto md:pl-2 md:shadow-2xs md:border-1 md:border-black md:rounded-[50px_0_0_50px]";
    const mobileLinks = " bg-[var(--navbar-background)] text-2xl  px-5 btn btn-primary "
    const LinksCss = `${openMenu ? mobileLinks : tabLinks} `

    return (

        <>
            <HamburgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />

            <nav className={`   md:items-end md:mt-5 ${openMenu ? "flex" : "hidden"} absolute  w-1/1 items-center md:relative md:flex flex-col md:gap-1 md:w-1/7 z-3`}>
                <Link href="/" className="rounded-lg w-full  " onClick={() => setOpenMenu(!openMenu)}><Image
                    src="/images/NavBarIcon.webp"
                    alt="Group of characters ready to adventure"
                    width={1200}
                    height={800}
                    sizes="1/1"
                    priority
                    className="rounded-lg w-full size-1/1 "
                /></Link>
                <Link className={`${LinksCss}`} onClick={() => setOpenMenu(!openMenu)} href="/members/userSettings"  >Account settings</Link>
                <Link className={`${LinksCss}`} onClick={() => setOpenMenu(!openMenu)} href="/members/create-character" >Create Character</Link>
                <Link className={`${LinksCss}`} onClick={() => setOpenMenu(!openMenu)} href="/members/character" >Characters</Link>
                <Link className={`${LinksCss}`} onClick={() => setOpenMenu(!openMenu)} href="/members/userSettings" >Factions</Link>
                <Link className={`${LinksCss}`} onClick={() => setOpenMenu(!openMenu)} href="/members/slack" >Slack</Link>
                <Link className={`${LinksCss}`} onClick={() => setOpenMenu(!openMenu)} href="/events" >Events</Link>
                <Link className={`${LinksCss}`} onClick={() => setOpenMenu(!openMenu)} href="/admin" >Admin Tools</Link>
                <button className={`${LinksCss}`} onClick={() => {
                    setOpenMenu(!openMenu);
                    logoutHandler
                }}>Log Out</button>
            </nav>
            {/* <Link href={hyperRef[0]} className=""><h3 className={`${h3Css} delay-0 `} onClick={() => setOpenMenu(!openMenu)}>{heading[0]} </h3></Link>
                <Link href={hyperRef[1]} className=""><h3 className={`${h3Css} delay-2000`} onClick={() => setOpenMenu(!openMenu)}>{heading[1]}</h3></Link>

                <Link href={hyperRef[2]} className=""><h3 className={`${h3Css} delay-1000`} onClick={() => setOpenMenu(!openMenu)}>{heading[2]}</h3></Link>
                {!user && (<Link href={hyperRef[3]} className=""><h3 className={`${h3Css} delay-3000`} onClick={() => setOpenMenu(!openMenu)}>{heading[3]}</h3></Link>)} */}



        </>
    )
}

export default NavBar



