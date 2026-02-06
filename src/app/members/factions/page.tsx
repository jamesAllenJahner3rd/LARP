"use client"
import React, { useEffect, useState } from "react";
import { Client, ID, Teams, Account, Models } from "appwrite";
import { getClient, getAuthenticatedAccount } from "@/lib/appwrite";
function Factions() {


    const client = getClient();
    const teams = new Teams(client);
    const account = getAuthenticatedAccount();
    const [newTeamName, setNewTeamName] = useState<string>("")
    const [newTeamRole, setNewTeamRole] = useState<string>("")
    const [targetTeam, setTargetTeam] = useState<string>("")
    const [targetTeamName, setTargetTeamName] = useState<string>("")
    const [targetEmail, setTargetEmail] = useState<string>("")
    const [ownedTeams, setOwnedTeams] = useState<Models.Team[]>([])
    const [allTeams, setAllTeams] = useState<Models.Team[]>([])
    const [members, setMembers] = useState<any[]>([])
    const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null)
    const [selectedTeamIsOwned, setSelectedTeamIsOwned] = useState(false)
    const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null)
    const [selectedMemberEmail, setSelectedMemberEmail] = useState<string | null>(null)
    const [targetOwnedTeam, setTargetOwnedTeam] = useState("")
    const [memberEmail, setMemberEmail] = useState("")

    async function createMembership() {
        const result = await teams.createMembership({
            teamId: targetOwnedTeam,
            roles: ["member"],
            email: memberEmail, // optional
            url: process.env.NEXT_PUBLIC_ROOT_URL
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
            const result = await teams.getMembership({
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

    async function loadMembersForTeam(teamId: string) {
        try {
            const result = await teams.listMemberships({ teamId });
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

                <button onClick={() => createMembership()} className="btn">create-membership.md</button>
                <input type="email" onChange={(event) => setMemberEmail(event.target.value)} />
                <button onClick={() => deleteMembership()} className="btn">delete-membership.md</button>
                <button onClick={() => deleteTeam()} className="btn">delete.md</button>
                <button onClick={() => getMembership()} className="btn">get-membership.md</button>
                <button onClick={() => listMemberships()} className="btn">list-memberships.md</button>
                <button onClick={() => list()} className="btn">list.md</button>
                <button onClick={() => updateMembershipStatus()} className="btn">update-membership-status.md</button>
                <button onClick={() => updateMmbership()} className="btn">update-membership.md</button>
                <button onClick={() => updateName()} className="btn">update-name.md</button>
            </div>
            <div className="mt-4">
                <div className="mb-2">Owned Factions</div>
                <div className="flex gap-2 flex-wrap">
                    {ownedTeams.map((currentTeam) => (
                        <button
                            key={currentTeam.$id}
                            className={`btn ${selectedTeamId === currentTeam.$id ? "btn-primary" : ""}`}
                            onClick={() => {
                                setSelectedTeamId(currentTeam.$id);
                                setSelectedTeamIsOwned(true);
                                setTargetTeam(currentTeam.$id);
                                setTargetOwnedTeam(currentTeam.$id);
                                loadMembersForTeam(currentTeam.$id);
                            }}
                        >
                            {currentTeam.name}
                        </button>
                    ))}
                </div>

                <div className="mt-4 mb-2">Other Factions</div>
                <div className="flex gap-2 flex-wrap">
                    {allTeams.map((currentTeam) => (
                        <button
                            key={currentTeam.$id}
                            className={`btn ${selectedTeamId === currentTeam.$id ? "btn-secondary" : ""}`}
                            onClick={() => {
                                setSelectedTeamId(currentTeam.$id);
                                setSelectedTeamIsOwned(false);
                                setTargetTeam(currentTeam.$id);
                                loadMembersForTeam(currentTeam.$id);
                            }}
                        >
                            {currentTeam.name}
                        </button>
                    ))}
                </div>

                {selectedTeamId && (
                    <div className="mt-4">
                        <div className="mb-2">Members</div>
                        <div className="flex gap-2 flex-wrap">
                            {members.map((currentMember: any) => (
                                <button
                                    key={currentMember.$id || currentMember.userId}
                                    className={`btn ${selectedMemberId === (currentMember.$id || currentMember.userId) ? "btn-accent" : ""}`}
                                    onClick={() => {
                                        setSelectedMemberId(currentMember.$id || currentMember.userId);
                                        setSelectedMemberEmail(currentMember.email || currentMember.name || null);
                                        setTargetEmail(currentMember.email || "");
                                        if (selectedTeamIsOwned) {
                                            setTargetOwnedTeam(selectedTeamId || "");
                                        }
                                    }}
                                >
                                    {currentMember.userName || currentMember.email || currentMember.userId}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}
export default Factions