import  AsyncStorage  from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

interface saveProp {
    key: string;
    value: any;
} 

export async function saveData ({key, value}:saveProp) {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
        console.log('error while storing')
    }
};

export async function getData (key: string) {
    try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
        console.log('error while retrival')
    }
};
  
export async function saveDataSecure({key, value}: saveProp) {
    try{
        await SecureStore.setItemAsync(key, value);
    }catch(e){
        console.log('error while storing')
    }
  }
   
export async function getDataSecure(key: string) {
    try{
        const result = await SecureStore.getItemAsync(key);
        return result != null ? result : null;
    }
    catch(e){
        console.log('error while retrival')
    }
}

