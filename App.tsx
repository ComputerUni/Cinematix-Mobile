import { NavigationContainer } from "@react-navigation/native";
import MainStackNavigator from "./src/navigation/MainStackNavigator";
import BottomTabs from "./src/navigation/BottomTabs";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <BottomTabs />
      </NavigationContainer>
    </>
  );
}
