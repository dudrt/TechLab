import { useState } from "react";
import { View,Text, TouchableOpacity,Modal,StyleSheet } from "react-native";
import Navigation from "../navigation_menu";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Updates from 'expo-updates';

export default function Configs(){

    const [ModalVisivel,setModalVisivel] = useState(false)
    const [MostrarMenu,setMostrarMenu] = useState(true)

    const desconectar = async () =>{
        await AsyncStorage.removeItem('login');
        try {      
              await Updates.reloadAsync();
            
          } catch (error) {
            alert(`Error fetching latest Expo update: ${error}`);
          }
    }

    return(
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <Text>Configurações</Text>
            <TouchableOpacity onPress={() => {setModalVisivel(true),setMostrarMenu(false)}}>
                <Text>
                    Desconectar
                </Text>
            </TouchableOpacity>
            <Modal
                style={styles.modal}
                animationType="slide"
                transparent={true}
                visible={ModalVisivel}
                
                onRequestClose={() => {
                    setModalVisivel(!ModalVisivel);
                    setMostrarMenu(true)
                }}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View style={styles.view_modal}>
                        <Text style={styles.desconect_modal_text}>Você realmente deseja se desconectar?</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.modal_button_cancel} onPress={() => { setMostrarMenu(true); setModalVisivel(!ModalVisivel) }}><Text style={styles.text_button_modal_cancel}>Cancelar</Text></TouchableOpacity>
                            <TouchableOpacity style={styles.modal_button_desconect} onPress={() => { setMostrarMenu(true); desconectar() }}><Text style={styles.text_button_modal_desconect}>Confirmar</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
            {MostrarMenu?<Navigation/>:<></>}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:"#ECF5FF",
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: 'center'
    },
    desconect_modal_text: {
        fontFamily: "Poppins-Extra-Bold",
        padding: 10,
        fontSize: 18
    },
    modal: {
        flex: 1,
    },
    view_modal: {
        backgroundColor: "#B2CDFF",
        width: "70%",
        height: "25%",
        alignSelf: "center",
        alignItems: 'center',
        marginHorizontal: "auto",
        marginVertical: "auto",
        borderRadius: 40
    },
    modal_button_cancel: {
        padding: 8,
        backgroundColor: "#FFF",
        margin: 10,
        borderRadius: 20
    },
    modal_button_desconect: {
        padding: 8,
        backgroundColor: "#FFF",
        margin: 10,
        borderRadius: 20
    },
    text_button_modal_cancel: {
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        color: "#2A72FD"
    },
    text_button_modal_desconect: {
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        color: "#2A72FD"
    },
    
})