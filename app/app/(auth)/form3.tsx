import { useContext, useEffect, useState } from 'react';
import { Text, StyleSheet, View, Keyboard } from 'react-native';
import { BackGroundImage } from '@/components/BackGround';
import { Input } from '@/components/Input';
import { TransThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/Button';
import { SignupContext } from './_layout';
import { Navigate } from '@/components/Navigate';
import { useRouter } from 'expo-router';

export default function Sign3() {
  const router = useRouter();
  const [isKeyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const { signupData, setSignupData } = useContext<any>(SignupContext);

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
    router.replace('/home')
    //  if (signupData.bankDetails.bankName && signupData.bankDetails.accountNumber && signupData.bankDetails.ifsc) {
    //     console.log('Bank Details Submitted');
    //
    //      try {
    //        const response = await fetch('https://example.com/api/signup', {
    //          method: 'POST',
    //          headers: { 'Content-Type': 'application/json' },
    //          body: JSON.stringify(signupData),
    //        });
    //        const result = await response.json();
    //        console.log(result);
    //      } catch (error) {
    //        console.error('Error submitting signup data:', error);
    //      }
    //    } else {
    //      console.log('Please fill out all fields');
    //   }
  };

  return (
    <BackGroundImage>
      <TransThemedView style={styles.container}>
        <View style={styles.formContainer}>
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

          <ThemedButton style={{ marginTop: 20 }} onPress={handleSubmit} placeholder="Submit" />
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
    marginBottom: 30,
  },
  formContainer: {
    flex: 1,
    marginTop: -75,
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
