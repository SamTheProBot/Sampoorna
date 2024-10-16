import { TouchableOpacity, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { useState } from "react";

interface ButtonProp {
  onPress: () => void;
  placeholder: string;
  style?: any;
  state?: boolean;
}

export function ThemedButton({ onPress, placeholder, style, state = true }: ButtonProp) {
  return (state?(
      <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
        <Text style={styles.buttonText}>{placeholder}</Text>
      </TouchableOpacity>
    ):(
      <View style={[styles.loadingButton, style]}>
        <ActivityIndicator size='small' color='gray'></ActivityIndicator>
      </View>
    )
  );
}
const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '80%',
    backgroundColor: 'darkorange',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  loadingButton: {
    marginTop: 10,
    width: '80%',
    backgroundColor: 'rgba(255, 135, 0, 0.7)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    elevation: 3,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 17,
    letterSpacing: 1.2,
    fontWeight: 'bold',
  },
});
