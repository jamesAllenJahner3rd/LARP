"use client"
import { getAuthenticatedAccount, getClient } from "@/lib/appwrite";
import { Account, Client, ID, Teams, type Models } from "appwrite";
import React, { useEffect, useRef, useState } from "react";


function useFactions() {



    const [newTeamRole, setNewTeamRole] = useState<string>("")
    const [ownedTeams, setOwnedTeams] = useState<Models.Team[]>([])
    const [allTeams, setAllTeams] = useState<Models.Team[]>([])
    const [members, setMembers] = useState<any[]>([])

    const [selectedTeamIsOwned, setSelectedTeamIsOwned] = useState(false)


    const [targetOwnedTeam, setTargetOwnedTeam] = useState("")

    const clientRef = useRef(null);
    const teamRef = useRef(null)
    useEffect(() => {
        const client = getClient()

        clientRef.current = client;
        teamRef.current = new Teams(client);
    }, []);
    async function createMembership(targetOwnedTeam: Models.Team, memberEmail: string) {

        const result = await teamRef.current.createMembership({
            teamId: targetOwnedTeam,
            roles: ["member"],
            email: memberEmail, // optional
            url: process.env.NEXT_PUBLIC_ROOT_URL
        });

        console.log(result);
    }
    async function createFaction(teamname: string) {
        console.log(teamname, "creating faction")
        try {
            const result = await teamRef.current.create({
                teamId: ID.unique(),
                name: teamname,
            });

            console.log(result);
        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function deleteMembership(targetTeam: Models.Team, membershipId: string) {
        try {
            const result = await teamRef.current.deleteMembership({
                teamId: targetTeam,
                membershipId,
            });

            console.log(result);
        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function deleteTeam(targetTeam: Models.Team) {
        try {
            const result = await teamRef.current.delete({
                teamId: targetTeam
            });

            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function getMembership(targetTeam: Models.Team, membershipId) {
        try {
            const result = await teamRef.current.getMembership({
                teamId: targetTeam,
                membershipId,
            });

            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }

    async function listMemberships(targetTeam: Models.Team, queries: string[] = [], search: string = "", total: boolean = false) {
        try {
            const result = await teamRef.current.listMemberships({
                teamId: targetTeam,
                queries, // optional
                search, // optional
                total // optional
            });
            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function list(queries: string[] = [], search: string = "", total: boolean = false) {
        try {
            const result = await teamRef.current.list({
                queries, // optional
                search, // optional
                total // optional
            });

            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }


    async function loadMembersForTeam(teamId: string) {
        try {
            const result = await teamRef.current.listMemberships({ teamId });
            const list = result.memberships || [];
            console.dir(list)
            setMembers(list);
        } catch (err) {
            console.error(err, " Failed to list memberships.");
            setMembers([]);
        }
    }
    async function updateMembershipStatus() {
        try {

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    roles: []
    async function updateMembership(targetOwnedTeam: Models.Team, membershipId: string, newRoles: string = "") {
        try {
            const result = await teamRef.current.updateMembership({
                teamId: targetOwnedTeam,
                membershipId,
                roles: newRoles.trim().split(" ")
            });

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function updateName(targetTeam: Models.Team, name: string) {
        try {
            const result = await teamRef.current.updateName({
                teamId: targetTeam,
                name,
            });

            console.log(result);
        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }

    return ({
        updateName,//functions
        updateMembership,
        updateMembershipStatus,
        loadMembersForTeam,
        list,
        listMemberships,
        getMembership,
        deleteTeam,
        deleteMembership,
        createFaction,
        createMembership,
        newTeamRole,
        ownedTeams,
        allTeams,
        members,
        selectedTeamIsOwned,
        targetOwnedTeam,
        setTargetOwnedTeam, //setters
        setSelectedTeamIsOwned,
        setAllTeams,
        setOwnedTeams,





    })
}
export default useFactions