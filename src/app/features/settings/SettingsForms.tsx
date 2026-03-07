import React from "react";
import useSettings from "./useSettings";
function SettingsForms({
    isAdmin,
    setShowEmailForm,
    showEmailForm,
    handleEmailUpdate,
    showPasswordForm,
    setShowPasswordForm,
    handlePasswordUpdate,
    setCurrentPassword,
    showDeletionForm,
    setShowDeletionForm,
    handleDeletionForm,
    setPasswordFocus
}) {
    return (
        <section className={`border-2 border-black rounded-2xl ${isAdmin ? " w-full md:w-1/3" : "w-full md:w-fit-content"} h-auto flex flex-col my-2 md:mx-2 bg-neutral-400  justify-center justify-self-center  center-self md:justify-start`}>
            <h1 className='h1 flex justify-center m-5 text-black'>User Settings Page</h1>
            <button
                className={` btn ${!showEmailForm ? "btn-primary" : "btn-accent"}  `}
                onClick={() => setShowEmailForm(!showEmailForm)}
            >Update Email address </button>
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
    )
}
export default SettingsForms;