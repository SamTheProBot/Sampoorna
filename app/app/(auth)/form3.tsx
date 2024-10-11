import { useContext } from 'react';
import { SafeAreaView, Text, StyleSheet } from 'react-native';
import { Input } from '@/components/Input';
import { ThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/Button';
import { SignupContext } from './_layout';
import { Navigate } from '@/components/Navigate';

export default function Sign3() {
  const { signupData, setSignupData } = useContext(SignupContext);

  const handleSubmit = async () => {
    if (signupData.bankDetails.bankName && signupData.bankDetails.accountNumber && signupData.bankDetails.ifsc) {
      console.log('Bank Details Submitted');

      try {
        const response = await fetch('https://example.com/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(signupData),
        });
        const result = await response.json();
        console.log(result);
      } catch (error) {
        console.error('Error submitting signup data:', error);
      }
    } else {
      console.log('Please fill out all fields');
    }
  };

  return (
    <SafeAreaView>
      <ThemedView>
        <Text style={styles.header}>Enter Bank Details</Text>

        <Input
          placeholder="Bank Name"
          value={signupData.bankDetails.bankName}
          onChangeText={(text) =>
            setSignupData({ ...signupData, bankDetails: { ...signupData.bankDetails, bankName: text } })
          }
        />
        <Input
          placeholder="Account Number"
          value={signupData.bankDetails.accountNumber}
          onChangeText={(text) =>
            setSignupData({ ...signupData, bankDetails: { ...signupData.bankDetails, accountNumber: text } })
          }
          keyboardType="numeric"
        />
        <Input
          placeholder="IFSC Code"
          value={signupData.bankDetails.ifsc}
          onChangeText={(text) =>
            setSignupData({ ...signupData, bankDetails: { ...signupData.bankDetails, ifsc: text } })
          }
        />

        <ThemedButton onPress={handleSubmit} placeholder="Submit" />
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
