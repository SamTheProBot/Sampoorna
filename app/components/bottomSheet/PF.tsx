import { Text, View, Image, StyleSheet } from "react-native";
import { ThemedButton } from "../Button";
import { useState } from "react";

export function Provision_Fund() {
  const [isRedeemed, setIsRedeemed] = useState(false);

  const onPress = () => {
    if (!isRedeemed) {
      console.log('Health insurance applied');
      setIsRedeemed(true);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/pension.jpg')} />
      <Text style={styles.text}>
      Provision Funds (Pension) are designed to provide financial security after retirement. By contributing regularly during your working years, you accumulate a steady source of income for the future. It ensures a stress-free retirement, giving you peace of mind and financial independence. Start your Provision Fund today and safeguard your future financial well-being
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
    width: 140,
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

