
import { PropsWithChildren } from 'react';
import { StyleSheet, View, Text, Image, ImageBackground } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';

const HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  userInfo: any;
}>;

export default function ParallaxScrollHome({
  children,
  userInfo,
}: Props) {
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);

  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
            [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75]
          ),
        },
        {
          scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        },
      ],
    };
  });

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} scrollEventThrottle={16}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: 'darkorange' },
            headerAnimatedStyle,
          ]}>
          <ImageBackground style={StyleSheet.absoluteFill} source={require('@/assets/images/home.png')}>
            <View style={styles.upper}>
              <View style={styles.userInfoContainer}>
                <Image source={require("@/assets/images/user.jpg")} style={styles.userImage} />
                <View>
                  <Text style={styles.nameText}>{userInfo.name}</Text>
                  <Text style={styles.detailText}>name</Text>
                </View>
              </View>
            </View>
            <View style={styles.lower}>
              <View>
                <Text style={styles.balanceText}>{parseFloat(userInfo.balance).toFixed(2)} EST</Text>
                <Text style={styles.balanceLabel}>Your Balance</Text>
              </View>
            </View>
          </ImageBackground>
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  header: {
    height: 250,
    overflow: 'hidden',
    flexDirection: 'column',
  },
  content: {
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    marginTop: -20,
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 28,
    gap: 16,
    overflow: 'hidden',
  },
  upper: {
    flex: 0.6,
    paddingHorizontal: 20,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  userInfoContainer: {
    marginTop: 40,
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  lower: {
    paddingHorizontal: 20,
    flex: 0.4,
    alignItems: 'flex-end',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  userImage: {
    width: 68,
    height: 68,
    borderRadius: 25,
    marginRight: 20,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  detailText: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  balanceText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  balanceLabel: {
    fontSize: 16,
    color: 'white',
    marginTop: 4,
    textAlign: 'right'
  },
  text: {
    fontSize: 45,
    fontWeight: 'bold',
    color: 'white',
  },
});
