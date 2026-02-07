"use client"
import React from "react";

function FactionList({
    ownedTeams,
    allTeams,
    selectedTeamId,
    setSelectedTeamId,
    setSelectedTeamIsOwned,
    setTargetTeam,
    setTargetOwnedTeam,
    loadMembersForTeam

}) {
    return (
        <>
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

        </>
    )
}
export default FactionList