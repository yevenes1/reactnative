import { FlatList, StyleSheet, Text, View } from "react-native";
import OrderItem from "../Components/OrderItem";
import { useGetOrdersQuery } from "../app/services/shopServices";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LoadingSpinner from "../Components/LoadingSpinner";

const Orders = () => {
  const localId = useSelector((state) => state.auth.value.localId);
  const { data, isSuccess, isError, error, isLoading } =
    useGetOrdersQuery(localId);
  const [info, setInfo] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSuccess && data.length === 0) setInfo(false);
    if (isSuccess && data) setLoading(false);
    if (isError && error) setErrorMessage(error.error);
  }, [data, isSuccess, isError, error]);

  if (!info)
    return (
      <View>
        <Text>no hay ordenes</Text>
      </View>
    );
  if (errorMessage)
    return (
      <View>
        <Text>Error al cargar</Text>
      </View>
    );
  if (loading) return <LoadingSpinner />;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
};

export default Orders;

const styles = StyleSheet.create({});
