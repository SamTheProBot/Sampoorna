import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [scanEnabled, setScanEnabled] = useState(false);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    setScanEnabled(false);
    console.log(`${data}`)
  };

  const handleTapToScan = () => {
    setScanEnabled(true);
    setScanned(false);
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
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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

