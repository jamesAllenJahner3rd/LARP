"use client";
import { useEffect, useState } from "react";
import { account, ID } from "@/lib/appwrite";
import type { Models } from "appwrite";
import Form from 'next/form'
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers/AuthProvider";
import { toast } from 'react-toastify'

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// export const revalidate = 0;
const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;

const RegistrationPage = () => {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState(false);
    const [duplicatePassword, setDuplicatePassword] = useState("");
    const [emailPending, setEmailPending] = useState(false)
    const { user, setUser, logout } = useAuth();
    const [isVerified, setIsVerified] = useState(false)
    const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;
    const inputCSS = "bg-green-200 border-1 rounded";
    const notRegistered = () => toast("Unable to register!");
    const emailRejected = () => toast("Unable to Resend Email!");
    const verifyEmail = () => toast(" You haven't verified your email yet.")
    const handleRegistation = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!account) return;
        try {
            const newMember = await account.create(ID.unique(), email, password, name);
            await account.createEmailPasswordSession(email, password);
            setUser(newMember);
            const params = {
                url: `${rootUrl}/register/verify`
            }
            const promise = await account.createVerification(params)
            setEmailPending(true)

        } catch (error) {
            notRegistered()
            console.error(`Unable to register, Error: ${error}`);
            throw Error;
        }
    };
    const handleResend = async () => {
        try {
            const params = {
                url: `http://localhost:3000/register/verify`//${rootUrl}
            }
            const promise = await account.createVerification(params)
        } catch (error) {
            emailRejected()
            console.error(`Unable to Resend Email, Error: ${error}`);
            throw Error;
        }
    };

    useEffect(() => {
        if (user && !user.emailVerification) {
            setIsVerified(false)
            verifyEmail()
        } else if (user && user.emailVerification) {
            setIsVerified(true)
            router.push("/members")
        }
    }, [user, router]);

    if (user && !isVerified) {
        const navCss = `transition-all duration-1000 ease-in-out bg-[var(--navbar-background)] flex min-h-fit min-w-fit max-w-[1rem] py-8 px-3 items-center justify-items-center border-1 rounded-full absolute m-auto inset-y-0 justify-self-center`

        const navMedium = `md:overflow-hidden  md:items-center-safe flex-col  md:m-auto   md:opacity-100 md:inset-y-1/2 md:duration-2000 md:min-w-fit md:min-h-fit md:py-0 md:px-10 md:max-w-[768px] `
        const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 md:hover:animate-bounce`

        return (
            <div className={`${navCss} ${navMedium}`}>
                <span>{user?.name ?? "Member"}, Check your Email for a verification letter</span>
                <button onClick={handleResend} className="border-1 rounded shadow-2xl m-3 bg-[var(--background-alpha)]"> Resend the Email</button >
            </div>
        )
    }
    if (user && user.emailVerification) {
        return (
            <p>Loading...</p>
        )
    }
    const navCss = `transition-all duration-1000 ease-in-out bg-[var(--navbar-background)] flex min-h-fit min-w-fit max-w-[1rem] py-8 px-3 items-center justify-items-center border-1 rounded-full absolute m-auto inset-y-0 justify-self-center`

    const navMedium = `md:overflow-hidden  md:items-center-safe flex-col  md:m-auto   md:opacity-100 md:inset-y-1/2 md:duration-2000 md:min-w-80 md:min-h-fit md:h-[30rem] md:justify-center md:py-0 md:px-0 md:max-w-[768px] `
    const h3Css = `md:h-full md:relative -ease-out md:transition-all md:overflow-hidden duration-1000 md:hover:animate-bounce`


    return (


        <main className="bg-[url('/images/fazingA.webp')] w-full h-[100vh] bg-cover">

            <div className={`${navCss} ${navMedium} shadow-2xl shadow-black`}>
                <h1>Register</h1>

                <fieldset>
                    <form onSubmit={handleRegistation} className="flex flex-col">
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
                    </form>

                </fieldset>
            </div>
        </main >
    );
};



export default RegistrationPage