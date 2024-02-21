import { StyleSheet, StatusBar } from "react-native";
import { colors } from "./src/Global/colors";
import { store } from "./src/app/store";
import { Provider } from "react-redux";
import MainNavigator from "./src/navigation/MainNavigator";

const App = () => {
  return (
    <>
      <StatusBar backgroundColor={colors.green1} />
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
