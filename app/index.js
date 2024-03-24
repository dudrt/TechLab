import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Link, router } from 'expo-router';
import { useFonts } from 'expo-font';
import { useCallback } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from "expo-status-bar";
import Navigation from "./navigation_menu";


export default function index() {

    SplashScreen.preventAutoHideAsync();

    const [fontsLoaded, fontError] = useFonts({
        'Poppins-Bold': require('../fonts/Poppins-Bold.ttf'),
        'Poppins-Extra-Bold': require('../fonts/Poppins-ExtraBold.ttf'),
    });

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    router.push


    return (
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <Text style={styles.titulo}>TECHLAB</Text>

            <TouchableOpacity style={[styles.sub_menu, styles.sombra]} onPress={() => router.push("/monitoria")}>
                <Image style={styles.img_submenu} resizeMode="contain" source={require('../img/monitoria.png')}></Image>
                <Text style={styles.text_submenu}>Monitorias</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sub_menu, styles.sombra]} onPress={() => router.push("/reserva_laboratorio")}>
                    <Image style={styles.img_submenu} resizeMode="contain" source={require('../img/reserva.png')}></Image>
                    <Text style={styles.text_submenu}>Reserva de{"\n"}laboratórios</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.sub_menu, styles.sombra]} onPress={() => router.push("/eventos")}>
                    <Image style={styles.img_submenu} resizeMode="contain" source={require('../img/eventos.png')}></Image>
                    <Text style={styles.text_submenu}>Eventos {"\n"} Acadêmicos</Text>
            </TouchableOpacity>

            <Navigation />
        </View>
    )
}



const styles = new StyleSheet.create({

    container: {
        backgroundColor: "#ECF5FF",
        alignItems: "center",
        height: "100%"
    },
    titulo: {
        fontFamily: "Poppins-Extra-Bold",
        fontSize: 30,
        color: "#2A72FD",
        margin: "17%"
    },
    sub_menu: {
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        width: "80%",
        height: "15%",
        borderRadius: 10,
        marginBottom: "15%"
    },
    img_submenu: {
        height: "100%",
        width: "40%"
    },
    text_submenu: {
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        width: "50%",
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
    }
})