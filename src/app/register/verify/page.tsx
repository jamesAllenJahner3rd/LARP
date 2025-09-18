"use client";

import { account } from "@/lib/appwrite";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const VerificationPage = () => {
    const router = useRouter()
    useEffect(() => {
        const verify = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const secret = urlParams.get('secret');
            const userId = urlParams.get('userId');
            if (userId && secret) {
                try {
                    const promise = await account.updateVerification({
                        userId,
                        secret
                    });
                    router.push("/members")
                } catch {
                    router.push("/register")

                }
            }
            else router.push("/register")
        }
        verify();
    }, [])
    return (
        <span>Verifying Email...</span>
    )

}
export default VerificationPage