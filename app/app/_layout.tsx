import { StatusBar } from "expo-status-bar";
import { useColorScheme, SafeAreaView } from 'react-native';
import { Slot } from "expo-router";

export default function Layout() {
  const clr = useColorScheme();
  return (
    <>
      <StatusBar backgroundColor={clr == 'dark' ? 'black' : 'white'} />
      <SafeAreaView style={{ flex: 1 }}>
        <Slot></Slot>
      </SafeAreaView>
    </>
  )
}
