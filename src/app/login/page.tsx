"use client";
import { useEffect, useState } from "react";
import { account, ID } from "@/lib/appwrite";
import type { Models } from "appwrite";
import Form from 'next/form'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import Link from "next/link";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// export const revalidate = 0;

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user, setUser, logout } = useAuth();
    const [name, setName] = useState("");
    const router = useRouter();
    const inputCSS = "bg-green-200 border-1 rounded";
    const handleLogin = async () => {
        try {
            const loggedInUser = await account.createEmailPasswordSession(email, password);
            const userDetails = await account.get(); // fetch full user object
            setUser(userDetails);
            router.push("/members");
        } catch (err) {
            console.error("Login failed:", err);
        }
    };


    useEffect(() => {
        if (user) {
            router.push("/members");
        }
    }, [user]);

    if (user) {
        return (
            <p>Loading ...
            </p>
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
                    <Form action={handleLogin} className="flex flex-col ">
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
                    </Form>
                    <Link href="/register" className="border-1 flex  justify-center rounded shadow-2xl m-3 bg-[var(--background-alpha)]">Register</Link>

                </fieldset>
            </div >
        </main >
    );
};

export default LoginPage;