"use client"
import Link from 'next/link'
import { useState, useEffect } from 'react'
import HamburgerMenu from '../HamburgerMenu'
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/app/providers/AuthProvider";
import { getAuthenticatedAccount } from '@/lib/appwrite'
import { toast } from 'react-toastify'

/**
 * NavBar
 *
 * Purpose:
 *   Renders the dynamic navigation bar for authenticated and public users.
 *
 * Responsibilities:
 *   - Display route-specific navigation links based on current pathname
 *   - Animate transitions and menu toggling via `HamburgerMenu`
 *   - Handle user logout via Appwrite session deletion
 *   - Adapt layout and visibility based on authentication state
 *
 * Dependencies:
 *   - `useAuth()` from AuthProvider for user context
 *   - `getNavForPath()` from navConfig for route-based headings
 *   - `getAuthenticatedAccount()` from @/lib/appwrite for logout
 *   - `next/navigation` for routing and pathname detection
 *   - `react-toastify` for feedback
 *
 * Notes:
 *   - This is a `"use client"` component due to use of React hooks and Appwrite browser SDK.
 *   - Future iterations may include role-based visibility or Slack integration.
 */

const NavBar = () => {
    const { loggedInUser, logout, setLoggedInUser } = useAuth();
    const pathname = usePathname();
    const [loaded, setLoaded] = useState(false);
    const router = useRouter();
    useEffect(() => {
        const timeout = setTimeout(() => setLoaded(true), 1000); // slight delay to trigger transition
        return () => clearTimeout(timeout);
    }, []);

    const [openMenu, setOpenMenu] = useState(false);

    const navCss = `transition-all duration-1000 ease-in-out ${openMenu ? "inset-x-0 opacity-100" : "inset-x-100 opacity-0"} bg-[var(--navbar-background)] grid grid-rows-5 min-h-5 min-w-fit max-w-[1rem] py-8 px-3 items-center justify-items-center border-1 rounded-full fixed inset-y-0 justify-self-center`

    const navMedium = ` md:overflow-hidden md:grid-cols-5  md:inset-x-0 md:mx-auto md:bottom-6 md:grid-rows-1 md:opacity-100 md:inset-y-5/6 md:duration-2000 md:min-w-0 md:min-h-fit md:py-0 md:px-0 md:max-w-[768px] ${loaded ? "md:w-[768px]" : "md:w-0"}`
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 ${loaded ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-20"} md:hover:animate-bounce`
    const logoutHandler = () => {
        const account = getAuthenticatedAccount()
        if (!account) return;
        account.deleteSession("current");
        toast.success("Logged Out")
        setTimeout(() => router.push("/"), 700);
        setLoggedInUser(null)


    }
    return (

        <>
            <HamburgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />
            <nav className={`${navCss}  ${navMedium} z-2`}>
                <Link href="/" className="rounded-lg w-full size-1/1 " ><Image
                    src="/images/NavBarIcon.webp"
                    alt="Group of characters ready to adventure"
                    width={1200}
                    height={800}
                    sizes="100vw"
                    priority
                    className="rounded-lg w-full size-1/1 "
                /></Link>
                <Link href="/pantheon" className=""><h3 className={`${h3Css} delay-1000 `} >Pantheon </h3></Link>
                {!loggedInUser && (<Link href="/register" className=""><h3 className={`${h3Css} delay-1500`} >Register</h3></Link>)}
                {loggedInUser && (<Link href="/members" className=""><h3 className={`${h3Css} delay-1500`} >Members </h3></Link>)}
                <Link href="/resources" className=""><h3 className={`${h3Css} delay-2000 `} >Resources </h3></Link>
                <Link href="/storyline" className=""><h3 className={`${h3Css} delay-2500`} >Storyline </h3></Link>
                <Link href="https://armstreet.com/collections/fireside-family-larp-costume-basics-and-more" className=""><h3 className={`${h3Css} delay-4500`} >Shop</h3></Link>
                <Link href="/about" className=""><h3 className={`${h3Css} delay-3500 `} >Explore </h3></Link>
                {!loggedInUser && (<Link href="/login" className=""><h3 className={`${h3Css} delay-4000`} >Log In</h3></Link>)}
                {loggedInUser && (<h3 className={`${h3Css} flex  items-center delay-4000`} onClick={logoutHandler}>Log Out</h3>)}
                <Link href="/rules" className=""><h3 className={`${h3Css} delay-3000 `} >Rules</h3></Link>
                <Link href="/events" className=""><h3 className={`${h3Css} delay-5000`} >Events</h3></Link>




            </nav >
        </>
    )
}

export default NavBar



