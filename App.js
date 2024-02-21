import { StyleSheet, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { colors } from "./src/Global/colors";
import { fonts } from "./src/Global/fonts";
import TabNavigator from "./src/navigation/TabNavigator";

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.green1} />
      <TabNavigator />
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
