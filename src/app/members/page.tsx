"use client";
import { useAuth } from "@/app/providers/AuthProvider";

const MembersPage = () => {
    const { loggedInUser, logout, isAdmin } = useAuth();
    return (

        <>test</>
    )

}

export default MembersPage

