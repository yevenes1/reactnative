import { FlatList, StyleSheet, Text, View } from "react-native";
import categories from "../Data/categories.json";
import CategoryItem from "./CategoryItem";

const Categories = ({ navigation, route }) => {
  return (
    <FlatList
      style={styles.container}
      data={categories}
      keyExtractor={(item) => item}
      renderItem={({ item }) => (
        <CategoryItem category={item} navigation={navigation} route={route} />
      )}
    />
  );
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
});
