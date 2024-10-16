import { useRef, useState, ReactNode, useEffect } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { Sheet } from '@/components/BottomSheet';
import { Provision_Fund } from '@/components/bottomSheet/PF';
import { Health_Insurence } from '@/components/bottomSheet/HI';
import { Fixed_Deposit } from '@/components/bottomSheet/FD';
import { Card } from '@/components/Card';
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
          <ThemedText style={styles.label}>Services</ThemedText>
          <ScrollView style={styles.optionContainer} showsHorizontalScrollIndicator={false} horizontal>
            <TouchableOpacity style={styles.option} onPress={() => router.push('/scanner')}>
              <ThemedText style={styles.text}>Pay</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => openBottomSheet(<Health_Insurence ref={bottomSheetRef} />)}>
              <ThemedText style={styles.text}>Health Insurance</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => openBottomSheet(<Provision_Fund />)}>
              <ThemedText style={styles.text}>Provision Funds</ThemedText>
            </TouchableOpacity>
            <TouchableOpacity style={styles.option} onPress={() => openBottomSheet(<Fixed_Deposit />)}>
              <ThemedText style={styles.text}>Fixed Deposits</ThemedText>
            </TouchableOpacity>
          </ScrollView>

          <Card image={require('@/assets/images/health.png')} name='Health_Insurence' status={false} time='10'></Card>
          <Card image={require('@/assets/images/pension.jpg')} name='Provision Funds' status={false} time='10'></Card>
          <Card image={require('@/assets/images/FD.jpg')} name='Fixed Deposits' status={false} time='10'></Card>

        </ParallaxScrollView>


        <Sheet bottomSheetRef={bottomSheetRef} snapPoints='65'>
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
  label: {
    alignSelf: 'center',
    fontSize: 24,
  },
  optionContainer: {
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 12,
    borderRadius: 12,
  },
  option: {
    backgroundColor: 'orange',
    height: 90,
    width: 140,
    marginHorizontal: 10,
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
