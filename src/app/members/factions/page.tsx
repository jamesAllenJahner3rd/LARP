"use client"

import React, { useEffect, useState } from "react";
export const dynamic = "force-dynamic";
import useFactions from "@/app/features/factions/useFactions"
import { Client, ID, Teams, Account, Models } from "appwrite";
import { getClient, getAuthenticatedAccount } from "@/lib/appwrite";
import FactionActions from "@/app/features/factions/FactionActions";
import FactionList from "@/app/features/factions/FactionList";
import MemberList from "@/app/features/factions/MemberList"; const account = getAuthenticatedAccount()
const client = getClient()

const teams = new Teams(client);
function Factions() {




    const [newTeamName, setNewTeamName] = useState<string>("")/////////
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null)//////////
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)/////

    const [selectedMemberEmail, setSelectedMemberEmail] = useState<string | null>(null)/////
    const [memberEmail, setMemberEmail] = useState("")//////////
    const [targetTeam, setTargetTeam] = useState<string>("")
    const [targetTeamName, setTargetTeamName] = useState<string>("")
    const [targetEmail, setTargetEmail] = useState<string>("")
    const [updateTeamName, setUpdateTeamName] = useState<string>("")
    const [newRoles, setNewRoles] = useState("")
    const [myID, setMyID] = useState("")

    const {
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

        newTeamRole,// states
        ownedTeams,
        allTeams,
        members,
        selectedTeamIsOwned,
        targetOwnedTeam,
        setTargetOwnedTeam, //setters
        setSelectedTeamIsOwned,
        setAllTeams,
        setOwnedTeams,
    } = useFactions()

    // load teams on mount and split owned vs other based on membership role
    useEffect(() => {
        let mounted = true;
        async function load() {
            try {
                const me = await account.get();
                const result = await teams.list();
                const all: Models.Team[] = result.teams || [];

                const owned: Models.Team[] = [];
                const other: Models.Team[] = [];

                await Promise.all(all.map(async (currentTeam) => {
                    try {
                        const response = await teams.listMemberships({ teamId: currentTeam.$id });
                        const membership = (response.memberships || []).find((aMember: any) => aMember.userId === me.$id);
                        if (membership && membership.roles && membership.roles.includes("owner")) {
                            owned.push(currentTeam);
                        } else {
                            other.push(currentTeam);
                        }
                    } catch (err) {
                        other.push(currentTeam);
                    }
                }));

                if (!mounted) return;
                setOwnedTeams(owned);
                setAllTeams(other);
            } catch (err) {
                console.error("Failed loading teams", err);
            }
        }
        load();
        return () => { mounted = false };
    }, [])




    return (
        <section className="flex flex-col"> <h1 className='h1 flex justify-center m-5 text-black'>Character Creation</h1>
            <section className="flex md:flex-row flex-col">
                <FactionActions
                    updateName={updateName}
                    updateMembership={updateMembership}
                    updateMembershipStatus={updateMembershipStatus}
                    list={list}
                    listMemberships={listMemberships}
                    getMembership={getMembership}
                    deleteTeam={deleteTeam}
                    deleteMembership={deleteMembership}
                    createFaction={createFaction}
                    createMembership={createMembership}
                    setMemberEmail={setMemberEmail}
                    memberEmail={memberEmail}
                    setNewTeamName={setNewTeamName}
                    newTeamName={newTeamName}
                    targetOwnedTeam={targetOwnedTeam}
                    setUpdateTeamName={setUpdateTeamName}
                    updateTeamName={updateTeamName}
                    setNewRoles={setNewRoles}
                    newRoles={newRoles}
                    targetTeam={targetTeam}
                    selectedMemberId={selectedMemberId}

                    selectedTeamIsOwned={selectedTeamIsOwned}
                />


                <FactionList
                    ownedTeams={ownedTeams}
                    allTeams={allTeams}
                    selectedTeamId={selectedTeamId}
                    setSelectedTeamId={setSelectedTeamId}
                    setSelectedTeamIsOwned={setSelectedTeamIsOwned}
                    setTargetTeam={setTargetTeam}
                    setTargetOwnedTeam={setTargetOwnedTeam}
                    loadMembersForTeam={loadMembersForTeam}
                    setSelectedMemberId={setSelectedMemberId}
                />

                <MemberList


                    selectedTeamId={selectedTeamId}
                    members={members}
                    selectedMemberId={selectedMemberId}
                    setSelectedMemberId={setSelectedMemberId}
                    setSelectedMemberEmail={setSelectedMemberEmail}
                    setTargetEmail={setTargetEmail}
                    selectedTeamIsOwned={selectedTeamIsOwned}
                    setTargetOwnedTeam={setTargetOwnedTeam}
                />

            </section>
        </section>
    )
}
export default Factions