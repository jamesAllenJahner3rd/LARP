"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { account } from "@/lib/appwrite";
import type { Models } from "appwrite";
import { useRouter } from "next/navigation";

type AuthContextType = {
    user: Models.User<Models.Preferences> | null;
    setUser: (user: Models.User<Models.Preferences> | null) => void;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const currentUser = await account.get();
                setUser(currentUser);
                if (currentUser && !currentUser.emailVerification) {
                    router.push("/register/");
                } else if (!currentUser) router.push("/login/");
            } catch {
                setUser(null);
            }
        };
        checkSession();
    }, [router]);

    const logout = async () => {
        await account.deleteSession("current");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};