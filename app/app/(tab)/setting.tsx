import { useState } from 'react';
import { Text, Switch, SafeAreaView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';


export default function Setting() {
  const [dark, setDark] = useState<boolean>(false)

  const toggle = () => {
    setDark(e => !e);
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ThemedView style={{ flex: 1, paddingTop: 100, paddingRight: 10 }}>
          <Switch onValueChange={toggle} value={dark}></Switch>
        </ThemedView>
      </SafeAreaView>
    </>
  )
}
