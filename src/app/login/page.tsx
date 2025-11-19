"use client";
import { useEffect, useState } from "react";
import { UserLogin } from "@/lib/appwrite";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import Link from "next/link";
import { toast } from 'react-toastify'

/**
 * LoginPage
 *
 * Purpose:
 *   Renders the login form and handles user authentication via Appwrite.
 *
 * Responsibilities:
 *   - Collect user credentials (email and password)
 *   - Authenticate the user using `UserLogin()`
 *   - Store the authenticated user in context via `setLoggedInUser()`
 *   - Redirect verified users to /members, or unverified users to /register
 *   - Display toast notifications for success, failure, or verification prompts
 *
 * Dependencies:
 *   - `useAuth()` from AuthProvider for user context
 *   - `UserLogin()` from @/lib/appwrite for authentication
 *   - `useRouter()` from next/navigation for client-side routing
 *   - `react-toastify` for user feedback
 *
 * Notes:
 *   This is a client-only component (`"use client"`) due to use of React hooks and browser APIs.
 */

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { loggedInUser, setLoggedInUser, logout } = useAuth();
    const router = useRouter();
    const inputCSS = "bg-green-200 border-1 rounded";
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const user = await UserLogin(email, password)
            setLoggedInUser(user);
            if (user.emailVerification === true) {
                toast.success("Logged In");
                setTimeout(() => router.push("/members"), 700);
            } else {
                toast.info("You haven't verified your email yet.");
                router.push("/register");
            }
        } catch (err) {
            toast.error("Login failed");
            console.error("Login failed:", err);
        }
    };

    useEffect(() => {
        // Redirect user based on email verification status

        if (!loggedInUser) return;
        if (loggedInUser.emailVerification) {
            router.push("/members");
        } else {
            router.push("/register")
            toast.info("Please verify your email.");
        }
    }, [loggedInUser, router]);

    if (loggedInUser) {
        return (
            <main className="flex justify-center items-center h-screen">
                <p className="animate-pulse text-lg text-gray-700">Loading your dashboard...</p>
            </main>
        );
    }
    const navCss = `transition-all duration-1000 ease-in-out bg-[var(--navbar-background)] flex min-h-fit min-w-fit max-w-[1rem] py-8 px-3 items-center justify-items-center border-1 rounded-full absolute m-auto inset-y-0 justify-self-center`

    const navMedium = `md:overflow-hidden  md:items-center-safe flex-col  md:m-auto   md:opacity-100 md:inset-y-1/2 md:duration-2000 md:min-w-80 md:min-h-fit md:py-0 md:px-0 md:max-w-[768px] `
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 md:hover:animate-bounce`

    return (
        <main
            className="bg-[url('/images/ahf_christmas.webp')] w-full h-screen bg-cover">

            <div className={`${navCss} ${navMedium} shadow-2xl shadow-black`}>

                <p>Not logged in</p>
                <fieldset>
                    <form onSubmit={handleLogin} className="flex flex-col ">
                        <label htmlFor="email">Email:</label>
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputCSS}
                            autoComplete="email"
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            name="password"
                            className={inputCSS}
                            autoComplete="password"
                            required
                        />
                        <button type="submit" className="border rounded shadow-2xl m-3 bg-(--background-alpha)" disabled={!email || !password}>LOGIN</button>
                    </form>
                    <Link href="/register" className="border flex  justify-center rounded shadow-2xl m-3 bg-(--background-alpha)">Register</Link>

                </fieldset>
            </div >
        </main >
    );
};

export default LoginPage;