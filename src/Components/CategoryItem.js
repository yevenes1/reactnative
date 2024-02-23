import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../Global/colors";
import CardShadow from "../Wrappers/CardShadow";
import { useDispatch } from "react-redux";
import { setProductsFilteredByCategory } from "../features/shop/shopSlice";

const CategoryItem = ({ category, navigation, route }) => {
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => {
        dispatch(setProductsFilteredByCategory(category));
        navigation.navigate("Category", { category });
      }}
    >
      <CardShadow style={styles.container}>
        <Text style={styles.text}>{category}</Text>
      </CardShadow>
    </Pressable>
  );
};

export default CategoryItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.pink,
    margin: 10,
    padding: 10,
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
  },
  text: {
    color: "black",
    fontFamily: "Lobster",
    fontSize: 18,
  },
});
