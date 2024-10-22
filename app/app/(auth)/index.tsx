import axios from 'axios';
import { useRouter } from 'expo-router';
import { BackGroundImage } from '@/components/BackGround';
import { StyleSheet, Keyboard } from 'react-native';
import { Input } from "@/components/Input";
import { ThemedText } from '@/components/ThemedText';
import { Logo } from '@/components/Logo';
import { HyperLink } from '@/components/Navigate';
import { TransThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/Button';
import { useState, useContext, useEffect } from 'react';
import { SignupContext } from './_layout';
import { EndPoint } from '@/constants/apiEndPoint';

export default function Login() {
  const route = useRouter();
  const { setSignupData, signupData } = useContext<any>(SignupContext);
  const [confirm, setConfirm] = useState<boolean>(true);
  const [name, setName] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);


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

  const handleLogin = async () => {
    setConfirm(false);
    if (name && signupData.code) {
      try {
        const response = await axios.post(`${EndPoint}/auth/login`, { name: name, contact: signupData.code });
        if (response.status === 200) {
          setConfirm(true);
          route.push('/confirm');
        } else {
          console.log('invalid creadential');
          setConfirm(true);
        }
      }
      catch (e) {
        console.log(`server error ${e}`)
        setConfirm(true);
      }
    } else {
      console.log('provide essintial credntion')
      setConfirm(true);
    }
  };

  return (
    <>
      <BackGroundImage>
        <TransThemedView style={[styles.container, { marginTop: isKeyboardVisible ? 20 : -20 }]}>
          <Logo />
          <Input
            placeholder='Enter your name'
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder='Enter your contact number'
            value={signupData.code}
            onChangeText={(text) => setSignupData({ ...signupData, code: text })}
            keyboardType="numeric"
          />
          <ThemedButton onPress={handleLogin} placeholder='Login' state={confirm} />
          <ThemedText style={styles.message}>Don't have an account?</ThemedText>
          { !isKeyboardVisible && 
            <HyperLink link={'/form1'} placeholder={'Sign up here'} />
          }
        </TransThemedView>
      </BackGroundImage>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
  },
});
