import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Link, router } from 'expo-router';




export default function NovoEventoBTN() {


    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={()=>router.push("/admin/evento/novo_evento_cadastrar")}>
                <Text style={styles.btn_txt}>
                    + Novo Evento
                </Text>
            </TouchableOpacity>
        </View>
    )
}



const styles = new StyleSheet.create({

    btn: {
        flexDirection: "row",
        backgroundColor: "#2A72FD",
        borderRadius:30,
        padding:5
    },
    btn_txt: {
        color:"#FFF",
        fontFamily: "Poppins-Extra-Bold",
        fontSize: 22
    }
})