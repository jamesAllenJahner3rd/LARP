"use client";
import React from 'react'
import { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { useAuth } from "@/app/providers/AuthProvider";


const CharacterPage = () => {
    const { user, logout } = useAuth();
    return (
        <><main>
            <span>Welcome </span>
        </main>
        </>
    )
}

export default CharacterPage 