import { createContext, useState } from 'react';
import { Stack } from 'expo-router';

interface Props {
  name: string,
  aadhar: string,
  abhaNumber: string,
  age: string,
  bankDetails: {
    bankName: string,
    accountNumber: string,
    ifsc: string,
  }
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
    bankDetails: {
      bankName: '',
      accountNumber: '',
      ifsc: '',
    }
  });

  return (
    <>
      <SignupContext.Provider value={{ signupData, setSignupData }}>
        <Stack screenOptions={{ headerShown: false }} />
      </SignupContext.Provider >
    </>
  );
}

