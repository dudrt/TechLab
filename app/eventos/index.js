
import { useEffect, useState } from "react"
import { Text, View, Image, StyleSheet,TouchableOpacity, ScrollView,ActivityIndicator } from "react-native"
import db from "../firebase"
import { StatusBar } from "expo-status-bar";
import { collection, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { router } from "expo-router";
import Navigation from "../navigation_menu";
import NovoEventoBTN from "../admin/evento/novo_evento_btn";


export default function IndexEventos() {

    const [viewEventos, setViewEventos] = useState([])
    const [telaAdmin,setTelaAdmin] = useState(true)
    useEffect(() => {
        setViewEventos([])
        PegarInfos()
        
    }, []);


    const PegarInfos = async () => {
        setViewEventos([])
        const querySnapshot = await getDocs(collection(db, "eventos"));
        querySnapshot.forEach((doc) => {
            CriarViews(doc.data(),doc.id)
        });
    }
    const getImage = async (parametro) => {
        try {
            const storage = getStorage();
            const url = await getDownloadURL(ref(storage, `imagens/${parametro}`));
            return url;
        } catch (error) {
            return "erro";
        }
    }
    const CriarViews = async (dados,id) => {
        try {
            // let urlImagem = await getImage(dados.imagem);
            // console.log(urlImagem)
            // if(urlImagem == "erro"){
            //     urlImagem = "../../img/fmp.png"
            // }
            
            let array = viewEventos
            array.push(
                <TouchableOpacity key={id} style={[styles.sub_menu, styles.sombra]} onPress={() => router.push({pathname:"eventos/event_selecionado",params:{id:id}})}>
                    <Image style={styles.img_submenu} resizeMode="contain" source={require ("../../img/fmp.png")}></Image>
                    <Text style={styles.text_submenu}>{dados.nome}</Text>
                </TouchableOpacity>
            )
            setViewEventos([array])
        
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <Text style={styles.titulo}>Eventos Acadêmicos</Text>
            {telaAdmin?<NovoEventoBTN/>:<></>}
            <ScrollView style={styles.scroll}>
            {viewEventos.length == 0 ? (<ActivityIndicator size="large" color="#2A72FD" />):
            (
                viewEventos.map((view,index)=>
                    <View key={index}>{view}</View>
                )
            )}  
            </ScrollView>
            <Navigation/>
        </View>
    )
}

const styles = new StyleSheet.create({
    container:{
        width:"100%",
        height:"100%",
        justifyContent:"center",
        alignItems:"center",
        backgroundColor: "#ECF5FF",
    },
    titulo: {
        fontFamily: "Poppins-Extra-Bold",
        fontSize: 30,
        color: "#2A72FD",
        marginTop: "5%"
    },
    img_submenu: {
        width: "40%"
    },
    sub_menu: {
        backgroundColor: "#FFF",
        alignSelf:"center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 10,
        marginTop:"5%", 
        paddingHorizontal:10

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
    scroll:{
        width:"100%",
        height:"100%",
        marginTop:"5%",
        marginBottom:80,
    }
})