import { Text, View, Image, StyleSheet } from "react-native";
import { ThemedButton } from "../Button";
import { useState } from "react";
import { useHeader } from "@/hooks/useHeader";
import { EndPoint } from "@/constants/apiEndPoint";
import axios from "axios";

export function Fixed_Deposit() {
  const headers = useHeader();
  const [confirm, setConfirm] = useState(true);
  const [isRedeemed, setIsRedeemed] = useState(false);

  const onPress = async () => {
    setConfirm(false);
    try {
      const response = await axios.get(`${EndPoint}/fixedDeposit`, { headers });
      if (response.status === 200) {
        console.log(response.data)
        setConfirm(true)
      }
    } catch (e) {
      console.log(`error from server ${e}`);
      setConfirm(true)
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/FD.jpg')} />
      <Text style={styles.text}>
        Fixed Deposit offers a safe and secure way to grow your savings with guaranteed returns. By locking in a fixed amount for a specified period, you earn interest at a higher rate than a regular savings account. It’s a low-risk investment that helps you build wealth over time while ensuring your money is protected. Open a Fixed Deposit today and take a step toward achieving your financial goals
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

