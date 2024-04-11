import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from "react-native"
import { StatusBar } from "expo-status-bar";
import { useNavigation, useRouter, useLocalSearchParams, router } from "expo-router";
import { createContext, useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import db from "../firebase";
import Navigation from "../navigation_menu";

export default function EventoSelecionado() {
    // Teste de pr
    const { id } = useLocalSearchParams();
    const [infos, setInfos] = useState(null)
    useEffect(() => {
        PegarInfos()
    }, [])

    const PegarInfos = async () => {

        const docRef = doc(db, "eventos", id);
        const docSnap = await getDoc(docRef);
        const json = docSnap.data()
        setInfos(json)
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <TouchableOpacity style={styles.back_btn} onPress={() => router.replace("/eventos")}>
                <Text style={styles.back_txt}>Voltar</Text>
            </TouchableOpacity>
            {infos == null ? (
                <ActivityIndicator style={{ position: "absolute", alignSelf: "center", top: "50%" }} size="large" color="#2A72FD" />) :
                (
                    <View style={styles.conteudo}>
                        <View style={[styles.sub_menu, styles.sombra]}>
                            <Image style={styles.img_submenu} resizeMode="contain" source={require("../../img/fmp.png")}></Image>
                            <Text style={styles.text_submenu}>{infos.nome}</Text>
                        </View>
                        <View style={[styles.desc_menu, styles.sombra]}>
                            <Text style={{marginTop:"2%"}}>
                                Data
                            </Text>
                            <Text style={styles.txt_desc_menu}>
                                {infos.data_evento}
                            </Text>
                            <Text>
                                Duração
                            </Text>
                            <Text style={styles.txt_desc_menu}>
                            {infos.inicio_evento} - {infos.fim_evento}
                            </Text>
                            <Text>
                            Horas complementares
                            </Text>
                            <Text style={styles.txt_desc_menu}>
                                 {infos.horas_comp}h
                            </Text>
                            <Text>
                                Sobre
                            </Text>
                            <Text style={[styles.txt_desc_menu,{marginBottom:"2%"}]} >
                                {infos.descricao}
                            </Text>
                        </View>
                    </View>
                )}
            <Navigation />
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ECF5FF",
    },
    conteudo: {
        marginBottom: 80,
    },
    text_submenu: {
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        width: "50%",
        color: "#2A72FD"
    },
    img_submenu: {
        width: "40%"
    },
    sub_menu: {
        backgroundColor: "#FFF",
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 10,
        paddingHorizontal: 10
    },
    desc_menu: {
        width: "90%",
        backgroundColor: "#FFF",
        alignSelf: "center",
        alignItems: "baseline",
        flexDirection: "column",
        borderRadius: 10,
        marginTop: "5%",
        paddingHorizontal: 10
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
    txt_desc_menu: {
        fontFamily: "Poppins",
        textAlign: "left",
        fontSize: 12,
    },
    back_btn: {
        width: "20%",
        margin: "4%",
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