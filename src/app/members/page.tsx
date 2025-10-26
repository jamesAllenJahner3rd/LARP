"use client";
import React from 'react'
import { useState } from "react";
import { getAuthenticatedAccount } from "@/lib/appwrite";
import { ID } from "appwrite";
import { useAuth } from "@/app/providers/AuthProvider";
import CharacterCreationPage from '../components/Create-Character';
import SlackPage from '../components/Slack';
import Link from 'next/link';

const MembersPage = () => {
    const { loggedInUser, logout, isAdmin } = useAuth();
    return (

        <>test</>
    )

}

export default MembersPage

