import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { colors } from "../Global/colors";
import { removeItem } from "../features/cart/cartSlice";
import { useDispatch } from "react-redux";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItem({ id: item.id }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text1}>{item.title} </Text>
        <Text style={styles.text2}>{item.brand} </Text>
        <Text style={styles.text1}>
          $ {item.price} Quantity: {item.quantity}{" "}
        </Text>
      </View>
      <TouchableOpacity onPress={handleRemoveItem}>
        <Entypo name="trash" size={25} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

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
  textContainer: {
    width: "70",
    gap: 5,
  },
  text1: {
    fontSize: 19,
    color: "black",
    fontFamily: "Josefin",
  },
  text2: {
    fontSize: 19,
    color: "black",
    fontFamily: "Josefin",
  },
});
