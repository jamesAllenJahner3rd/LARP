"use client";
import React from 'react'
import { useState } from "react";
import { useAuth } from "@/app/providers/AuthProvider";



const CharacterCreationPage = () => {
    const { loggedInUser, logout } = useAuth();
    return (
        <><main>
            <span>Welcome </span>
        </main>
        </>
    )
}

export default CharacterCreationPage