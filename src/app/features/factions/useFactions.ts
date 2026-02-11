"use client"
import { getAuthenticatedAccount, getClient } from "@/lib/appwrite";
import { Account, Client, ID, Teams, type Models } from "appwrite";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";


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
    }
    async function createFaction(teamname: string) {
        try {
            const result = await teamRef.current.create({
                teamId: ID.unique(),
                name: teamname,
            });
        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function deleteMembership(targetTeam: Models.Team, membershipId?) {
        try {
            const account = await getAuthenticatedAccount()
            const user = await account.get()
            if (membershipId.length === 0) {
                if (members) {
                    const myself = members.find((member) => member.userId === user.$id)
                    membershipId = myself.$id
                }
            }

            const result = await teamRef.current.deleteMembership({
                teamId: targetTeam,
                membershipId,
            });
        } catch (err) {
            console.error(err, " Failed to create a new faction.")
        }
    }
    async function deleteTeam(targetTeam: Models.Team) {
        try {
            const result = await teamRef.current.delete({
                teamId: targetTeam
            });

            toast.success(" Faction Deleted")

        } catch (err) {
            console.error(err, " Failed to create a new faction.")
            toast.error(" Faction failed to delete")
        }
    }
    async function getMembership(targetTeam: Models.Team, membershipId) {
        try {
            const result = await teamRef.current.getMembership({
                teamId: targetTeam,
                membershipId,
            });

            toast.success(" Faction Membership Found")

        } catch (err) {
            console.error(err, "  Faction Membership not Found.")
            toast.error("  Faction Membership not Found")
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
            toast.success(" Faction Memberships Found")

        } catch (err) {
            console.error(err, " Failed to get list of Memberships.")
            toast.error(" Faction Memberships not Found")

        }
    }
    async function list(queries: string[] = [], search: string = "", total: boolean = false) {
        try {
            const result = await teamRef.current.list({
                queries, // optional
                search, // optional
                total // optional
            });

            toast.success(" Faction list Found")

        } catch (err) {
            console.error(err, " Failed to get list of Factions.")
            toast.error(" Failed to get list of Factions")

        }
    }


    async function loadMembersForTeam(teamId: string) {
        try {
            const result = await teamRef.current.listMemberships({ teamId });
            const list = result.memberships || [];
            setMembers(list);

        } catch (err) {
            console.error(err, " Failed to list memberships.");
            toast.error(" Failed to get list of memberships")
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
            const roles = newRoles.trim().split(" ")
            const result = await teamRef.current.updateMembership({
                teamId: targetOwnedTeam,
                membershipId,
                roles,
            });
            toast.success(" Membership role updated")

        } catch (err) {
            console.error(err, "Failed to Update Membership Role.")
            toast.error(" Failed to Update Membership Role")

        }
    }
    async function updateName(targetTeam: Models.Team, name: string) {
        try {
            const result = await teamRef.current.updateName({
                teamId: targetTeam,
                name,
            });

            toast.success(" Faction Name Updated")

        } catch (err) {
            console.error(err, " Failed to Update Faction Name.")
            toast.error(" Failed to Update Faction Name.")
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