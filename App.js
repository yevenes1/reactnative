import { StyleSheet, StatusBar } from "react-native";
import { colors } from "./src/Global/colors";
import { useFonts } from "expo-font";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import MainNavigator from "./src/navigation/MainNavigator";
import { init } from "./src/database";

init()
  .then(() => console.log("DB Initialized"))
  .catch((err) => console.log(err));

const App = () => {
  const [fontLoaded] = useFonts({
    Josefin: require("./assets/Fonts/JosefinSans-Bold.ttf"),
    Lobster: require("./assets/Fonts/Lobster-Regular.ttf"),
  });

  if (!fontLoaded) return null;

  return (
    <>
      <StatusBar backgroundColor="#fff" />
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "start",
  },
});
