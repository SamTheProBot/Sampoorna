import { Text, View, Image, StyleSheet } from "react-native";
import { ThemedButton } from "../Button";
import { useState, useContext } from "react";
import { EndPoint } from "@/constants/apiEndPoint";
import { UserInfoContext } from "@/app/(tab)/_layout";
import axios from "axios";
import { useHeader } from "@/hooks/useHeader";

interface pf {
  closePanal: () => void
}

export function Provision_Fund({ closePanal }: pf) {
  const { userData, fetchUserInfo } = useContext<any>(UserInfoContext);
  const headers = useHeader();
  const [confirm, setConfirm] = useState(true);

  const onPress = async () => {
    setConfirm(false);
    try {
      const response = await axios.get(`${EndPoint}/providentFunds`, { headers });
      if (response.status === 201) {
        closePanal();
        fetchUserInfo()
        setConfirm(true)
      } else if (response.status === 200) {
        closePanal();
        fetchUserInfo()
      }
    } catch (e) {
      console.log(`error from server ${e}`);
      setConfirm(true)
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('@/assets/images/pension.jpg')} />
      <Text style={styles.text}>
        provident Funds (Pension) are designed to provide financial security after retirement. By contributing regularly during your working years, you accumulate a steady source of income for the future. It ensures a stress-free retirement, giving you peace of mind and financial independence. Start your Provision Fund today and safeguard your future financial well-being
      </Text>
      {userData.status.provident === 'none' ? (
        <ThemedButton style={styles.btn} state={confirm} onPress={onPress} placeholder="Apply Now!" />
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
    fontSize: 32,
    color: 'green',
    marginTop: 10,
  }
});

