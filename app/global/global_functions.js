import AsyncStorage from "@react-native-async-storage/async-storage";

export default async function GetTipoSession(){

    const login = await AsyncStorage.getItem('login');
    return login == "admin" ? true : false
    
}