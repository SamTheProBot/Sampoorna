import { SafeAreaView, StyleSheet } from 'react-native';
import { Input } from "@/components/Input";
import { ThemedText } from '@/components/ThemedText';
import { Logo } from '@/components/Logo';
import { HyperLink } from '@/components/Navigate';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/Button';
import { useState } from 'react';

export default function Login() {
  const [name, setName] = useState('');
  const [aadhar, setAadhar] = useState('');

  const handleLogin = () => {
    if (name && aadhar) {
      console.log('Login successful');


    } else {
      console.log('Please fill in all fields');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ThemedView style={styles.container}>
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
      </ThemedView>
    </SafeAreaView>
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
