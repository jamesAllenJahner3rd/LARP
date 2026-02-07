"use client"

import React from "react";

function MemberList({
    selectedTeamId,
    members,
    selectedMemberId,
    setSelectedMemberId,
    setSelectedMemberEmail,
    setTargetEmail,
    selectedTeamIsOwned,
    setTargetOwnedTeam }

) {

    return (
        <>
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
        </>
    )
}
export default MemberList