import { View,Text,StyleSheet,ActivityIndicator,TouchableOpacity, ScrollView } from "react-native";
import Navigation from "../navigation_menu";
import { useEffect, useState } from "react";
import db from "../firebase"
import { StatusBar } from "expo-status-bar";
import { collection, getDocs } from "firebase/firestore";
import { router ,useLocalSearchParams} from "expo-router";
import GetTipoSession from "../global/global_functions";
import NovaMonitoriaBtn from "../admin/monitoria/nova_monitoria_btn";

export default function Monitoria(){
    const [monitorias, setMonitorias] = useState([])
    const { admin } = useLocalSearchParams();
    const [telaAdmin,setTelaAdmin] = useState(admin)
    
    useEffect(()=>{
        setMonitorias([])
        PegarInfos()
    },[])

    const PegarInfos = async () =>{
        const admin = await GetTipoSession();

        if(admin == true){
            setTelaAdmin(true)
        }else{
            setTelaAdmin(false)
        }


        const querySnapshot = await getDocs(collection(db, "monitorias"));
        querySnapshot.forEach((doc) => {
            CriarViews(doc.data(),doc.id)
        });
    }

    const CriarViews = async (dados,id) => {
        try {
            // let urlImagem = await getImage(dados.imagem);
            
            // if(urlImagem == "erro"){
            //     urlImagem = "../../img/fmp.png"
            // }
            
            let array = monitorias
            array.push(
                <TouchableOpacity key={id} style={[styles.sub_menu, styles.sombra]} onPress={() => router.push({pathname:"monitoria/monitoria_selecionada",params:{id:id}})}>
                    <Text style={styles.text_submenu}>{dados.nome}</Text>
                </TouchableOpacity>
            )
            setMonitorias([array])
        
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <Text style={styles.titulo}>Monitorias</Text>
            {telaAdmin?<NovaMonitoriaBtn/>:<></>}
            <ScrollView style={styles.scroll}>
            {monitorias == 0 ? (
                <ActivityIndicator style={{alignSelf:"center"}} size="large" color="#2A72FD" />
                ):(
                monitorias.map((view,index)=>
                <View key={index}>{view}</View>
                    )
                )
            }
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
    sub_menu: {
        backgroundColor: "#FFF",
        alignSelf:"center",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 10,
        marginBottom:"5%",
        paddingHorizontal:10,
        width:"90%"
    },
    text_submenu: {
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        color: "#2A72FD",
        fontSize:22
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