import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Keyboard } from 'react-native';
import { BackGroundImage } from '@/components/BackGround';
import { Input } from '@/components/Input';
import { TransThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/Button';
import { SignupContext } from './_layout';
import { Navigate } from '@/components/Navigate';
import { useRouter } from 'expo-router';
import { EndPoint } from '@/constants/apiEndPoint';
import { saveDataSecure } from '@/hooks/storage';


export default function Confirm() {
  const router = useRouter();
  const [confirm, setConfirm] = useState<boolean>(true);
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const { signupData } = useContext<any>(SignupContext);
  const [code, setCode] = useState<string>('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const handleSubmit = async () => {
    if (signupData.code) {
      setConfirm(false);
      try {
        const response = await axios.post(`${EndPoint}/auth/verify`, { code, contact: signupData.code });
        if (response.status === 200) {
          setConfirm(true);
          saveDataSecure({ key: 'access_token', value: response.data.access_token });
          router.replace('/home')
        } else {
          console.log('unexpected creadential');
          setConfirm(true);
        }
      } catch (error) {
        console.error('Error submitting signup data:', error);
        setConfirm(true);
      }
    } else {
      console.log('Please fill out all fields');
      setConfirm(true);
    }
  };

  return (
    <BackGroundImage>
      <TransThemedView style={styles.container}>
     <View style={[styles.formContainer, { marginTop: isKeyboardVisible ? 10 : -80 }]}>
          <Text style={styles.header}>Enter Varification Code</Text>
          <Input 
            placeholder="Verification Code"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />
          <ThemedButton style={{ marginTop: 10, width: '80%' }} onPress={handleSubmit} placeholder="Submit" state={confirm} />
        </View>
        {!isKeyboardVisible &&
          <View style={styles.navigationContainer}>
            <Navigate style={styles.navigationLeft} link={''} isBack={true} />
          </View>
        }
      </TransThemedView>
    </BackGroundImage>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: 'darkorange',
    marginBottom: 45,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  navigationLeft: {
    position: "absolute",
    top: 0,
    left: 15,
  },
  navigationContainer: {
    height: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
  }
});
