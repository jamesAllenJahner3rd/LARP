"use client"
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { getAuthenticatedAccount, getClient } from '@/lib/appwrite';
import { useAuth } from '@/app/providers/AuthProvider';
import { Models } from 'appwrite';
import { getMemberList } from '@/app/actions/settings/getMemberList';
import { getSessions } from '@/app/actions/settings/getSessions';
import useSettings from '@/app/features/settings/useSettings';
import MemberList from '@/app/features/settings/MemberList';
import SettingsForms from '@/app/features/settings/SettingsForms';
import SessionList from '@/app/features/settings/SessionList';
import UserFunctions from '@/app/features/settings/UserFunctions';

/**
 * UserSettingsPage
 *
 * Purpose:
 *   Allows authenticated users to update their email, password, or delete their account.
 *
 * Responsibilities:
 *   - Validate and submit email update requests
 *   - Validate and submit password update requests
 *   - Trigger account deletion via Appwrite
 *   - Display feedback using `react-toastify`
 *
 * Dependencies:
 *   - `useState` for form visibility and input tracking
 *   - `getAuthenticatedAccount()` from @/lib/appwrite for Appwrite session actions
 *   - `react-toastify` for user feedback
 *
 * Notes:
 *   - This is a `"use client"` component due to use of React hooks and Appwrite browser SDK.
 *   - All Appwrite interactions are scoped to user-triggered events—no SSR leakage.
 */

type Person =
    {
        $id: string;
        name: string;
        labels: string[];
        status: boolean;
        email: string;
    }

const settings = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [duplicatePassword, setDuplicatePassword] = useState("");
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [islabelsButtonPressed, setIslabelsButtonPressed] = useState: boolean(false)
    const {
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
    } = useSettings()

    return (
        <div className='flex w-full md:flex-row flex-col'>

            {isAdmin && loggedInUser &&
                <section className='w-full md:w-2/3 flex flew-col '>
                    <MemberList
                        memberList={memberList}
                        userSessions={userSessions}
                        targetUser={targetUser}
                        setUserSessions={setUserSessions}
                        setTargetUser={setTargetUser}
                    />
                    <UserFunctions
                        targetUser={targetUser}
                        handleSessions={handleSessions}
                        islabelsButtonPressed={islabelsButtonPressed}
                        setIslabelsButtonPressed={setIslabelsButtonPressed}
                    />
                </section>}

            {isAdmin && loggedInUser &&
                <section className='w-full h-3rem max-h-[30rem]  border-2 border-black rounded-2xl  md:w-1/2 justify-self-center flex flex-col my-2 md:mx-2 bg-neutral-400'>
                    <SessionList userSessions={userSessions} />
                    <
                        setIslabelsButtonPressed={setIslabelsButtonPressed} />
                </section>

            }
            <SettingsForms
                setPasswordFocus={setPasswordFocus}
                isAdmin={isAdmin}
                setShowEmailForm={setShowEmailForm}
                showEmailForm={showEmailForm}
                handleEmailUpdate={handleEmailUpdate}
                showPasswordForm={showPasswordForm}
                setShowPasswordForm={setShowPasswordForm}
                handlePasswordUpdate={handlePasswordUpdate}
                setCurrentPassword={setCurrentPassword}
                showDeletionForm={showDeletionForm}
                setShowDeletionForm={setShowDeletionForm}
                handleDeletionForm={handleDeletionForm}
            />
        </div >
    )
}

export default settings
