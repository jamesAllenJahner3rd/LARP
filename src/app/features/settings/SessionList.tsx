'use client'
import React, { Dispatch } from "react"
import { Models } from "appwrite";
//Displays the user sessions list UI.

// Receives userSessions as props.
type Props = {
    userSessions: Models.SessionList;
    setIslabelsButtonPressed: React.Dispatch<React.SetStateAction<boolean>>;
};
function SessionListings({
    userSessions,
    setIslabelsButtonPressed }: Props


) {
    return (
        <div className='overflow-y-scroll flex-row rounded-t-2xl'>
            {userSessions && userSessions.sessions && userSessions.sessions.length !== 0 && userSessions.sessions.map((session) => (
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

            ))}
        </div>
    )
}
export default SessionListings