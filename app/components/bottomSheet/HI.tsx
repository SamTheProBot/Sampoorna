import axios from "axios";
import { EndPoint } from "@/constants/apiEndPoint";
import { useState, useContext } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { ThemedButton } from "../Button";
import { UserInfoContext } from "@/app/(tab)/_layout";
import { useHeader } from "@/hooks/useHeader";

interface hi {
  closePanal: () => void
}
export const Health_Insurence = ({ closePanal }: hi) => {
  const { userData, fetchUserInfo } = useContext<any>(UserInfoContext);
  const headers = useHeader();
  const [confirm, setConfirm] = useState<boolean>(true);

  const onPress = async () => {
    setConfirm(false);
    try {
      const response = await axios.get(`${EndPoint}/healthInsurence`, { headers });
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
      <Image style={styles.image} source={require('@/assets/images/health.png')} />
      <Text style={styles.text}>
        Health insurance provides financial protection in case of medical emergencies. It covers expenses related to hospitalization, treatments, and surgeries, ensuring you can access the best care without worrying about the costs. Apply now to secure coverage for you and your family.
      </Text>
      {userData.status.health === 'none' ? (
        <ThemedButton style={styles.btn} onPress={onPress} placeholder="Apply Now!" state={confirm} />
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
    fontSize: 32,
    color: 'green',
    marginTop: 10,
  }
});
