import { FlatList, StyleSheet, Text, View } from "react-native";
import OrderItem from "../Components/OrderItem";
import { useGetOrdersQuery } from "../app/services/shopServices";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Orders = () => {
  const localId = useSelector((state) => state.auth.value.localId);
  const { data, isSuccess, isError, error, isLoading } =
    useGetOrdersQuery(localId);
  const [info, setInfo] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSuccess && data.length === 0) {
      setInfo(false);
    }
    if (isSuccess && data) setLoading(false);
    if (isError && error)
      setErrorMessage(error.message || "Error al obtener órdenes");
  }, [isSuccess, isError, error, data]);

  if (isLoading)
    return (
      <View>
        <Text style={styles.txt}>Cargando...</Text>
      </View>
    );

  if (isError) {
    return (
      <View>
        <Text>{errorMessage}</Text>
      </View>
    );
  }

  if (!info) {
    return (
      <View>
        <Text style={styles.txt}>No tienes órdenes</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <OrderItem order={item} />}
      style={styles.FlatList}
    />
  );
};

export default Orders;

const styles = StyleSheet.create({});
