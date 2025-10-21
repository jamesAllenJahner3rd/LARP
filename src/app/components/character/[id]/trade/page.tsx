"use client";
import React from 'react'
import { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { useAuth } from "@/app/providers/AuthProvider";


const TradingPage = () => {
    const { user, logout } = useAuth();
    return (
        <><main>
            <span>Welcome </span>
        </main>
        </>
    )
}

export default TradingPage