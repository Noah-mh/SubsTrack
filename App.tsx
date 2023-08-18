import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, Text, View, StyleSheet, Button } from "react-native";
import { ClerkProvider, SignedIn, SignedOut, useAuth } from "@clerk/clerk-expo";
import { tokenCache, useSignOut } from "./utils/clerkOperation";
import Constants from 'expo-constants';

import SignInWithOAuth from './components/SignIn_Out/SignInWithOAuth';
import Home from './components/Home/Home';
import AppLogo from "./components/utils/AppLogo";

export default function App() {
  const CLERK_PUBLISHABLE_KEY = Constants.expoConfig?.extra?.clerkPublishableKey;

  const SignOut = () => {
    const { isLoaded, signOut } = useSignOut();
    if (!isLoaded) {
      return null;
    }
    return (
      <View>
        <Button
          title="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </View>
    );
  };
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={CLERK_PUBLISHABLE_KEY}>
      <NavigationContainer>

        <SafeAreaView style={styles.container}>
          <SignedIn>
            <Text>You are Signed in</Text>
            <AppLogo />
            <Home />
            <SignOut />
          </SignedIn>
          <SignedOut>
            <AppLogo />
            <SignInWithOAuth />
          </SignedOut>
        </SafeAreaView>
      </NavigationContainer>
    </ClerkProvider >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
