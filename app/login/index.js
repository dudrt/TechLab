import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Login() {

    const setarLoginAluno = async () =>{
        try {
            const jsonValue = JSON.stringify("aluno");
            await AsyncStorage.setItem('login', jsonValue);
        } catch (e) {
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <Text style={styles.titulo}>Login</Text>
            <TouchableOpacity style={[styles.btn,styles.sombra]} onPress={()=> {setarLoginAluno(); router.replace("/inicio")}}>
                <Text style={styles.btn_txt}>Aluno</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn,styles.sombra]} onPress={()=>router.push("login/login_adm")}>
                <Text style={styles.btn_txt}>Administrador</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor:"#ECF5FF",
        alignItems:"center",
    },
    titulo: {
        alignSelf: "center",
        fontFamily: "Poppins-Extra-Bold",
        fontSize: 30,
        color: "#2A72FD",
        marginTop: "5%",
        marginBottom:"25%"
    },
    btn:{
        alignSelf: "center",
        justifyContent:"center",
        alignItems:"center",
        width:"70%",
        height:"10%",
        backgroundColor:"#FFF",
        margin:"6%",
        borderRadius:30
    },
    btn_txt:{
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        fontSize:20,
        color: "#2A72FD"
    },
    sombra: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
})