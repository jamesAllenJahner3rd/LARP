"use client"
import React from "react";
// import { useFactions } from "@/src/app/features/factions/useFactions"
import useFactions from "./useFactions";


function FactionActions({ updateName,//functions
    updateMembership,
    updateMembershipStatus,
    list,
    listMemberships,
    getMembership,
    deleteTeam,
    deleteMembership,
    createFaction,
    createMembership,
    setMemberEmail,
    memberEmail,
    setNewTeamName,
    newTeamName,
    targetOwnedTeam,
    setUpdateTeamName,
    updateTeamName,
    setNewRoles,
    newRoles,
    targetTeam,
    selectedMemberId,
    selectedTeamIsOwned
}) {
    console.log(selectedTeamIsOwned)
    console.dir(targetOwnedTeam)
    console.dir(targetTeam)
    return (
        <div className="flex flex-col md:mx-2 my-2">

            <fieldset className='border-2 border-black rounded-2xl w-full justify-self-center flex flex-col my-2 bg-neutral-400'>
                <h2 className="m-2"> Faction Options:</h2>
                <div className="flex items-center">
                    <input type="text" placeholder="New Faction Name" className="input h-12" onChange={(event) => setNewTeamName(event.target.value)} />
                    <button onClick={() => createFaction(newTeamName)} className="btn btn-secondary">Create Faction</button></div>
                {selectedTeamIsOwned && <div>
                    <div className="flex items-center">
                        <input
                            type="text"
                            className="input h-12"
                            placeholder="New Name for Faction"
                            onChange={(event) => setUpdateTeamName(event.target.value)}
                        />
                        <button onClick={() => updateName(targetOwnedTeam, updateTeamName)} className="btn btn-secondary"> Update Faction Name </button>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => deleteTeam(targetOwnedTeam)}
                            className="btn btn-secondary"
                        >
                            Delete Team
                        </button>
                    </div>
                </div>}
            </fieldset>

            <fieldset className='border-2 border-black rounded-2xl w-full justify-self-center flex flex-col my-2 bg-neutral-400'>
                <h2 className="m-2"> Member Options:</h2>
                <div className="flex items-center">
                    {selectedTeamIsOwned &&
                        <input
                            type="email"
                            className="input h-12"
                            onChange={(event) => setMemberEmail(event.target.value)}
                            placeholder="New Members email"
                        />
                    }
                    {selectedTeamIsOwned &&
                        <button
                            className="btn btn-secondary"
                            onClick={() => createMembership(targetOwnedTeam, memberEmail)}
                        >
                            Add New Member
                        </button>
                    }</div>

                {selectedTeamIsOwned && selectedMemberId && <div className="flex">
                    <div className="flex flex-col justify-center"> <input
                        type="text"
                        className="input h-12"
                        placeholder="New Roles"
                        onChange={(event) => setNewRoles(event.target.value)}
                    />
                        <span className="flex flex-col items-center">(Space separated)</span><span className="flex flex-col items-center"> Example: "owner member"</span>
                    </div>

                    <button onClick={() => updateMembership(targetOwnedTeam, selectedMemberId, newRoles)} className="btn btn-secondary">Update member Roles</button>
                </div>}
                {!selectedTeamIsOwned && targetTeam &&
                    <button
                        className="btn btn-secondary"
                        onClick={() => deleteMembership(targetTeam)}
                    >
                        Leave Faction

                    </button>
                }
                {selectedTeamIsOwned && selectedMemberId &&
                    <div className="flex justify-end">
                        <button
                            className="btn btn-secondary "
                            onClick={() => deleteMembership(targetOwnedTeam, selectedMemberId)}
                        >
                            Delete a Member
                        </button>
                    </div>
                }
            </fieldset >









            {/* <button onClick={() => getMembership(targetTeam, selectedMemberId)} className="btn btn-secondary">get-membership.md</button> */}
            {/* <button onClick={() => listMemberships(targetTeam, queries, search, total)} className="btn btn-secondary">list-memberships.md</button> */}
            {/* <button onClick={() => list(queries: string[] = [], search: string = "", total: boolean = false)} className="btn btn-secondary">list.md</button> */}
            {/* <button onClick={() => updateMembershipStatus()} className="btn btn-secondary">update-membership-status.md</button> */}
        </div >
    )
}
export default FactionActions