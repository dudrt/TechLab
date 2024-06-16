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
                    <View >
                        <Text style={styles.titulo}>{infos.nome}</Text>
                    </View>
                    <View>
                        <Text style={styles.desc_txt}>   {infos.descricao}</Text>
                    </View>
                    <View>
                        <Text style={[styles.submenu_txt,{ fontFamily: "Poppins-Bold" }]}>Horário:</Text>
                        <Text style={[styles.submenu_txt,{marginBottom:0}]}>Início:{infos.inicio_hora}</Text>
                        <Text style={styles.submenu_txt}>Fim:{infos.fim_hora}</Text>
                    </View>
                    <View>
                        <Text style={[styles.submenu_txt,{ fontFamily: "Poppins-Bold" }]}>Local:</Text>
                        <Text style={styles.submenu_txt}>{infos.local}</Text>
                    </View>
                    <View style={{marginBottom:"5%"}}>
                        <Text style={[styles.submenu_txt,{ fontFamily: "Poppins-Bold" }]}>Dia(s):</Text>
                        {infos.dias.map((view,index)=>
                            <View key={index}><Text style={styles.nome_monitor}>{view}</Text></View>
                        )}
                    </View>
                    <View style={{marginBottom:"5%"}}>
                        <Text style={[styles.submenu_txt,{ fontFamily: "Poppins-Bold" }]}>Monitor(es):</Text>
                        {infos.monitores.map((view,index)=>
                            <View key={index}>
                                <Text style={styles.nome_monitor}>{view}</Text>
                            </View>
                        )}
                    </View>
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
        marginTop: "5%",
        textAlign:"center"
    },
    submenu_txt: {
        marginBottom: "5%",
        fontFamily: "Poppins",
        fontSize: 18,
        textAlign: "left"
    },
    desc_txt:{
        marginBottom: "5%",
        fontFamily: "Poppins",
        fontSize: 18,
        textAlign: "justify"
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
    },
    nome_monitor:{
        fontFamily: "Poppins",
        fontSize: 16,
    }
})