import { useAuth, useUser } from "@clerk/clerk-expo";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { checkUserExists, addUser } from "../../utils/supabaseOperation";
export default function Home() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    const { isSignedIn, user } = useUser();
    const check = async () => {
        const supabaseAccessToken = await getToken({ template: "supabase" });
        // Check if user exists in Supabase
        const exists = await checkUserExists(userId!, supabaseAccessToken!);
        // If user does not exist in Supabase, add them
        if (!exists) {
            await addUser(userId!, supabaseAccessToken!);
        }
    }
    useEffect(() => {
        if (isSignedIn) {
            check();
        }
    }, [isSignedIn]);

    // In case the user signs out while on the page.
    if (!isLoaded || !userId) {
        return null;
    }

    return (
        <>
            <Text>
                Hello,</Text>
            <Text> {userId} </Text>
            <Text>
                your current active session is</Text>
            <Text>
                {sessionId}
            </Text>

            <Text>Hello, {user?.firstName} {user?.lastName} welcome to Clerk</Text>
        </>
    );
}