import React from "react";
import useSettings from "./useSettings";

function MemberList({
    memberList,
    userSessions,
    targetUser,
    setUserSessions,
    setTargetUser

}) {
    return (
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
    )
}
export default MemberList;