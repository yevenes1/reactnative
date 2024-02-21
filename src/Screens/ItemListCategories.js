import { FlatList, StyleSheet } from "react-native";

import Search from "../Components/Search";
import ProductItem from "../Components/ProductItem";
import { useEffect, useState } from "react";
import { colors } from "../Global/colors";
import { useGetProductsQuery } from "../app/services/shopServices";

const ItemListCategories = ({ navigation, route }) => {
  const { category } = route.params;
  const { data, isLoading, error } = useGetProductsQuery(category);
  const [keyword, setKeyword] = useState("");
  const [products, setProducts] = useState();

  useEffect(() => {
    if (!isLoading) {
      const dataArray = Object.values(data);
      const productsFiltered = dataArray.filter((product) =>
        product.title.includes(keyword)
      );
      setProducts(productsFiltered);
    }
  }, [keyword, data]);

  return (
    <>
      <Search setKeyword={setKeyword} />
      <FlatList
        style={styles.container}
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductItem item={item} navigation={navigation} route={route} />
        )}
      />
    </>
  );
};

export default ItemListCategories;

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  goBack: {
    width: "100%",
    backgroundColor: colors.green1,
    padding: 10,
    paddingStart: 40,
  },
});
