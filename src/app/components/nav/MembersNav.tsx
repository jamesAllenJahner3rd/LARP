"use client"
import Link from 'next/link'
import { useState, useEffect, useContext } from 'react'
import HamburgerMenu from '../HamburgerMenu'
import Image from 'next/image'
import { usePathname, useRouter } from "next/navigation"
import { useAuth } from "@/app/providers/AuthProvider";
import { getAuthenticatedAccount } from '@/lib/appwrite'
import { toast } from 'react-toastify'
import { CharacterContext } from '@/app/members/layout'

/**
 * MembersNav
 *
 * Purpose:
 *   Renders the navigation bar for authenticated members, with route links and logout functionality.
 *
 * Responsibilities:
 *   - Display member-specific navigation links
 *   - Animate transitions and toggle visibility via `HamburgerMenu`
 *   - Handle logout via Appwrite session deletion and context reset
 *
 * Dependencies:
 *   - `useAuth()` from AuthProvider for user session context
 *   - `next/navigation` for routing and pathname detection
 *   - `getAuthenticatedAccount()` from @/lib/appwrite for logout
 *   - `react-toastify` for feedback
 *
 * Notes:
 *   - This is a `"use client"` component due to use of React hooks and Appwrite browser SDK.
 *   - Responsive behavior adapts layout for mobile and desktop views.
 */

const NavBar = ({ clickedTab, setClickedTab }) => {
    const { logout, loggedInUser, isAdmin, setLoggedInUser } = useAuth();
    const { characterSelected, setCharacterSelected } = useContext(CharacterContext)

    const pathname = usePathname();
    const [loaded, setLoaded] = useState(false);

    const router = useRouter();
    useEffect(() => {
        const timeout = setTimeout(() => setLoaded(true), 1000); // slight delay to trigger transition
        return () => clearTimeout(timeout);
    }, []);

    const [openMenu, setOpenMenu] = useState(false);



    const navMedium = ` md:overflow-hidden md:grid md:grid-cols-5  md:inset-x-0 md:mx-auto md:bottom-6 md:grid-rows-1 md:opacity-100 md:inset-y-5/6 md:duration-2000 md:min-w-0 md:min-h-fit md:py-0 md:px-0 md:max-w-[768px] ${loaded ? "md:w-[768px]" : "md:w-0"}`
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 ${loaded ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-20"} md:hover:animate-bounce`
    const logoutHandler = async () => {
        const account = getAuthenticatedAccount()
        if (!account) return;
        try {
            await account.deleteSession("current");
            toast.success("Logged Out")
            setTimeout(() => router.push("/"), 700);
            setLoggedInUser(null)
        } catch (error) {
            console.error(error, " Failed to log out - MembersNav")
        }

    }
    const tabLinks = "md: md:w-35 md:flex md:flex-col md:h-auto md:pl-2 md:shadow-2xs md:border-1 md:border-black md:rounded-[50px_0_0_50px]";
    const mobileLinks = " text-2xl  px-5 btn btn-primary "
    const LinksCss = `${(openMenu && window.innerWidth < 481) ? mobileLinks : tabLinks

        } `

    return (

        <>
            <HamburgerMenu openMenu={openMenu} setOpenMenu={setOpenMenu} />

            <nav className={`   md:items-end md:mt-5 ${(openMenu && window.innerWidth < 481) ? "flex bg-neutral-400 rounded-full  border-2 border-black " : "hidden"} absolute  w-1/1 items-center md:relative md:flex flex-col md:gap-1 md:w-1/7 z-3`}>
                <Link href="/" className="rounded-lg w-full" onClick={() => setOpenMenu(!openMenu)}><Image
                    src="/images/NavBarIcon.webp"
                    alt="Group of characters ready to adventure"
                    width={1200}
                    height={800}
                    sizes="1/1"
                    priority
                    className="rounded-lg w-full size-1/1 "
                /></Link>
                <Link
                    className={`${LinksCss} ${clickedTab === 1 ? "bg-gray-500" : "md:bg-[var(--navbar-background)]"} `}
                    onClick={
                        () => {
                            setOpenMenu(!openMenu);
                            setClickedTab(() => 1);
                        }
                    }
                    href="/members/userSettings"
                >Account settings
                </Link>
                <Link
                    className={`${LinksCss} ${clickedTab === 2 ? "  md:bg-gray-500" : "md:bg-[var(--navbar-background)]"} `}
                    onClick={
                        () => {
                            setOpenMenu(!openMenu);
                            setClickedTab(() => 2);
                        }
                    }
                    href="/members/create-character"
                >Create Character
                </Link>
                <Link
                    className={`${LinksCss} ${clickedTab === 3 ? "  md:bg-gray-500" : "md:bg-[var(--navbar-background)]"} `}
                    onClick={
                        () => {
                            setOpenMenu(!openMenu);
                            setClickedTab(() => 3);
                        }
                    }
                    href="/members/character"
                >Characters
                </Link>
                {characterSelected &&
                    <Link
                        className={`${LinksCss} ${clickedTab === 4 ? "  md:bg-gray-500" : "md:bg-[var(--navbar-background)]"}`}
                        onClick={
                            () => {
                                setOpenMenu(!openMenu);
                                setClickedTab(() => 4);
                            }
                        }
                        href="/members/slack"
                    >Role Play
                    </Link>}
                <Link
                    className={`${LinksCss} ${clickedTab === 5 ? "  md:bg-gray-500" : "md:bg-[var(--navbar-background)]"} `}
                    onClick={
                        () => {
                            setOpenMenu(!openMenu);
                            setClickedTab(() => 5);
                        }
                    }
                    href="/members/factions"
                >Factions
                </Link>
                <button

                    className={`${LinksCss} items-start ${clickedTab === 6 ? "  md:bg-gray-500" : "md:bg-[var(--navbar-background)]"} `}
                    onClick={
                        () => {
                            setOpenMenu(!openMenu);
                            setClickedTab(() => 6);
                        }
                    }

                >Events</button>
                {isAdmin && <Link
                    className={`${LinksCss} ${clickedTab === 7 ? "  md:bg-gray-500" : "md:bg-[var(--navbar-background)]"} `}
                    onClick={
                        () => {
                            setOpenMenu(!openMenu);
                            setClickedTab(() => 7);
                        }}
                    href="/admin"
                >Admin Tools
                </Link>}
                <button
                    className={`${LinksCss} items-start bg-[var(--navbar-background)]`}
                    onClick={
                        () => {
                            setOpenMenu(!openMenu);
                            logoutHandler()
                        }
                    }
                >Log Out
                </button>
            </nav >

        </>
    )
}

export default NavBar



