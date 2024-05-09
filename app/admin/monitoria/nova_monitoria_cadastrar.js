import { View,TouchableOpacity,TextInput,StyleSheet,Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";


export default function NovaMonitoria(){



    return(
        <View style={styles.container}>
            <TouchableOpacity style={[styles.voltar_btn, styles.sombra]} onPress={() => router.back("/eventos")}>
                <Text style={styles.voltar_txt}>Voltar</Text>
            </TouchableOpacity>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />

        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"#ECF5FF"
    },
    sombra: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 4,
    },
})