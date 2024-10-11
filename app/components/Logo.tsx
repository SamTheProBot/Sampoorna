import { View, Image, StyleSheet, Text } from 'react-native';

export function Logo() {
  return (
    <View style={{ marginVertical: 10 }}>
      <Image
        style={styles.image}
        source={require("../assets/images/logo.png")}>
      </Image>
      <Text style={styles.text}>Sampoorna</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  text: {
    alignSelf: "center",
    fontWeight: 'bold',
    fontSize: 26,
    color: '#FF6347',
    marginBottom: 8,
  }
})
