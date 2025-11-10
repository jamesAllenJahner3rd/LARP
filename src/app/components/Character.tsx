"use client";
import React from 'react'
import { useAuth } from "@/app/providers/AuthProvider";


const CharacterPage = () => {
    const { loggedInUser, logout } = useAuth();
    return (
        <><main>
            <span>Welcome </span>
        </main>
        </>
    )
}

export default CharacterPage 