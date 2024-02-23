import {
  StyleSheet,
  Text,
  Image,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { colors } from "../Global/colors";
import { useDispatch } from "react-redux";
import { setProductSelected } from "../features/shop/shopSlice";

const ProductItem = ({ item, navigation, route }) => {
  const { width } = useWindowDimensions();
  const dispatch = useDispatch();
  return (
    <Pressable
      style={styles.container}
      onPress={() => {
        dispatch(setProductSelected(item.id));
        navigation.navigate("Product", { id: item.id });
      }}
    >
      <Text style={width > 350 ? styles.text : styles.textMin}>
        {item.title}
      </Text>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: item.thumbnail }}
      />
    </Pressable>
  );
};

export default ProductItem;

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
    width: "60%",
    textAlign: "center",
    fontSize: 20,
  },
  textMin: {
    width: "60%",
    textAlign: "center",
    fontSize: 15,
  },
  image: {
    minWidth: 90,
    height: 90,
    width: "30%",
  },
});
