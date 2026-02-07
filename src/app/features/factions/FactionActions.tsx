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
    setMemberEmail,//setters
    setNewTeamName,
    newTeamName }) {
    return (
        <div className="flex flex-col">
            <button onClick={() => createFaction(newTeamName)} className="btn">Create Faction</button>
            <input type="text" placeholder="New Fraction Name" onChange={(event) => setNewTeamName(event.target.value)} />

            <button onClick={() => createMembership()} className="btn">create-membership.md</button>
            <input type="email" onChange={(event) => setMemberEmail(event.target.value)} placeholder="New Memebers email" />


            <button onClick={() => deleteMembership()} className="btn">delete-membership.md</button>
            <button onClick={() => deleteTeam()} className="btn">delete.md</button>
            <button onClick={() => getMembership()} className="btn">get-membership.md</button>
            <button onClick={() => listMemberships()} className="btn">list-memberships.md</button>
            <button onClick={() => list()} className="btn">list.md</button>
            <button onClick={() => updateMembershipStatus()} className="btn">update-membership-status.md</button>
            <button onClick={() => updateMmbership()} className="btn">update-membership.md</button>
            <button onClick={() => updateName()} className="btn">update-name.md</button>
        </div>
    )
}
export default FactionActions