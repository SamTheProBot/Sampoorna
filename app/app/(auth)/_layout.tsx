import { createContext, useState } from 'react';
import { Stack } from 'expo-router';

interface Props {
  name: string,
  aadhar: string,
  contact: string,
  abhaNumber: string,
  age: string,
  bankDetails: {
    bankName: string,
    accountNumber: string,
    ifsc: string,
  },
  code: string,
}
export interface SignUpContextProp {
  signupData: Props,
  setSignupData: React.Dispatch<React.SetStateAction<Props>>;
}

export const SignupContext = createContext<SignUpContextProp | undefined>(undefined);

export default function Layout() {

  const [signupData, setSignupData] = useState<Props>({
    name: '',
    aadhar: '',
    abhaNumber: '',
    age: '',
    contact: '',
    bankDetails: {
      bankName: '',
      accountNumber: '',
      ifsc: '',
    },
    code: ''
  });

  return (
    <>
      <SignupContext.Provider value={{ signupData, setSignupData }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SignupContext.Provider >
    </>
  );
}

