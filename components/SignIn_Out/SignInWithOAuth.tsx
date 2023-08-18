import React, { useCallback } from "react";
import * as WebBrowser from "expo-web-browser";
import { Button } from "react-native";
import { useWarmUpBrowser } from "../../hooks/UseWarmUpBrowser";
import { useGoogleOAuthFlow } from "../../utils/clerkOperation";
import { checkUserExists, addUser } from "../../utils/supabaseOperation";
import { useAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();

const SignInWithOAuth = () => {
    useWarmUpBrowser();

    const startGoogleOAuth = useGoogleOAuthFlow();

    const onPress = useCallback(async () => {
        const result = await startGoogleOAuth();

        if (result && result.createdSessionId && result.setActive) {
            result.setActive({ session: result.createdSessionId });
        } else {
            // Use result.signIn or result.signUp for next steps such as MFA, if they exist.
        }
    }, []);

    return (
        <Button
            title="Sign in with Google"
            onPress={onPress}
        />
    );
};

export default SignInWithOAuth;
