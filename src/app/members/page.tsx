"use client";
import { useAuth } from "@/app/providers/AuthProvider";
import Image from "next/image";

const MembersPage = () => {

    const { loggedInUser, logout, isAdmin } = useAuth();
    return (

        <Image
            src="/images/instructions.webp"
            alt="Instructions"
            width={800}
            height={600}
        />

    )

}

export default MembersPage

