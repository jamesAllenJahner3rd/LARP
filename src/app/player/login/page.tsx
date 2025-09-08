"use client";
import { useEffect, useState } from "react";
import { account, ID } from "@/lib/appwrite";
import type { Models } from "appwrite";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
// export const revalidate = 0;

const LoginPage = () => {
    const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");

    // useEffect(() => {
    //     const checkSession = async () => {
    //         try {
    //             const user = await account.get();
    //             setLoggedInUser(user);
    //         } catch {
    //             setLoggedInUser(null);
    //         }
    //     };
    //     checkSession();
    // }, []);

    const login = async (email: string, password: string) => {
        if (!account) return;
        await account.createEmailPasswordSession(email, password);
        setLoggedInUser(await account.get());
    };

    const register = async () => {
        if (!account) return;
        await account.create(ID.unique(), email, password, name);
        await login(email, password);
    };

    const logout = async () => {
        if (!account) return;
        await account.deleteSession("current");
        setLoggedInUser(null);
    };
    const inputCSS = "bg-green-200 border-1 rounded";

    if (loggedInUser) {
        return (
            <div>
                <p>Logged in as {loggedInUser.name}</p>
                <button type="button" onClick={logout} className="btn btn-primary">
                    Logout
                </button>
            </div>
        );
    }

    return (
        <div className="border-black border-2 justify-center flex flex-col flex-1">
            <p>Not logged in</p>
            <form className="flex flex-col">
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    className={inputCSS}
                    autoComplete="email"
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    className={inputCSS}
                    autoComplete="password"
                />

                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    className={inputCSS}
                    autoComplete="name"
                />

                <button type="button" onClick={() => login(email, password)} className="btn btn-primary">
                    Login
                </button>
                <button type="button" onClick={register} className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default LoginPage;