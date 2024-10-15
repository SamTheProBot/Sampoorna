import { SafeAreaView, FlatList, StyleSheet, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Hindi, English } from '@/constants/Schemes';
import { SchemeCard } from '@/components/SchemeCard';

export default function Additional() {

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ dark: 'black', light: 'light' }}
        headerImage={
          <Image
            style={{ flex: 1, width: "100%" }}
            source={require('@/assets/images/scroll.jpg')}
          />
        }>
        {Hindi.map((data, index) => (
          <SchemeCard scheme={data} key={index} />
        ))}
      </ParallaxScrollView>
    </SafeAreaView>
  );
}
