import { SafeAreaView, Text } from 'react-native';
import { Navigate } from '@/components/Navigate';
import { ThemedView } from '@/components/ThemedView';

export default function Sign1() {
  return (
    <SafeAreaView>
      <ThemedView>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 20 }}>
          Welcome to the Signup Process!
        </Text>
        <Text style={{ fontSize: 16, marginBottom: 20 }}>
          Please follow the next steps to complete your signup.
        </Text>
        <Navigate link={'/form2'} isBack={false} />
      </ThemedView>
    </SafeAreaView>
  );
}
