"use client"
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import { getAuthenticatedAccount, getClient } from '@/lib/appwrite';
import { useAuth } from '@/app/providers/AuthProvider';
import { Models } from 'appwrite';
import { getMemberList } from '@/app/actions/settings/getMemberList';
import { getSessions } from '@/app/actions/settings/getSessions';
import { normalize } from 'path';
// import { } from "appwrite";

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
type Person = {
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

    return (
        <div className='flex w-full md:flex-row flex-col'>

            {isAdmin && loggedInUser &&
                <section className='w-full md:w-2/3 flex flew-col '>
                    <div className='border-2 border-black rounded-2xl w-full md:w-1/2 justify-self-center flex flex-col my-2 md:mx-2 bg-neutral-400'>
                        <h5 className=" mx-5 mt-4 mb-0 w-full">(Pick One)</h5>
                        <h2 className=" mx-5 mt-0 mb-2 w-full">Members List</h2>
                        <ul className="flex gap-2 flex-col flex-wrap justify-center w-full">
                            {memberList.length > 0 && memberList.map((user) => (
                                <li key={user.$id}>
                                    <button
                                        className={`btn ${targetUser.$id !== user.$id ? "btn-primary" : "btn-accent"}`}
                                        onClick={(event) => {
                                            if (userSessions !== null) setUserSessions(null);
                                            setTargetUser(() => {
                                                return ({
                                                    $id: user.$id,
                                                    name: user.name,
                                                    labels: user.labels,
                                                    status: user.status,
                                                    email: user.email,
                                                })
                                            })
                                        }}
                                    >{user.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div >
                    <div className='border-2 border-black rounded-2xl w-full md:w-1/2 justify-self-center   flex flex-col my-2 md:mx-2 bg-neutral-400'>
                        <h5 className=" mx-5 mt-4 mb-0">(Pick One)</h5>
                        <h2 className=" mx-5 mt-0 mb-2">Task</h2>
                        {targetUser.$id && <fieldset>
                            <button
                                className="btn btn-secondary"
                                onClick={() => handleSessions(targetUser.$id)}
                            >listSessions
                            </button>
                            <button
                                className="btn btn-secondary"
                            // onClick={() => updateLabels()}
                            >updateLabels
                            </button>
                            <button
                                className="btn btn-secondary"
                            // onClick={() => updatePassword()}
                            >updatePassword
                            </button>
                            <button
                                className="btn btn-secondary"
                            // onClick={() => updateName()}
                            >updateName
                            </button>
                            <button
                                className="btn btn-secondary"
                            // onClick={() => updateEmail()}
                            >updateEmail
                            </button>
                            <button
                                className="btn btn-secondary"
                            // onClick={() => listSessions()}
                            >listSessions
                            </button>
                        </fieldset>}
                    </div>
                </section>}
            {isAdmin && loggedInUser && <section className='w-full h-3rem max-h-[30rem]  border-2 border-black rounded-2xl  md:w-1/2 justify-self-center flex flex-col my-2 md:mx-2 bg-neutral-400'>
                <div className='overflow-y-scroll flex-row rounded-t-2xl'>
                    {userSessions && userSessions.sessions.map((session) => (
                        <div key={session.$createdAt} >
                            <div className='flex bg-neutral-300 justify-between'>
                                <span className='font-bold mx-2'> $id:</span>
                                <span className='flex '> {session.$id}</span></div>
                            <div className='flex justify-between'>
                                <span className='font-bold mx-2'> userId:</span>
                                <span> {session.userId}</span>
                            </div>
                            <div className='flex bg-neutral-300 justify-between'>
                                <span className='font-bold mx-2 '> expire:</span>
                                <span className='flex '> {session.expire}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-bold mx-2 justify-start'> ip:</span>
                                <span className='flex '> {session.ip}</span>
                            </div>
                            <div className='flex bg-neutral-300 justify-between'>
                                <span className='font-bold mx-2 justify-start'> osName:</span>
                                <span className='flex '> {session.osName}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-bold mx-2 justify-start'> clientName:</span>
                                <span className='flex '> {session.clientName}</span>
                            </div>
                            <div className='flex bg-neutral-300 justify-between'>
                                <span className='font-bold mx-2 justify-start'> countryName:</span>
                                <span className='flex '> {session.countryName}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-bold mx-2 justify-start'> current:</span>
                                <span className='flex '> {session.current}</span>
                            </div>
                            <div className='flex bg-neutral-300 justify-between'>
                                <span className='font-bold mx-2 justify-start'> provider:</span>
                                <span className='flex '> {session.provider}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-bold mx-2 justify-start'> deviceBrand:</span>
                                <span className='flex '> {session.deviceBrand}</span>
                            </div>
                            <div className='flex bg-neutral-300 justify-between'>
                                <span className='font-bold mx-2 justify-start'> deviceModel:</span>
                                <span className='flex '> {session.deviceModel}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='font-bold mx-2 justify-start'> mfaUpdatedAt:</span>
                                <span className='flex '> {session.mfaUpdatedAt}</span></div>
                        </div>

                    ))}</div>
            </section>

            }
            <section className={`border-2 border-black rounded-2xl ${isAdmin ? " w-full md:w-1/3" : "w-full md:w-fit-content"} h-auto flex md:flex-row flex-col my-2 md:mx-2 bg-neutral-400  justify-center justify-self-center  center-self`}>
                <h1 className='h1 flex justify-center m-5 text-black'>User Settings Page</h1>
                <button
                    className={` btn ${!showEmailForm ? "btn-primary" : "btn-accent"}  `}
                    onClick={() => setShowEmailForm(!showEmailForm)}
                >Update Email address</button>
                {
                    showEmailForm && <form
                        onSubmit={handleEmailUpdate}
                        autoComplete='off'
                        id='newEmailForm'
                        className='border-2 border-black rounded-2xl w-full  content-center self-center md:w-[20rem] flex flex-col  bg-neutral-500'
                    >
                        <div className='flex justify-between'>
                            <label htmlFor='newEmail' >New Email:</label>
                            <input
                                type="email"
                                name='newEmail'
                                required
                                autoComplete='off'
                                className='text-black border-2 border-black rounded-2xl px-2 bg-white m-2'
                            // onChange={(e) => setNewEmail(e.target.value)} 
                            />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='duplicateEmail' >Confirm Email:</label>
                            <input type="email" name='duplicateEmail' required autoComplete='off' className='text-black border-2 border-black rounded-2xl px-2 bg-white m-2' />

                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor='password' >Password:</label>
                            <input type="password" name='password' autoComplete='password' required className='text-black border-2 border-black rounded-2xl px-2 bg-white m-2' />
                        </div>
                        <button type='submit' className='btn btn-secondary'>
                            Update Email
                        </button>
                    </form>
                }
                <button
                    className={` btn ${!showPasswordForm ? "btn-primary" : "btn-accent"}  `}
                    onClick={() => setShowPasswordForm(!showPasswordForm)}
                >Update Password </button>
                {
                    showPasswordForm && <form
                        onSubmit={handlePasswordUpdate}
                        onFocus={() => setPasswordFocus(true)}
                        id='newPasswordForm'
                        className='border-2 border-black rounded-2xl w-full  content-center self-center                md:w-fit flex flex-col  bg-neutral-500'
                    >
                        <div className='flex justify-between'><label htmlFor="currentPassword" className='ml-2'>Current Password:</label>
                            <input type="password"
                                name="currentPassword"
                                className='text-black border-2 border-black rounded-2xl px-2 bg-white m-2'
                                placeholder='Enter current password.'
                                autoComplete='password'
                                required
                                onChange={(e) => setCurrentPassword(e.target.value)}

                            />
                        </div>
                        <div className='flex justify-between'><label htmlFor="newPassword" className='ml-2'>New Password:</label>
                            <input type="password" name="newPassword" className='text-black m-2 border-2 border-black rounded-2xl px-2 bg-white' placeholder='Enter new password.' required />
                        </div>
                        <div className='flex justify-between'>
                            <label htmlFor="duplicatePassword" className='ml-2'>New Password:</label>
                            <input type="password" name="duplicatePassword" className='text-black m-2 border-2 border-black rounded-2xl px-2 bg-white' placeholder='Enter new password.' required />
                        </div>
                        <button className='btn btn-secondary'>
                            Update Password
                        </button>
                    </form>
                }
                <button
                    className={` btn ${!showDeletionForm ? "btn-primary" : "btn-accent"}  `}
                    onClick={() => setShowDeletionForm(!showDeletionForm)}> Account deletion
                </button>
                {showDeletionForm && <form onSubmit={handleDeletionForm}><button type="submit" className='btn btn-secondary'>???Are you sure????</button></form>}
            </section >
        </div >
    )
}

export default settings