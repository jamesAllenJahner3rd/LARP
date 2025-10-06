"use client";
import { useEffect, useState } from "react";
import { account } from "@/lib/appwrite";

import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import Link from "next/link";
import { toast } from 'react-toastify'

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// export const revalidate = 0;

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser, logout } = useAuth();
    const router = useRouter();
    const inputCSS = "bg-green-200 border-1 rounded";
    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const loggedInUser = await account.createEmailPasswordSession(email, password);
            const currentUser = await account.get()
            setUser(currentUser);
            if (currentUser.emailVerification === true) {
                toast.success("Logged In");
                setTimeout(() => router.push("/members"), 700);
            } else if (currentUser.emailVerification === false) {
                toast.info("You haven't verified your email yet.");
                router.push("/register");
            }
        } catch (err) {
            toast.error("Login failed");
            console.error("Login failed:", err);
        }
    };


    useEffect(() => {
        if (user && user.emailVerification) {
            router.push("/members");
            toast("Loading...")
        }
    }, [user, router]);
    useEffect(() => {
        if (user && !user.emailVerification) router.push("/register");;
    }, [user]);
    if (user) {
        return (
            <section>Loading ...
            </section>
        );
    }
    const navCss = `transition-all duration-1000 ease-in-out bg-[var(--navbar-background)] flex min-h-fit min-w-fit max-w-[1rem] py-8 px-3 items-center justify-items-center border-1 rounded-full absolute m-auto inset-y-0 justify-self-center`

    const navMedium = `md:overflow-hidden  md:items-center-safe flex-col  md:m-auto   md:opacity-100 md:inset-y-1/2 md:duration-2000 md:min-w-80 md:min-h-fit md:py-0 md:px-0 md:max-w-[768px] `
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 md:hover:animate-bounce`

    return (
        <main className="bg-[url('/images/ahf_christmas.webp')] w-full h-[100vh] bg-cover">

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
                        />
                        <input type="submit" value="LOGIN" className="border-1 rounded shadow-2xl m-3 bg-[var(--background-alpha)]" />
                    </form>
                    <Link href="/register" className="border-1 flex  justify-center rounded shadow-2xl m-3 bg-[var(--background-alpha)]">Register</Link>

                </fieldset>
            </div >
        </main >
    );
};

export default LoginPage;