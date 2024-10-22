import { useRef, useState, ReactNode, useEffect, useContext } from 'react';
import { StyleSheet, View, SafeAreaView, ScrollView, Image, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { Sheet } from '@/components/BottomSheet';
import { Provision_Fund } from '@/components/bottomSheet/PF';
import { Health_Insurence } from '@/components/bottomSheet/HI';
import { UserInfoContext } from './_layout';
import { Fixed_Deposit } from '@/components/bottomSheet/FD';
import { Card } from '@/components/Card';
import BottomSheet from '@gorhom/bottom-sheet';
import ParallaxScrollHome from '@/components/ParallaxHome';

export default function Home() {
  const { userData } = useContext<any>(UserInfoContext)
  const [sheetContent, setSheetContent] = useState<ReactNode>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const router = useRouter();

  const openBottomSheet = (content: ReactNode) => {
    setSheetContent(content);
    bottomSheetRef.current?.expand();
  };
  const closeBottomSheet = () => {
    bottomSheetRef.current?.close();
  }

  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ParallaxScrollHome
          userInfo={userData}
        >
          <ThemedText style={styles.label}>Services</ThemedText>
          <View style={styles.optionContainer}>
            <View style={styles.opti}>
              <TouchableOpacity style={styles.option} onPress={() => router.push('/scanner')}>
                <FontAwesome size={32} name="qrcode" />
              </TouchableOpacity>
              <View style={styles.textLa}>
                <ThemedText style={styles.text}>Scan</ThemedText>
                <ThemedText style={styles.text}>QR</ThemedText>
              </View>
            </View>
            <View style={styles.opti}>
              <TouchableOpacity style={styles.option} onPress={() => openBottomSheet(<Health_Insurence closePanal={closeBottomSheet} />)}>
                <FontAwesome size={32} name="heartbeat" />
              </TouchableOpacity>
              <View style={styles.textLa}>
                <ThemedText style={styles.text}>Health</ThemedText>
                <ThemedText style={styles.text}>Insurance</ThemedText>
              </View>
            </View>
            <View style={styles.opti}>
              <TouchableOpacity style={styles.option} onPress={() => openBottomSheet(<Provision_Fund closePanal={closeBottomSheet} />)}>
                <FontAwesome size={32} name="leaf" />
              </TouchableOpacity>
              <View style={styles.textLa}>
                <ThemedText style={styles.text}>Provision</ThemedText>
                <ThemedText style={styles.text}>Fundes</ThemedText>
              </View>
            </View>
            <View style={styles.opti}>
              <TouchableOpacity style={styles.option} onPress={() => openBottomSheet(<Fixed_Deposit closePanal={closeBottomSheet} />)}>
                <FontAwesome size={32} name="money" />
              </TouchableOpacity>
              <View style={styles.textLa}>
                <ThemedText style={styles.text}>Fixed</ThemedText>
                <ThemedText style={styles.text}>Deposits</ThemedText>
              </View>
            </View>
          </View>
          <ThemedText style={styles.label}>Status</ThemedText>
          <Card image={require('@/assets/images/health.png')} name='Health_Insurence' status={userData.status.health} time='10'></Card>
          <Card image={require('@/assets/images/pension.jpg')} name='Provision Funds' status={userData.status.provident} time='10'></Card>
          <Card image={require('@/assets/images/FD.jpg')} name='Fixed Deposits' status={userData.status.fixed} time='10'></Card>

        </ParallaxScrollHome>


        <Sheet bottomSheetRef={bottomSheetRef} snapPoints='58'>
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => bottomSheetRef.current?.close()}>
            <Text style={{ color: 'darkorange', fontWeight: 'bold', fontSize: 20 }}>Close</Text>
          </TouchableOpacity>
          {sheetContent}
        </Sheet>
      </SafeAreaView >
    </>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingTop: 6,
    marginLeft: 12,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    fontSize: 26,
  },
  opti: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: 'column',
  },
  textLa: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    paddingVertical: 12,
  },
  option: {
    backgroundColor: 'orange',
    height: 80,
    width: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 4,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 1, height: 4 },
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#eee',
  },
  text: {
    fontSize: 17.5,
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
