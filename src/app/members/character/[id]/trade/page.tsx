"use client"
import { useAuth } from "@/app/providers/AuthProvider";

/**
 * TradingPage
 *
 * Purpose:
 *   Scaffolds the character trading interface for authenticated users.
 *
 * Responsibilities:
 *   - Access the logged-in user context via `useAuth()`
 *   - Render a placeholder UI for future trading features
 *
 * Dependencies:
 *   - `useAuth()` from AuthProvider
 *
 * Notes:
 *   - This is a client-only component (`"use client"`) due to use of React hooks.
 *   - Trading logic and UI will be implemented in future iterations.
 */

const TradingPage = () => {
    const { loggedInUser, logout } = useAuth();
    return (
        <main>
            <span>Welcome </span>
        </main>
    )
}

export default TradingPage