import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Text, StyleSheet, View, Keyboard } from 'react-native';
import { BackGroundImage } from '@/components/BackGround';
import { Input } from '@/components/Input';
import { TransThemedView } from '@/components/ThemedView';
import { ThemedButton } from '@/components/Button';
import { SignupContext } from './_layout';
import { Navigate } from '@/components/Navigate';

export default function Sign2() {
  const router = useRouter();
  const [isKeyOpen, setIsKeyOpen] = useState<boolean>(true);
  const { signupData, setSignupData } = useContext<any>(SignupContext);

  useEffect(() => {
    const keyboardOpen = Keyboard.addListener('keyboardDidShow', () => setIsKeyOpen(false))
    const keyboardClosr = Keyboard.addListener('keyboardDidHide', () => setIsKeyOpen(true))

    return () => {
      keyboardOpen.remove()
      keyboardClosr.remove()
    }

  }, [])

  const handleNext = () => {
    if (signupData.name && signupData.aadhar && signupData.contact && signupData.age) {
      router.push('/form3')
      console.log('Personal Details Saved');
    } else {
      console.log('Please fill out all fields');
    }
  };

  return (
    <BackGroundImage>
      <TransThemedView style={styles.container}>
        <View style={styles.formContainer}>
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
            placeholder="Age"
            value={signupData.age}
            onChangeText={(text) => setSignupData({ ...signupData, age: text })}
            keyboardType="numeric"
          />
          <Input
            placeholder="Contact"
            value={signupData.contact}
            onChangeText={(text) => setSignupData({ ...signupData, contact: text })}
            keyboardType="numeric"
          />

          <ThemedButton style={{ marginTop: 20 }} onPress={handleNext} placeholder="Next" />
        </View>
        {isKeyOpen &&
          <View style={styles.navigationContainer}>
            <Navigate style={styles.navigationLeft} link={''} isBack={true} />
            <Navigate style={styles.navigationRight} link={'form3'} isBack={false} />
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
  label: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: 'darkorange',
  },
  text: {
    fontSize: 20,
    marginVertical: 20,
  },
  navigationRight: {
    position: "absolute",
    top: 0,
    right: 15,
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
})
