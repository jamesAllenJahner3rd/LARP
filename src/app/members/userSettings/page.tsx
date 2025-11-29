"use client"
import { useState } from 'react';
import { toast } from "react-toastify"
import { getAuthenticatedAccount, getClient } from '@/lib/appwrite'

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


const settings = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [duplicatePassword, setDuplicatePassword] = useState("");
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showDeletionForm, setShowDeletionForm] = useState(false);

    const handleDeletionForm = async (event) => {
        event.preventDefault();
        const account = getAuthenticatedAccount();
        try {
            const user = await account.get()
            console.log(user)
            await account.updateStatus();
        } catch (error) {
            console.error(error, " Authentication errored -usersettings, page.tsx")
        }

    }
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
        <ol className='flex justify-center center-self flex-col'>
            <li><h1 className='h1 flex justify-center m-5 text-black'>User Settings Page</h1></li>
            <li onClick={() => setShowEmailForm(!showEmailForm)} className=' btn btn-secondary cursor-pointer' >Email address</li>
            {showEmailForm && <form
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
            </form>}
            <li onClick={() => setShowPasswordForm(!showPasswordForm)} className='btn btn-secondary'>Password change</li>
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
            <li><button className='btn btn-secondary' onClick={() => setShowDeletionForm(!showDeletionForm)}> Account deletion</button></li>{showDeletionForm && <form onSubmit={handleDeletionForm}><button type="submit" className='btn btn-secondary'>???Are you sure????</button></form>}
        </ol >
    )
}

export default settings