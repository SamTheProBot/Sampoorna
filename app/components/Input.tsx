import { StyleSheet, TextInput } from "react-native";
import { ThemedView } from "./ThemedView";

interface InputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  keyboardType?: any;
  secureTextEntry?: boolean;
}

export function Input({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  secureTextEntry = false,
}: InputProps) {
  return (
    <ThemedView style={styles.container}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#999"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
      />
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "darkorange",
    borderRadius: 7,
    backgroundColor: "#FcF5ED",
    fontSize: 16,
    color: "#333",
  },
});
