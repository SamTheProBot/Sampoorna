import { View, Image, StyleSheet, SafeAreaView, Text } from 'react-native'
import { ThemedButton } from '@/components/Button'
import { useRouter } from 'expo-router'
import { useEffect } from 'react';

export default function Success() {
  const router = useRouter();

  const handlePress = () => { 
    router.navigate('/home')
  }

  useEffect(()=>{
    const time = setTimeout(handlePress, 7500)
    return () =>{
      clearTimeout(time)
    } 
  },[])

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upper}>
        <Image style={styles.image} source={require('@/assets/images/confirm.gif')}></Image>
        <Text style={styles.text}>Transection Successfull !</Text>
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
  image: {
    height: 170,
    width: 170
  },
  text: {
    fontSize: 16,
    color: 'darkorange',
    fontWeight: 'bold'
  }
})
