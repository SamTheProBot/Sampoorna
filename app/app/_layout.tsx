import { SafeAreaView } from 'react-native';
import { Slot } from "expo-router";

export default function Layout() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <Slot></Slot>
      </SafeAreaView>
    </>
  )
}
