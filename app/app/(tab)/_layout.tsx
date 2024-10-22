import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import axios from 'axios';
import { EndPoint } from '@/constants/apiEndPoint';
import { useEffect, createContext, useState } from 'react';
import { useHeader } from '@/hooks/useHeader';

interface UserProps {
  name: string,
  aadhar: string,
  age: string,
  contact: string,
  bankName: string,
  balance: string,
  status: {
    fixed: string,
    health: string,
    provident: string
  }
}

export interface userInfoContextProp {
  userData: UserProps,
  setUserData: React.Dispatch<React.SetStateAction<UserProps>>;
  fetchUserInfo: () => void;
}

export const UserInfoContext = createContext<userInfoContextProp | undefined>(undefined);

export default function TabLayout() {
  const headers = useHeader();
  const [userData, setUserData] = useState<UserProps>({
    name: '',
    aadhar: '',
    age: '',
    contact: '',
    balance: '',
    bankName: '',
    status: {
      fixed: '',
      health: '',
      provident: ''
    }
  });

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`${EndPoint}/userInfo`, { headers });
      setUserData({ ...response.data, balance: response.data.balance * 100 })
    } catch (e) {
    }
  }

  useEffect(() => {
    fetchUserInfo()
  }, [headers])


  return (
    <>
      <UserInfoContext.Provider value={{ userData, setUserData, fetchUserInfo }}>
        <GestureHandlerRootView>
          <Tabs screenOptions={{
            tabBarStyle: {
              bottom: 1,
              paddingTop: 5,
              backgroundColor: "white"
            },
            tabBarHideOnKeyboard: true,
            tabBarActiveTintColor: '#200432',
            //           tabBarBackground: () => (
            //           <Image source={require('@/assets/images/scroll.jpg')} />
            //       ),
            tabBarInactiveTintColor: 'gray'
          }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: '',
                headerShown: false,
                tabBarIcon: ({ color }) => <FontAwesome size={32} name="home" color={color} />,
              }}
            />
            <Tabs.Screen
              name="transction"
              options={{
                title: '',
                headerShown: false,
                tabBarIcon: ({ color }) => <FontAwesome size={32} name="history" color={color} />,
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
                      <FontAwesome size={26} name="inr" color={color} />
                    </View>
                  </View>
                )
              }}
            />
            <Tabs.Screen
              name="additional"
              options={{
                title: '',
                headerShown: false,
                tabBarIcon: ({ color }) => <FontAwesome size={30} name="info-circle" color={color} />,
              }}
            />
            <Tabs.Screen
              name="setting"
              options={{
                title: '',
                headerShown: false,
                tabBarIcon: ({ color }) => <FontAwesome size={32} name="cog" color={color} />,
              }}
            />
          </Tabs>
        </GestureHandlerRootView >
      </UserInfoContext.Provider>
    </>
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



