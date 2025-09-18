"use client";
import React from 'react'
import { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { useAuth } from "@/app/providers/AuthProvider";


const MembersPage = () => {
    const { user, logout } = useAuth();
    return (<><main className='bg-cover h-[100vh] bg-bottom w-full bg-[url("/images/town-bg-vertical.webp")]'>
        <span>look at me </span>
        <p>test</p>
        <p>test</p>
    </main>
    </>)

}

export default MembersPage 
