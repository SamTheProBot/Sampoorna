import BottomSheet from "@gorhom/bottom-sheet";
import axios from "axios";
import { EndPoint } from "@/constants/apiEndPoint";
import { useState, useEffect, useRef, useContext } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { useHeader } from "@/hooks/useHeader";
import { UserInfoContext } from "./_layout";
import { ThemedButton } from "@/components/Button";
import { Sheet } from "@/components/BottomSheet";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";

export default function App() {
  const router = useRouter();
  const headers = useHeader();
  const bottomSheetRef = useRef<BottomSheet>(null)
  const { useData } = useContext<any>(UserInfoContext);
  const [data, setData] = useState<any>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [enough, setEnough] = useState(true);
  const [confirm, setConfirm] = useState(true);
  const [scanEnabled, setScanEnabled] = useState(true);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const openBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleSubmit = async () => {
    setConfirm(false);
    try {
      const response = await axios.post(`${EndPoint}/scanner`, data, { headers })
      if (response.status === 200) {
        router.push('/success');
      } else if (response.status === 202) {
        router.push('/fail')
      }
      bottomSheetRef.current?.close();
      setScanEnabled(true);
      setConfirm(true);
      setScanned(false)
      setEnough(true);
      setData(null);
    } catch (e) {
      setConfirm(true);
      router.push('/fail')
      //     setEnough(false)
    }
  }

  const handleBarcodeScanned = ({ data }: { data: string }) => {
    openBottomSheet();
    setScanned(true);
    setScanEnabled(false);
    try {
      setData(JSON.parse(data));
    } catch (error) {
      console.log("Invalid QR code data");
    }
  };

  const handleTapToScan = () => {
    setScanEnabled(true);
    setScanned(false);
    setEnough(true)
  };

  if (hasPermission === null || hasPermission == false) {
    return (
      <ThemedView style={{ flex: 1 }}>
        <ThemedText style={[styles.label, { top: "55%" }]}>Grant Permision ;)</ThemedText>
        <ThemedText style={[styles.label, { top: "60%" }]}>To Access Camera</ThemedText>
      </ThemedView>
    );
  }

  return (

    enough ? (
      <ThemedView style={styles.container}>
        <View style={{ flex: 1 }}>
          <CameraView
            onBarcodeScanned={scanned || !scanEnabled ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={styles.scanner}
          />

          <TouchableOpacity onPress={handleTapToScan} style={styles.tapArea}>
            <Text style={styles.text}>Tap to Scan QR</Text>
            <View style={[styles.square, styles.topRight]} />
            <View style={[styles.square, styles.bottomRight]} />
            <View style={[styles.square, styles.topLeft]} />
            <View style={[styles.square, styles.bottomLeft]} />
          </TouchableOpacity>
        </View>

        <Sheet bottomSheetRef={bottomSheetRef} snapPoints="62">
          <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => {
            bottomSheetRef.current?.close();
            setScanEnabled(true);
            setScanned(false);
          }}>
            <Text style={{ color: 'darkorange', fontWeight: 'bold', fontSize: 20 }}>Close</Text>
          </TouchableOpacity>
          <View style={styles.outercontainer}>
            <Text style={data?.name.length < 25 ? styles.longName : styles.shortName}>{data?.name}</Text>
            <View style={styles.detailcontainer}>
              <Text style={styles.amount}>{data?.amount ? (data.amount / 1e16).toFixed(2) : "0"} EST</Text>
              <ThemedButton
                style={[styles.button, { width: '68%', paddingVertical: 10, marginBottom: -10 }]}
                state={confirm}
                placeholder="Pay"
                onPress={handleSubmit}
              />
            </View>
          </View>
        </Sheet>
      </ThemedView>
    ) : (
      <Text></Text>
    )
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  outercontainer: {
    marginTop: -20,
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flex: 0.9,
  },
  detailcontainer: {
    display: 'flex',
    flex: 0.45,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    position: "absolute",
    bottom: '0%',
  },
  longName: {
    fontSize: 50,
    paddingHorizontal: 20,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: 'gray',
    textAlign: 'center',
  },
  shortName: {
    fontSize: 40,
    paddingHorizontal: 15,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: 'gray',
    textAlign: 'center',
  },
  amount: {
    paddingVertical: 10,
    paddingHorizontal: '15%',
    borderWidth: 2.5,
    borderRadius: 8,
    borderColor: 'gray',
    fontSize: 48,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
    textAlign: 'center',
  },
  scanner: {
    flex: 1,
    height: 300,
    width: "100%",
  },
  tapArea: {
    position: "absolute",
    top: "20%",
    left: "11%",
    height: 310,
    width: 310,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 2,
    borderRadius: 30,
  },
  label: {
    fontSize: 24,
    position: "absolute",
    alignSelf: "center",
  },
  text: {
    fontSize: 20,
    color: "white",
    position: "absolute",
    top: "70%",
    alignSelf: "center",
  },
  square: {
    position: "absolute",
    height: 80,
    width: 80,
    borderColor: "white",
  },
  topRight: {
    top: 0,
    right: 0,
    borderTopRightRadius: 30,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomEndRadius: 30,
    borderRightWidth: 4,
    borderBottomWidth: 4,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderTopLeftRadius: 30,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomLeftRadius: 30,
    borderLeftWidth: 4,
    borderBottomWidth: 4,
  },
});

