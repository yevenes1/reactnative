import { useState, useEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colors } from "../Global/colors";
import InputForm from "../Components/InputForm";
import SubmitButton from "../Components/SubmitButton";
import { useLoginMutation } from "../app/services/auth";
import { useDispatch } from "react-redux";
import { setUser } from "../features/auth/authSlice";
import { insertSession } from "../database";

const Login = ({ navigation }) => {
  const dispatch = useDispatch();
  const [triggerLogin, { data, isError, isSuccess, error, isLoading }] =
    useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
    triggerLogin({ email, password });
  };
  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <Text style={styles.title}>Ingresa</Text>
        <InputForm
          label="Email"
          value={email}
          onChangeText={(t) => setEmail(t)}
          isSecure={false}
          error=""
        />
        <InputForm
          label="Password"
          value={password}
          onChangeText={(t) => setPassword(t)}
          isSecure={true}
          error=""
        />
        <SubmitButton onPress={onSubmit} title="Send" />
        <Text style={styles.sub}>No tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.subLink}>Registrate</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

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
    fontSize: 18,
    fontFamily: "Lobster",
  },
  subLink: {
    fontSize: 17,
    fontFamily: "Lobster",
    color: "blue",
  },
});
