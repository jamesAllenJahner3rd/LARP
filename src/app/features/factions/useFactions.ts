"use client"
import { getAuthenticatedAccount, getClient } from "@/lib/appwrite";
import { Account, Client, ID, Teams, type Models } from "appwrite";
import React, { useEffect, useRef, useState } from "react";


function useFactions() {



    const [newTeamRole, setNewTeamRole] = useState<string>("")
    const [targetTeam, setTargetTeam] = useState<string>("")
    const [targetTeamName, setTargetTeamName] = useState<string>("")
    const [targetEmail, setTargetEmail] = useState<string>("")
    const [ownedTeams, setOwnedTeams] = useState<Models.Team[]>([])
    const [allTeams, setAllTeams] = useState<Models.Team[]>([])
    const [members, setMembers] = useState<any[]>([])

    const [selectedTeamIsOwned, setSelectedTeamIsOwned] = useState(false)

    const [selectedMemberEmail, setSelectedMemberEmail] = useState<string | null>(null)
    const [targetOwnedTeam, setTargetOwnedTeam] = useState("")

    const clientRef = useRef(null);
    const teamRef = useRef(null)
    useEffect(() => {
        const client = getClient()

        clientRef.current = client;
        teamRef.current = new Teams(client);
    }, []);
    async function createMembership() {

        const result = await teamRef.current.createMembership({
            teamId: targetOwnedTeam,
            roles: ["member"],
            email: memberEmail, // optional
            url: process.env.NEXT_PUBLIC_ROOT_URL
        });

        console.log(result);
    }
    async function createFaction(teamname) {
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
    async function deleteMembership() {
        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
            const teams = new Teams(client);
            const account = new Account(client);
            const result = await teamRef.current.deleteMembership({
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
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
            const teams = new Teams(client);
            const account = new Account(client);
            const result = await teamRef.current.delete({
                teamId: targetTeam
            });

            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function getMembership() {
        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
            const teams = new Teams(client);
            const account = new Account(client);
            const result = await teamRef.current.getMembership({
                teamId: '<TEAM_ID>',
                membershipId: '<MEMBERSHIP_ID>'
            });

            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }

    async function listMemberships() {
        try {
            const client = new Client()
                .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
                .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);
            const teams = new Teams(client);
            const account = new Account(client);
            const result = await teamRef.current.listMemberships({
                teamId: targetTeam,
            });

            console.log(result);

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function list() {
        try {
            const result = await teamRef.current.list();

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
    async function updateMmbership() {
        try {
            const result = await teamRef.current.updateMembership({
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
            const result = await teamRef.current.updateName({
                teamId: targetTeam,
                name: targetTeamName
            });

            console.log(result);
        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }

    return ({
        updateName,//functions
        updateMmbership,
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
        targetTeam,
        targetTeamName,
        targetEmail,
        ownedTeams,
        allTeams,
        members,
        selectedTeamIsOwned,
        selectedMemberEmail,
        targetOwnedTeam,
        setTargetOwnedTeam, //setters
        setSelectedMemberEmail,
        setSelectedTeamIsOwned,
        setAllTeams,
        setOwnedTeams,
        setTargetEmail,
        setTargetTeam,





    })
}
export default useFactions