import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  Text,
  Animated,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Button, Input } from "@rneui/themed";
import {
  useFonts,
  Nunito_400Regular,
  Nunito_700Bold,
} from "@expo-google-fonts/nunito";

AppState.addEventListener("change", (state) => {
  if (state === "active") {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  let [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_700Bold,
  });

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(session);

    if (error) {
      Alert.alert(error.message);
    } else if (!session) {
      Alert.alert("Please check your inbox for email verification!");
    }
    setLoading(false);
  }

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Text style={styles.title}>Login to MeshApp</Text>
      <View style={[styles.inputContainer, styles.mt20]}>
        <Input
          label="Email"
          leftIcon={{
            type: "font-awesome",
            name: "envelope",
          }}
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={"none"}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
        />
      </View>
      <View style={styles.inputContainer}>
        <Input
          label="Password"
          leftIcon={{ type: "font-awesome", name: "lock" }}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={"none"}
          inputStyle={styles.input}
          labelStyle={styles.inputLabel}
        />
      </View>
      <View style={[styles.buttonContainer, styles.mt20]}>
        <Button
          title="Sign in"
          disabled={loading}
          onPress={() => signInWithEmail()}
          buttonStyle={[styles.button, styles.secondaryButton]}
          titleStyle={[styles.buttonTitle, styles.secondaryButtonTitle]}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Sign up"
          disabled={loading}
          onPress={() => signUpWithEmail()}
          buttonStyle={[styles.button, styles.secondaryButton]}
          titleStyle={[styles.buttonTitle, styles.secondaryButtonTitle]}
        />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#A7B8C950",
  },
  title: {
    fontSize: 28,
    fontFamily: "Nunito_700Bold",
    color: "#333",
    marginBottom: 30,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    fontFamily: "Nunito_400Regular",
    fontSize: 16,
  },
  inputLabel: {
    fontFamily: "Nunito_700Bold",
    fontSize: 14,
  },
  buttonContainer: {
    width: "100%",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#9A90E2",
    borderRadius: 25,
    paddingVertical: 12,
  },
  buttonTitle: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#9A90E2",
  },
  secondaryButtonTitle: {
    color: "#9A90F2",
  },
  mt20: {
    marginTop: 20,
  },
});
