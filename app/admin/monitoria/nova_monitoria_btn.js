import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Link, router } from 'expo-router';




export default function NovaMonitoriaBtn() {


    return (
        <View>
            <TouchableOpacity style={styles.btn} onPress={()=>router.push("/admin/monitoria/nova_monitoria_cadastrar")}>
                <Text style={styles.btn_txt}>
                    + Nova Monitoria
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