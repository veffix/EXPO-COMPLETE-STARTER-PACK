import React from "react";
import "../global.css";
import { Redirect } from 'expo-router';
import { Text } from '@/components/ui/text';
import LoginScreen from "../screens/Login/signIn";
import { useSession } from '../utils/ctx';

export default function Home() {
  const { jwt, isLoading } = useSession();
  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (jwt) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/contacts" />;
  }
  return <LoginScreen />;
}
