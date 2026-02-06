"use client"
import React, { useState } from "react";
import { Client, ID, Teams } from "appwrite";
function Factions() {


    const client = new Client();
    client
        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT) // Your API Endpoint
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID) // Your project ID
        ;
    const teams = new Teams(client);
    const [newTeamName, setNewTeamName] = useState<string>("")
    const [newTeamRole, setNewTeamRole] = useState<string>("")
    const [targetTeam, setTargetTeam] = useState()
    const [targetTeamName, setTargetTeamName] = useState<string>("")
    const [targetEmail, setTargetEmail] = useState<string>("")
    const [ownedTeams, setOwnedTeams] = useState([])
    const [allTeams, setAllTeams] = useState([])
    const [targetOwnedTeam, setTargetOwnedTeam] = useState("")
    const [memberEmail, setMemberEmail] = useState("")

    async function createMembership() {
        const result = await teams.createMembership({
            teamId: targetOwnedTeam,
            roles: ["member"],
            email: memberEmail, // optional
            userId: '<USER_ID>', // optional
            phone: '+12065550100', // optional
            url: 'https://example.com', // optional
            name: '<NAME>' // optional
        });

        console.log(result);
    }
    async function createFaction() {
        console.log(newTeamName)
        try {
            const result = await teams.create({
                teamId: ID.unique(),
                name: newTeamName,
            });

            console.log(result);
        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function deleteMembership() {
        try {

            const result = await teams.deleteMembership({
                teamId: targetTeam,
                membershipId: "" //???
            });

            console.log(result);
        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function deleteTeam() {
        try {
            const result = await teams.delete({
                teamId: targetTeam
            });

            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function getMembership() {
        try {

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }

    async function listMemberships() {
        try {
            const result = await teams.listMemberships({
                teamId: targetTeam,
            });

            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function list() {
        try {
            const result = await teams.list();

            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function updateMembershipStatus() {
        try {

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function updateMmbership() {
        try {
            const result = await teams.updateMembership({
                teamId: targetOwnedTeam,
                membershipId: '<MEMBERSHIP_ID>',
                roles: []
            });

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function updateName() {
        try {
            const result = await teams.updateName({
                teamId: targetTeam,
                name: targetTeamName
            });

            console.log(result);
        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }



    return (
        <>
            <div className="flex flex-col">
                <button onClick={() => createFaction()} className="btn">Create Faction</button>
                <input type="text" placeholder="New Fraction Name" onChange={(event) => setNewTeamName(event.target.value)} />
                <div>{newTeamName}</div>
                <button onClick={() => createMembership()} className="btn">create-membership.md</button>
                <button onClick={() => deleteMembership()} className="btn">delete-membership.md</button>
                <button onClick={() => deleteTeam()} className="btn">delete.md</button>
                <button onClick={() => getMembership()} className="btn">get-membership.md</button>
                <button onClick={() => listMemberships()} className="btn">list-memberships.md</button>
                <button onClick={() => list()} className="btn">list.md</button>
                <button onClick={() => updateMembershipStatus()} className="btn">update-membership-status.md</button>
                <button onClick={() => updateMmbership()} className="btn">update-membership.md</button>
                <button onClick={() => updateName()} className="btn">update-name.md</button>
            </div>
            <div>
                <ul>{ownedTeams}
                </ul>
                <ul>{allTeams}
                </ul>
            </div>
        </>
    )
}
export default Factions