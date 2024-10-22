import { SafeAreaView, ImageBackground, StyleSheet } from "react-native";

export function BackGroundImage({ children }: any) {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.imageback} >
          {children}
        </ImageBackground>
      </SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  imageback: {
    flex: 1,
    resizeMode: 'cover',
  }
})
