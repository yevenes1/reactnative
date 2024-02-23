import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import InputForm from "../Components/InputForm";
import SubmitButton from "../Components/SubmitButton";
import { colors } from "../Global/colors";
import { useSignupMutation } from "../app/services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { signupSchema } from "../validations/signupSchema";
import { insertSession } from "../database";

const Signup = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerSignup, { data, isError, isSuccess, error, isLoading }] =
    useSignupMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUser(data));
      insertSession(data)
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    }
    if (isError) console.log(error);
  }, [data, isError, isSuccess]);

  const onSubmit = () => {
    try {
      setEmailError("");
      setPasswordError("");
      setConfirmPasswordError("");
      signupSchema.validateSync({ email, password, confirmPassword });
      triggerSignup({ email, password });
    } catch (error) {
      switch (error.path) {
        case "email":
          setEmailError(error.message);
          break;
        case "password":
          setPasswordError(error.message);
          break;
        case "confirmPassword":
          setConfirmPasswordError(error.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Registrate</Text>
        <InputForm
          label="Email"
          value={email}
          onChangeText={(t) => setEmail(t)}
          isSecure={false}
          error={emailError}
        />
        <InputForm
          label="Password"
          value={password}
          onChangeText={(t) => setPassword(t)}
          isSecure={true}
          error={passwordError}
        />
        <InputForm
          label="Confirm password"
          value={confirmPassword}
          onChangeText={(t) => setConfirmPassword(t)}
          isSecure={true}
          error={confirmPasswordError}
        />
        <SubmitButton title="Send" onPress={onSubmit} />
        <Text style={styles.sub}>Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Entrar</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: colors.pink,
    gap: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 22,
    fontFamily: "Lobster",
  },
  sub: {
    fontSize: 14,
  },
  subLink: {
    fontSize: 14,
    color: "blue",
  },
});
