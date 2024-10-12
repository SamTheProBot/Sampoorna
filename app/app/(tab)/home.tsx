import { useRef, useState, ReactNode } from 'react';
import { View, StyleSheet, SafeAreaView, Image, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { Sheet } from '@/components/BottomSheet';
import { Provision_funds } from '@/components/bottomSheet/PF';
import { Health_Insurence } from '@/components/bottomSheet/HI';
import { Fixed_deposit } from '@/components/bottomSheet/FD';
import BottomSheet from '@gorhom/bottom-sheet';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function Home() {
  const [sheetContent, setSheetContent] = useState<ReactNode>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();

  const openBottomSheet = (content: ReactNode) => {
    setSheetContent(content);
    bottomSheetRef.current?.expand();
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ParallaxScrollView
          headerBackgroundColor={{ dark: "black", light: "white" }}
          headerImage={
            <Image
              style={{ flex: 1, width: "100%" }}
              source={require('@/assets/images/scroll.jpg')}
            />
          }
        >
          <ThemedView style={styles.container}>
            <ThemedText style={styles.label}>Services</ThemedText>
            <View style={styles.optionContainer}>
              <TouchableOpacity style={styles.option} onPress={() => router.push('/scanner')}>
                <ThemedText style={styles.text}>Pay</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => openBottomSheet(<Health_Insurence />)}>
                <ThemedText style={styles.text}>Health Insurance</ThemedText>
              </TouchableOpacity>
            </View>
            <View style={styles.optionContainer}>
              <TouchableOpacity style={styles.option} onPress={() => openBottomSheet(<Provision_funds />)}>
                <ThemedText style={styles.text}>Provision Funds</ThemedText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option} onPress={() => openBottomSheet(<Fixed_deposit />)}>
                <ThemedText style={styles.text}>Fixed Deposits</ThemedText>
              </TouchableOpacity>
            </View>
          </ThemedView>
        </ParallaxScrollView>


        <Sheet bottomSheetRef={bottomSheetRef}>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => bottomSheetRef.current?.close()}>
            <Text style={{ color: 'darkorange', fontWeight: 'bold', fontSize: 20 }}>Close</Text>
          </TouchableOpacity>
          {sheetContent}
        </Sheet>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  label: {
    alignSelf: 'center',
    fontSize: 24,
    marginBottom: 24,
  },
  optionContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'space-around'
  },
  option: {
    backgroundColor: 'orange',
    height: 60,
    width: 120,
    display: 'flex',
    justifyContent: 'center',
    padding: 1,
    borderRadius: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  sheetText: {
    fontSize: 18,
    marginBottom: 20,
  },
  closeButton: {
    fontSize: 16,
    color: 'blue',
    marginTop: 10,
  },
});
