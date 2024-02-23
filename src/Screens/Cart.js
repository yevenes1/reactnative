import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  Modal,
} from "react-native";
import CartItem from "../Components/CartItem";
import { useSelector, useDispatch } from "react-redux";
import { colors } from "../Global/colors";
import { useState } from "react";
import { usePostOrdersMutation } from "../app/services/shopServices";
import { useNavigation } from "@react-navigation/native";
import { clearCart } from "../features/cart/cartSlice";

const Cart = () => {
  const localId = useSelector((state) => state.auth.value.localId);
  const cart = useSelector((state) => state.cart);
  const [triggerPostOrder] = usePostOrdersMutation();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);

  const handleConfirmOrder = async () => {
    try {
      await triggerPostOrder({ order: cart, localId });
      setConfirmationModalVisible(true);
    } catch (error) {
      console.error("Error al confirmar el pedido:", error);
    }
  };

  const closeModal = () => {
    setConfirmationModalVisible(false);
    navigation.navigate("Home");
    dispatch(clearCart());
  };

  if (!cart || !cart.value || !cart.value.items || cart.value.total === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>El carrito está vacío</Text>
      </View>
    );
  }

  const {
    value: { items, total },
  } = cart;

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
      />
      <View style={styles.confirmContainer}>
        <Pressable style={styles.btn} onPress={handleConfirmOrder}>
          <Text style={styles.text}>Confirm</Text>
        </Pressable>
        <Text style={styles.text}>Total: $ {total} </Text>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isConfirmationModalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>¡Order successfully confirmed!</Text>
            <Pressable style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 130,
  },
  confirmContainer: {
    backgroundColor: colors.pink,
    padding: 25,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    color: "black",
    fontFamily: "Lobster",
    fontSize: 18,
  },
});
