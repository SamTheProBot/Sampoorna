import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StyleSheet, View, Image } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function TabLayout() {
  return (
    <GestureHandlerRootView>
      <Tabs screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarBackground: () => (
          <Image source={require('@/assets/images/scroll.jpg')} />
        ),
        tabBarInactiveTintColor: 'white'
      }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="transction"
          options={{
            title: 'History',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="history" color={color} />,
          }}
        />
        <Tabs.Screen
          name="scanner"
          options={{
            title: '',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <View style={styles.cameraButtonContainer}>
                <View style={styles.cameraButton}>
                  <FontAwesome size={24} name="inr" color={color} />
                </View>
              </View>
            )
          }}
        />
        <Tabs.Screen
          name="additional"
          options={{
            title: 'Additional',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={26} name="info-circle" color={color} />,
          }}
        />
        <Tabs.Screen
          name="setting"
          options={{
            title: 'setting',
            headerShown: false,
            tabBarIcon: ({ color }) => <FontAwesome size={28} name="cog" color={color} />,
          }}
        />
      </Tabs>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  cameraButtonContainer: {
    position: "absolute",
    bottom: 0,
    height: 60,
    borderRadius: 35,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cameraButton: {
    backgroundColor: 'orange',
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.5,
    elevation: 5,
  }
})








