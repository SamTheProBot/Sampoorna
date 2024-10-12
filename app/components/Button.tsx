import { TouchableOpacity, Text, StyleSheet } from "react-native";

interface ButtonProp {
  onPress: () => void;
  placeholder: string;
  style?: any;
}

export function ThemedButton({ onPress, placeholder, style }: ButtonProp) {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.buttonText}>{placeholder}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    width: '80%',
    backgroundColor: 'darkorange',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
