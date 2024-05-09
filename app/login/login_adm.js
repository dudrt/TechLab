import { View, StyleSheet, TextInput, Text, TouchableOpacity,Alert } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function LoginAdm() {

    const [login, setLogin] = useState()
    const [senha, setSenha] = useState()
    const [showSenha, setShowSenha] = useState(true)

    const storeData = async (value) => {
        try {
            await AsyncStorage.setItem('login', value);
        } catch (e) {
            
        }
    };

    const confirmarLogin = async () =>{
        if(login == "admin" && senha == "admin"){
            storeData("admin")
            Alert.alert('Login realizado com sucesso!');
            router.replace("/inicio")
        }else{
            Alert.alert('Informações inválidas!');
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <Text style={styles.titulo}>Login Administrador</Text>
            <TextInput
                style={styles.input_txt}
                placeholder="Digite seu login"
                onChangeText={(texto) => setLogin(texto)}
                value={login}>
            </TextInput>
            <TextInput
                style={styles.input_txt}
                secureTextEntry={showSenha}
                placeholder="Digite sua senha"
                onChangeText={(texto) => setSenha(texto)}
                value={senha}>
            </TextInput>
            <TouchableOpacity style={styles.confirmar_btn} onPress={() => confirmarLogin()}>
                <Text style={styles.confirmar_txt}>Confirmar</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ECF5FF"
    },
    titulo: {
        alignSelf: "center",
        fontFamily: "Poppins-Extra-Bold",
        fontSize: 30,
        color: "#2A72FD",
        marginTop: "5%",
        marginBottom: "5%"
    },
    input_txt: {
        minHeight: "10%",
        width: "80%",
        borderRadius: 30,
        backgroundColor: "#FFF",
        alignSelf: "center",
        margin: "5%",
        padding: 20
    },
    confirmar_btn:{
        width:"40%",
        backgroundColor:"#FFF",
        alignSelf:"center",
        alignItems:"center",
        justifyContent:"center",
        padding:10,
        borderRadius:30
    },
    confirmar_txt:{
        fontFamily: "Poppins-Bold",
        fontSize:20
    }
})