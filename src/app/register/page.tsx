"use client";
import { useEffect, useState } from "react";
import { account, ID } from "@/lib/appwrite";
import type { Models } from "appwrite";
import Form from 'next/form'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";


export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// export const revalidate = 0;


const RegistrationPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [duplicatePassword, setDuplicatePassword] = useState("");

    const { user, setUser, logout } = useAuth();
    const router = useRouter();
    const inputCSS = "bg-green-200 border-1 rounded";
    const handleRegistation = async () => {
        if (!account) return;
        try {
            const newMember = await account.create(ID.unique(), email, password, name);
            // const userDetails = await account.get();
            setUser(newMember);
            router.push("/members");
        } catch (error) {
            console.error(`Unable to register, Error: ${error}`);
            throw Error;
        }
    };
    useEffect(() => {
        if (user) {
            router.push("/members");
        }
    }, [user]);
    if (user) {
        return (
            <p>
            </p>
        );
    }
    const navCss = `transition-all duration-1000 ease-in-out bg-[var(--navbar-background)] flex min-h-fit min-w-fit max-w-[1rem] py-8 px-3 items-center justify-items-center border-1 rounded-full absolute m-auto inset-y-0 justify-self-center`

    const navMedium = `md:overflow-hidden  md:items-center-safe flex-col  md:m-auto   md:opacity-100 md:inset-y-1/2 md:duration-2000 md:min-w-80 md:min-h-fit md:h-[30rem] md:justify-center md:py-0 md:px-0 md:max-w-[768px] `
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 md:hover:animate-bounce`


    return (


        <main className="bg-[url('/images/fazingA.webp')] w-full h-[100vh] bg-cover">

            <div className={`${navCss} ${navMedium} shadow-2xl shadow-black`}>
                <h1>Register</h1>

                <fieldset>
                    <Form action={handleRegistation} className="flex flex-col">
                        <label htmlFor="name">Name:</label>
                        <input
                            name="name"
                            type="name"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={inputCSS}
                            autoComplete="name"
                            required
                        />
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
                        <label htmlFor="ConfirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            placeholder="Password"
                            value={duplicatePassword}
                            onChange={(e) => {
                                setDuplicatePassword(e.target.value)
                                password === e.target.value ? setConfirmPassword(true) : setConfirmPassword(false)
                            }}
                            name="ConfirmPassword"
                            className={inputCSS}
                            autoComplete="password"
                            required
                        />
                        {!confirmPassword && <span className="text-red-600 bg-white"> Passwords Don't Match</span>}
                        <input type="submit" value="Create Member" disabled={!confirmPassword}
                            className="border-1 rounded shadow-2xl m-3 bg-[var(--background-alpha)]" />
                    </Form>

                </fieldset>
            </div>
        </main >
    );
};



export default RegistrationPage