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
    loadMembersForTeam,
    setSelectedMemberId

}) {
    return (
        <div className='border-2 border-black rounded-2xl w-full justify-self-center   flex flex-col my-2 md:mx-2 bg-neutral-400'>
            <h5 className=" mx-5 mt-4 mb-0">(Pick One)</h5>
            <h2 className=" mx-5 mt-0 mb-2">Owned Factions</h2>
            <div className="flex gap-2 flex-wrap justify-center">
                {ownedTeams.map((currentTeam) => (
                    <button
                        key={currentTeam.$id}
                        className={`btn ${selectedTeamId === currentTeam.$id ? "btn-accent" : "btn-primary"}`}
                        onClick={() => {
                            setSelectedTeamId(currentTeam.$id);
                            setSelectedTeamIsOwned(true);
                            setTargetTeam(currentTeam.$id);
                            setTargetOwnedTeam(currentTeam.$id);
                            loadMembersForTeam(currentTeam.$id);
                            setSelectedMemberId(null);

                        }}
                    >
                        {currentTeam.name}
                    </button>
                ))}
            </div>

            <h2 className=" mx-5 mt-4 mb-2">Other Factions</h2>
            <div className="flex gap-2 flex-wrap justify-center">
                {allTeams.map((currentTeam) => (
                    <button
                        key={currentTeam.$id}
                        className={`btn-secondary ${selectedTeamId === currentTeam.$id ? "btn-accent" : "btn-primary"}`}
                        onClick={() => {
                            setTargetOwnedTeam("currentTeam.$id");
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

        </div>
    )
}
export default FactionList