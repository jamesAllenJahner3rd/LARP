"use client";
import React from 'react'
import { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { useAuth } from "@/app/providers/AuthProvider";


const MembersPage = () => {
    const { user, logout, isAdmin } = useAuth();
    return (<><main className='bg-cover h-[100vh] bg-bottom w-full bg-[url("/images/town-bg-vertical.webp")]'>
        <span>Account settings</span>
        <span>Create Character</span>
        <span>Characters</span>
        <span>Factions</span>
        <span>Slack</span>
        <span>Events</span>
        <span>Admin Tools</span>
    </main>
    </>)

}

export default MembersPage 
