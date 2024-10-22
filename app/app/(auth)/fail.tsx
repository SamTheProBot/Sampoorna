import { View, StyleSheet, SafeAreaView, Text } from 'react-native'
import { ThemedButton } from '@/components/Button'
import { useRouter } from 'expo-router'
import { useEffect } from 'react';

export default function Fail() {
  const router = useRouter();

  const handlePress = () => {
    router.navigate('/home')
  }

  useEffect(() => {
    const time = setTimeout(handlePress, 6000)
    return () => {
      clearTimeout(time)
    }
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
        <Text style={styles.heading}>Invalid Account</Text>
        <Text style={styles.text}>Transection Failed !</Text>
      </View>
      <View style={styles.lower}>
        <ThemedButton placeholder='Go back' onPress={handlePress} style={{ width: '50%' }}></ThemedButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  upper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.75,
    marginTop: 25,
  },
  lower: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 0.25,
  },
  heading: {
    fontSize: 47,
    color: 'darkorange',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    color: 'darkorange',
    fontWeight: 'bold'
  }
})
