import { Text, View, Image, StyleSheet } from "react-native";
import { ThemedButton } from "../Button";
import { useState } from "react";

export function Health_Insurence() {
  const [isRedeemed, setIsRedeemed] = useState(false);

  const onPress = () => {
    if (!isRedeemed) {
      console.log('Health insurance applied');
      setIsRedeemed(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/health.png')} />
      <Text style={styles.text}>
        Health insurance provides financial protection in case of medical emergencies. It covers expenses related to hospitalization, treatments, and surgeries, ensuring you can access the best care without worrying about the costs. Apply now to secure coverage for you and your family.
      </Text>
      {!isRedeemed ? (
        <ThemedButton style={styles.btn} onPress={onPress} placeholder="Apply Now!" />
      ) : (
        <Text style={styles.activatedText}>Already Activated</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  btn: {
    width: 200,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 15,
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  activatedText: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
  }
});
