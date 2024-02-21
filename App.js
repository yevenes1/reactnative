import { StyleSheet, StatusBar } from "react-native";
import { useFonts } from "expo-font";
import { colors } from "./src/Global/colors";
import { fonts } from "./src/Global/fonts";
import TabNavigator from "./src/navigation/TabNavigator";
import { store } from "./src/app/store";
import { Provider } from "react-redux";

const App = () => {
  const [fontLoaded] = useFonts(fonts);
  if (!fontLoaded) return null;

  return (
    <>
      <StatusBar backgroundColor={colors.green1} />
      <Provider store={store}>
        <TabNavigator />
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
