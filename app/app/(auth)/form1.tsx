import { Text, StyleSheet, View } from 'react-native';
import { BackGroundImage } from '@/components/BackGround';
import { Navigate } from '@/components/Navigate';
import { TransThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Logo } from '@/components/Logo';

export default function Sign1() {
  return (
    <BackGroundImage>
      <TransThemedView style={styles.container}>
        <Logo />
        <Text style={styles.label}>Welcome to the Signup Process!</Text>

        <View style={styles.textContainer}>
          <ThemedText style={styles.instructions}>
            Step 1: Enter your personal details & identification.
          </ThemedText>
          <ThemedText style={styles.instructions}>
            Step 2: Submit your banking details securely.
          </ThemedText>
          <ThemedText style={styles.instructions}>
            Step 3: Enjoy the benefits of Sampoorna.
          </ThemedText>
        </View>

        <View style={styles.navigationContainer}>
          <Navigate style={styles.navigation} link={'/form2'} isBack={false} />
        </View>
      </TransThemedView>
    </BackGroundImage>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  labelContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'darkorange',
    textAlign: 'center',
    marginBottom: 20,
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  navigation: {
    position: "absolute",
    top: 0,
    right: 15,
  },
  navigationContainer: {
    height: 100,
    position: "absolute",
    bottom: 0,
    right: 0,
    width: "100%",
  }
});
