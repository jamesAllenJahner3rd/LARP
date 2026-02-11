"use client"
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { getAuthenticatedAccount, getClient } from '@/lib/appwrite';
import { useAuth } from '@/app/providers/AuthProvider';
import { Models } from 'appwrite';
import { getMemberList } from '@/app/actions/settings/getMemberList';
import { getSessions } from '@/app/actions/settings/getSessions';


type Person = {
    $id: string;
    name: string;
    labels: string[];
    status: boolean;
    email: string;
}

function useSettings() {
    const [showDeletionForm, setShowDeletionForm] = useState(false);
    const { isAdmin, loggedInUser } = useAuth();
    const [memberList, setMemberList] = useState<Person[]>([]);

    const [targetUser, setTargetUser] = useState<Person | null>({
        $id: "",
        name: "",
        labels: [],
        status: false,
        email: "",
    })
    const [userSessions, setUserSessions] = useState<Models.SessionList | null>(null)

    const handleDeletionForm = async (event) => {
        event.preventDefault();
        const account = getAuthenticatedAccount();
        try {
            const user = await account.get()
            await account.updateStatus();
        } catch (error) {
            console.error(error, " Authentication errored -usersettings, page.tsx")
        }

    }
    function normalizeString(input: string): string {
        if (!input) return "";

        return input
            .trim()                                        // 1. Remove leading/trailing spaces
            .normalize("NFKD")                             // 2. Decompose combined characters
            .replace(/\p{Diacritic}/gu, "")                // 3. Strip accents (diacritics)
            .toLowerCase()                                 // 4. Standardize casing
            .replace(/\s+/g, " ")                          // 5. Collapse multiple spaces into one
        // .replace(/[^a-z0-9 ]/g, "");                   // 6. Optional: Remove special characters
    }
    const handleSessions = async (userId: string) => {
        try {
            const normyString = normalizeString(userId)
            const response = await getSessions(normyString)
            setUserSessions(response)
        } catch (error) { console.error(error, "Didn't find the sessions.") }
    }
    useEffect(() => {
        if (isAdmin && loggedInUser) {
            (async () => {
                const response = await getMemberList();
                setMemberList(() => response.users.map((person) => {
                    return ({
                        $id: person.$id,
                        name: person.name,
                        labels: person.labels,
                        status: person.status,
                        email: person.email,
                    })
                }))
            })()
        }
    }, [])

    const handleEmailUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newEmail = (formData.get("newEmail") as string).trim();
        const duplicateEmail = (formData.get("duplicateEmail") as string).trim()
        if (newEmail.trim() !== duplicateEmail.trim()) return toast.error("New email must match the Confirmation email.");
        const password = formData.get("password") as string;
        try {
            const account = getAuthenticatedAccount()
            await account.updateEmail(newEmail, password);
        } catch (error) {
            if (error?.message) toast.error(error.message);
            console.error("Update Failed:", error);
        }

    };
    const handlePasswordUpdate = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const password = formData.get("newPassword") as string;
        const duplicatePassword = formData.get("duplicatePassword") as string;
        const oldPassword = formData.get("currentPassword") as string;
        if (password === oldPassword) return toast.error("New password must be different from current password.");
        if (password !== duplicatePassword) return toast.error("New password must be the same as the Confirmation password.");
        if (password.trim() !== password) return toast.error("No leading or trailing spaces allowed.");
        if (password.includes(" ")) return toast.error("Passwords cannot contain spaces.");
        if (password.length < 12) return toast.error("Password must be at least 12 characters.");
        if (!/[A-Z]/.test(password)) return toast.error("Include at least one uppercase letter.");
        if (!/[a-z]/.test(password)) return toast.error("Include at least one lowercase letter.");
        if (!/\d/.test(password)) return toast.error("Include at least one number.");
        if (!/[\W_]/.test(password)) return toast.error("Include at least one symbol.");
        try {
            const account = getAuthenticatedAccount()
            await account.updatePassword(password, oldPassword);
        } catch (error) {
            if (error?.message) toast.error(error.message);
            console.error("Update Failed:", error);
        }

    }
    return ({
        showDeletionForm,
        setShowDeletionForm,
        isAdmin,
        loggedInUser,
        memberList,
        setMemberList,
        targetUser,
        setTargetUser,
        userSessions,
        setUserSessions,
        handleDeletionForm,
        normalizeString,
        handleSessions,
        handleEmailUpdate,
        handlePasswordUpdate
    })


}
export default useSettings