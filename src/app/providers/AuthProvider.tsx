"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuthenticatedAccount } from "@/lib/appwrite";
import type { Models } from "appwrite";
import { useRouter } from "next/navigation";
import {

} from "@/app/providers/AuthProvider";

type AuthContextType = {
    loggedInUser: Models.User<Models.Preferences> | null;
    setLoggedInUser: (user: Models.User<Models.Preferences> | null) => void;
    logout: () => Promise<void>;
    isAdmin: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [loggedInUser, setLoggedInUser] = useState<Models.User<Models.Preferences> | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const account = await getAuthenticatedAccount()
                const currentUser = await account.get();
                console.log("authProvider currentUser:", currentUser)
                setIsAdmin(currentUser.labels.includes("admin"))
                setLoggedInUser(currentUser);
                if (currentUser && !currentUser.emailVerification) {
                    router.push("/register/");
                } else if (!currentUser) router.push("/login/");

            } catch {
                setLoggedInUser(null);
            }
        };
        checkSession();
    }, [router]);

    const logout = async () => {
        if (typeof window === 'undefined') return;

        try {
            const { getAuthenticatedAccount } = await import('@/lib/appwrite');
            const account = await getAuthenticatedAccount();
            await account.deleteSession("current");
            setLoggedInUser(null);
        } catch (error) {
            console.error(error, Authentication, delete session failed, AuthProvider.tsx)
        }
    };

    return (
        <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logout, isAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};