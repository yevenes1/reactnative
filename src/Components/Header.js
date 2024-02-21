import { StyleSheet, Text, View } from "react-native";
import { colors } from "../Global/colors";

const Header = ({ title = "Producto" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.green1,
    width: "100%",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontFamily: "Josefin",
  },
});
