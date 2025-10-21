"use client"
import Form from 'next/form'
import React from 'react'
import { updateUserPassword } from '@/app/actions/settings/updatePassword'
import { updateUserEmail } from '@/app/actions/settings/updateEmail'
import { useState, useEffect } from 'react';
import { toast } from "react-toastify"
import { AppError } from "@/lib/errors/AppError";

const handleEmailForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)

    try {
        await updateUserEmail(formData)
        toast.success("Email updated successfully!");
    } catch (error) {
        if (error instanceof AppError) {
            toast.error(error.message);
        } else {
            toast.error("Unexpected error. Please try again")
        }
    }
}
const settings = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [duplicatePassword, setDuplicatePassword] = useState("");
    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [showEmailForm, setShowEmailForm] = useState(false);
    useEffect(() => {
        console.log("used")
        if (newPassword === currentPassword) toast.error("New password must be different from current password.");
        if (newPassword.trim() !== newPassword) toast.error("No leading or trailing spaces allowed.");
        if (newPassword.includes(" ")) toast.error("Passwords cannot contain spaces.");
        if (newPassword.length < 12) toast.error("Password must be at least 12 characters.");
        if (!/[A-Z]/.test(newPassword)) toast.error("Include at least one uppercase letter.");
        if (!/[a-z]/.test(newPassword)) toast.error("Include at least one lowercase letter.");
        if (!/\d/.test(newPassword)) toast.error("Include at least one number.");
        if (!/[\W_]/.test(newPassword)) toast.error("Include at least one symbol.");
    }
        , [currentPassword, newPassword, duplicatePassword]);


    return (
        <ol className='flex justify-center flex-col'>
            <li><h1 className='h1 flex justify-center m-5'>User Settings Page</h1></li>
            <li onClick={() => setShowEmailForm(!showEmailForm)} className=' btn btn-secondary cursor-pointer' >Email address</li>
            {showEmailForm && <Form
                action={updateUserEmail}
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
                        onChange={(e) => setNewEmail(e.target.value)} />
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
            </Form>}
            <li onClick={() => setShowPasswordForm(!showPasswordForm)} className='btn btn-secondary'>Password change</li>
            {showPasswordForm && <Form action={updateUserPassword} id='newPasswordForm'
                className='border-2 border-black rounded-2xl w-full  content-center self-center
                 md:w-fit flex flex-col  bg-neutral-500'>
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
            </Form>}
            <li className='btn btn-secondary'> Account deletion</li>
        </ol >
    )
}

export default settings