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
        <div className='border-2 border-black rounded-2xl w-full justify-self-center flex flex-col my-2 md:mx-2 bg-neutral-400 pb-2'>
            <h5 className=" mx-5 ">(Pick One)</h5>
            <h2 className=" mx-5 mt-0 mb-2">Members:</h2>
            {selectedTeamId && (
                <div className="">

                    <div className="flex gap-2 justify-center flex-wrap">
                        {members.map((currentMember: any) => (
                            <button
                                key={currentMember.$id || currentMember.userId}
                                className={`btn btn-primary ${selectedMemberId === (currentMember.$id || currentMember.userId) ? "btn-accent" : "btn-primary"}`}
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
            )
            }
        </div >
    )
}
export default MemberList