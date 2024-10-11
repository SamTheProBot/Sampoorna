import { View, StyleSheet, SafeAreaView, Image, TouchableNativeFeedback } from 'react-native';
import { Link } from 'expo-router';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';

export default function Home() {
  return (
    <>
      <SafeAreaView style={{ flex: 1 }}>
        <ParallaxScrollView
          headerBackgroundColor={{ dark: "white", light: "white" }}
          headerImage={<Image style={{ flex: 1, width: "100%" }} source={require('@/assets/images/scroll.jpg')}></Image>
          }>
          <ThemedView style={styles.container}>
            <ThemedText style={styles.label}>Services</ThemedText>
            <View style={styles.optionContainer}>
              <TouchableNativeFeedback>
                <ThemedText style={styles.option}>hola</ThemedText>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <ThemedText style={styles.option}>hola</ThemedText>
              </TouchableNativeFeedback>
            </View>
            <View style={styles.optionContainer}>
              <TouchableNativeFeedback>
                <ThemedText style={styles.option}>hola</ThemedText>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback>
                <ThemedText style={styles.option}>hola</ThemedText>
              </TouchableNativeFeedback>
            </View>
          </ThemedView>
        </ParallaxScrollView>
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
  }
})
