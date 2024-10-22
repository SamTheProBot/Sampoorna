import React, { useContext } from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { UserInfoContext } from './_layout';

interface TabProps {
  title: string;
  val?: string | number | undefined;
  style?: any;
}

function Tab({ title, val, style }: TabProps) {
  return (
    <View style={[styles.tabRow, { ...style }]}>
      <View style={styles.tabTitle}>
        <Text style={styles.tabText}>{title}</Text>
      </View>
      <View style={styles.tabValue}>
        <Text style={styles.tabText}>{val}</Text>
      </View>
    </View>
  );
}

export default function Setting() {
  const router = useRouter();
  const { userData } = useContext<any>(UserInfoContext);

  const onLogout = () => {
    router.navigate('/');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#e0e0e0' }}>
      <View style={styles.topContainer}>
        <View style={styles.userInfo}>
          <Text style={styles.settingText}>Your Profile</Text>
          <View style={styles.infoContainer}>
            <Image style={styles.userImage} source={require('@/assets/images/user.jpg')} />
            <View style={styles.userDetails}>
              <Text style={styles.text}>Hello</Text>
              <Text style={styles.userName}>{userData.name}</Text>
            </View>
          </View>
        </View>
        <Image style={styles.coinImage} source={require('@/assets/images/coin.png')} />
      </View>
      <View style={{ marginBottom: 7 }}>
        <Tab title='Made With <3'></Tab>
        <Tab title='By Team EcoBlock'></Tab>
      </View>
      <View style={{ marginBottom: 7 }}>
        <Tab title="Aadhar" val={userData.aadhar} />
        <Tab title="Contact" val={userData.contact} />
        <Tab title="Age" val={userData.age} />
      </View>
      <View style={{ marginBottom: 7 }}>
        <Tab title="Bank" val={userData.bankName} />
        <Tab title="Balance" val={parseFloat(userData.balance).toFixed(10)} />
      </View>
      <View>
        <TouchableOpacity style={styles.tabRow}>
          <Text style={{ fontSize: 22 }}>ChangeLanguage</Text>
          <Text style={{ fontSize: 22 }}>{}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onLogout} style={styles.tabRow}>
          <Text style={{ color: 'red', fontSize: 20 }}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    height: 250,
    backgroundColor: 'darkorange',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 35,
  },
  userInfo: {
    flex: 0.75,
  },
  settingText: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  userImage: {
    borderColor: 'gray',
    borderWidth: 1,
    height: 80,
    width: 80,
    borderRadius: 30,
  },
  userDetails: {
    paddingLeft: 20,
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  userName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 32,
  },
  coinImage: {
    height: 100,
    bottom: 20,
    width: 100,
  },
  tabRow: {
    backgroundColor: 'white',
    padding: 16.5,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  tabTitle: {
    flex: 0.5,
  },
  tabValue: {
    flex: 0.5,
    alignItems: 'flex-end',
  },
  tabText: {
    fontSize: 19,
  },
});
