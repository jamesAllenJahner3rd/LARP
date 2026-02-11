'use client'
import React from "react"
// The main page component that imports hooks and components above.

// Manages overall layout and conditional rendering based on isAdmin and loggedInUser.
function UserFunctions({
    targetUser,
    handleSessions, }
) {
    return (
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
    )
}
export default UserFunctions