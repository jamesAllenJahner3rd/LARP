"use client";
import React from 'react'
import { useState } from "react";
import { getAuthenticatedAccount } from "@/lib/appwrite";
import { useAuth } from "@/app/providers/AuthProvider";


const TradingPage = () => {
    const { loggedInUser, logout } = useAuth();
    return (
        <><main>
            <span>Welcome </span>
        </main>
        </>
    )
}

export default TradingPage