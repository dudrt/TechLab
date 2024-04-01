import { View, StyleSheet, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import db from "../firebase";
import Navigation from "../navigation_menu";




export default function MonitoriaSelecionada() {

    const { id } = useLocalSearchParams();
    const [infos, setInfos] = useState(null)

    useEffect(() => {
        PegarInfos()
    }, [])

    const PegarInfos = async () => {

        const docRef = doc(db, "monitorias", id);
        const docSnap = await getDoc(docRef);
        const json = docSnap.data()
        setInfos(json)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.back_btn} onPress={() => router.replace("/monitoria")}>
                <Text style={styles.back_txt}>Voltar</Text>
            </TouchableOpacity>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            {infos == null ? (
                <ActivityIndicator style={{ position: "absolute", alignSelf: "center", top: "50%" }} size="large" color="#2A72FD" />
            ) : (
                <ScrollView style={[styles.sub_menu, styles.sombra]}>
                    <Text style={styles.titulo}>{infos.nome}</Text>
                    <Text style={styles.submenu_txt}>
                        {infos.desc}
                    </Text>
                    <Text style={styles.submenu_txt}>
                        <Text style={{ fontFamily: "Poppins-Bold" }}>Local:</Text>{"\n"}{infos.local}h
                    </Text>
                    <Text style={styles.submenu_txt}>
                        <Text style={{ fontFamily: "Poppins-Bold" }}>Horario:</Text>{"\n"}{infos.horario}
                    </Text>
                    <Text style={styles.submenu_txt}>
                        <Text style={{ fontFamily: "Poppins-Bold" }}>Dia(s):</Text>{"\n"}{infos.dia}
                    </Text>
                    <Text style={styles.submenu_txt}>
                        <Text style={{ fontFamily: "Poppins-Bold" }}>Monitor(es):</Text>{"\n"}{infos.monitores}
                    </Text>
                </ScrollView>
            )}
            <Navigation />
        </View>
    )
}


const styles = new StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        backgroundColor: "#ECF5FF",
        marginBottom: 80
    },
    sub_menu: {
        backgroundColor: "#FFF",
        alignSelf: "center",
        flexDirection: "column",
        borderRadius: 10,
        paddingHorizontal: 10,
        width: "90%",
        marginBottom: 100

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
    },
    titulo: {
        alignSelf: "center",
        fontFamily: "Poppins-Extra-Bold",
        fontSize: 30,
        color: "#2A72FD",
        marginTop: "5%"
    },
    submenu_txt: {
        marginBottom: "5%",
        fontFamily: "Poppins",
        fontSize: 18,
        textAlign: "left"
    },
    back_btn: {
        width: "20%",
        margin: "4%",
        alignSelf: "flex-start",
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30
    },
    back_txt: {
        fontFamily: "Poppins-Extra-Bold",
        fontSize: 18,
    }
})