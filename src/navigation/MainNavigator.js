import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import { useState } from "react";
import AuthStack from "./AuthStack";
import { useSelector } from "react-redux";

const MainNavigator = () => {
  const idToken = useSelector((state) => state.auth.value.idToken);

  return (
    <NavigationContainer>
      {idToken ? <TabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
