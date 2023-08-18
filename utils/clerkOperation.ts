// clerkOperations.js
import { useOAuth } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";

export const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      console.error("Error getting token:", err);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

export const useSignOut = () => {
  const { isLoaded, signOut } = useAuth();
  return { isLoaded, signOut };
};

export const useGoogleOAuthFlow = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const startGoogleOAuth = async () => {
    if (!startOAuthFlow) {
      console.error("startOAuthFlow is undefined");
      return null;
    }

    try {
      const result = await startOAuthFlow();
      return result;
    } catch (err) {
      console.error("OAuth error", err);
      return null;
    }
  };

  return startGoogleOAuth;
};
export const useAppleOAuthFlow = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_apple" });

  const startAppleOAuth = async () => {
    if (!startOAuthFlow) {
      console.error("startOAuthFlow is undefined");
      return null;
    }

    try {
      const result = await startOAuthFlow();
      return result;
    } catch (err) {
      console.error("OAuth error", err);
      return null;
    }
  };

  return startAppleOAuth;
};
