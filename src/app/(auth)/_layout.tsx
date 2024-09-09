import React from "react";
import { Redirect, Stack } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";

const AuthLayout = () => {
  const { user } = useAuth();

  if (user) {
    return <Redirect href="/(home)/(tabs)" />;
  }
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: false }} />
    </Stack>
  );
};

export default AuthLayout;
