import { createContext, useState } from 'react';
import { Stack } from 'expo-router';

export const SignupContext = createContext(null);

export default function Layout() {
  const [signupData, setSignupData] = useState({
    name: '',
    aadhar: '',
    abhaNumber: '',
    age: '',
    bankDetails: {
      bankName: '',
      accountNumber: '',
      ifsc: '',
    }
  });

  return (
    <SignupContext.Provider value={{ signupData, setSignupData }}>
      <Stack screenOptions={{ headerShown: false }} />
    </SignupContext.Provider >
  );
}

