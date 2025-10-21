"use client";
import React from 'react'
import { useState } from "react";
import { account, ID } from "@/lib/appwrite";
import { useAuth } from "@/app/providers/AuthProvider";
import CharacterCreationPage from '../components/Create-Character';
import SlackPage from '../components/Slack';
import Link from 'next/link';

const MembersPage = () => {
    const { user, logout, isAdmin } = useAuth();
    return (

        <>test</>
    )

}

export default MembersPage

