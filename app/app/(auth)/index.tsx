import axios from 'axios';
import { useRouter } from 'expo-router';
import { BackGroundImage } from '@/components/BackGround';
import { StyleSheet } from 'react-native';
import { Input } from "@/components/Input";
import { ThemedText } from '@/components/ThemedText';
import { Logo } from '@/components/Logo';
import { HyperLink } from '@/components/Navigate';
import { TransThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/Button';
import { useState } from 'react';
import { EndPoint } from '@/constants/apiEndPoint';
import { saveDataSecure } from '@/hooks/storage';

export default function Login() {
  const route = useRouter();
  const [name, setName] = useState('');
  const [aadhar, setAadhar] = useState('');

  const handleLogin = async () => {
    if (name && aadhar) {
      try {
        const response = await axios.post(`${EndPoint}/auth/login`, { name, aadhar });
        if (response.status === 201) {
          await saveDataSecure({ key: 'access_token', value: response.data.access_token });
          route.replace('/home');
        } else {
          console.log('invalid creadential');
        }
      }
      catch (e) {
        console.log(`server error ${e}`)
      }
    } else {
      console.log('provide essintial credntion')
    }
  };

  return (
    <>
      <BackGroundImage>
        <TransThemedView style={styles.container}>
          <Logo />
          <Input
            placeholder='Enter your name'
            value={name}
            onChangeText={setName}
          />
          <Input
            placeholder='Enter your Aadhar number'
            value={aadhar}
            onChangeText={setAadhar}
            keyboardType="numeric"
          />
          <ThemedButton onPress={handleLogin} placeholder='Login' />
          <ThemedText style={styles.message}>Don't have an account?</ThemedText>
          <HyperLink link={'/form1'} placeholder={'Sign up here'} />
        </TransThemedView>
      </BackGroundImage>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: -20,
    justifyContent: 'center',
    padding: 20,
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
    fontSize: 16,
  },
});
