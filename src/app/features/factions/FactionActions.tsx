"use client"
import React from "react";
// import { useFactions } from "@/src/app/features/factions/useFactions"
import useFactions from "./useFactions";


function FactionActions({ updateName,//functions
    updateMmbership,
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
    targetTeam }) {
    return (
        <div className="flex flex-col">
            <button onClick={() => createFaction(newTeamName)} className="btn">Create Faction</button>
            <input type="text" placeholder="New Faction Name" onChange={(event) => setNewTeamName(event.target.value)} />

            <button onClick={() => createMembership(targetOwnedTeam, memberEmail)} className="btn">create-membership.md</button>
            <input type="email" onChange={(event) => setMemberEmail(event.target.value)} placeholder="New Members email" />


            {/* <button onClick={() => deleteMembership(targetTeam,membershipId)} className="btn">delete-membership.md</button> */}
            <button onClick={() => deleteTeam(targetTeam)} className="btn">delete Team</button>
            {/* <button onClick={() => getMembership(targetTeam, membershipId)} className="btn">get-membership.md</button>*/}
            {/* <button onClick={() => listMemberships(targetTeam, queries, search, total)} className="btn">list-memberships.md</button> */}
            {/* <button onClick={() => list(queries: string[] = [], search: string = "", total: boolean = false)} className="btn">list.md</button> */}
            <button onClick={() => updateMembershipStatus()} className="btn">update-membership-status.md</button>
            {/* <button onClick={() => updateMembership(targetOwnedTeam, membershipId, newRoles)} className="btn">update-membership.md</button> */}
            <input type="text" placeholder="New Roles (Space separated) " onChange={(event) => setNewRoles(event.target.value)} />
            <button onClick={() => updateName(targetOwnedTeam, updateTeamName)} className="btn">update-name.md</button>
            <input type="text" placeholder="New Name for Faction " onChange={(event) => setUpdateTeamName(event.target.value)} />

        </div >
    )
}
export default FactionActions