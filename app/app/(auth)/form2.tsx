
import { useContext } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Input } from '@/components/Input';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/Button';
import { SignupContext } from './_layout';  // Import the shared context
import { Navigate } from '@/components/Navigate';

export default function Sign2() {
  const { signupData, setSignupData } = useContext(SignupContext);

  const handleNext = () => {
    if (signupData.name && signupData.aadhar && signupData.abhaNumber && signupData.age) {
      console.log('Personal Details Saved');
    } else {
      console.log('Please fill out all fields');
    }
  };

  return (
    <SafeAreaView>
      <ThemedView>
        <Text style={styles.header}>Enter Personal Details</Text>

        <Input
          placeholder="Name"
          value={signupData.name}
          onChangeText={(text) => setSignupData({ ...signupData, name: text })}
        />
        <Input
          placeholder="Aadhar Number"
          value={signupData.aadhar}
          onChangeText={(text) => setSignupData({ ...signupData, aadhar: text })}
          keyboardType="numeric"
        />
        <Input
          placeholder="ABHA Number"
          value={signupData.abhaNumber}
          onChangeText={(text) => setSignupData({ ...signupData, abhaNumber: text })}
          keyboardType="numeric"
        />
        <Input
          placeholder="Age"
          value={signupData.age}
          onChangeText={(text) => setSignupData({ ...signupData, age: text })}
          keyboardType="numeric"
        />

        <ThemedButton onPress={handleNext} placeholder="Next" />
        <Navigate link={''} isBack={true} />
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
  },
});
