import { SafeAreaView, FlatList, StyleSheet, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { Hindi } from '@/constants/Schemes';
import { SchemeCard } from '@/components/SchemeCard';

export default function Additional() {
  const data = Hindi;

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
        <FlatList
          keyExtractor={(_, index) => index.toString()}
          data={data}
          renderItem={({ item }) => (
            <SchemeCard scheme={item} />
          )}
        />
      </ParallaxScrollView>
    </SafeAreaView>
  );
}
