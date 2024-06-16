import { View,Text,StyleSheet,ActivityIndicator,ToastAndroid,Modal,TouchableOpacity, Image,ScrollView } from "react-native";
import Navigation from "../navigation_menu";
import { useEffect, useState } from "react";
import db from "../firebase"
import { StatusBar } from "expo-status-bar";
import { collection, getDocs ,deleteDoc, doc} from "firebase/firestore";
import { router ,useLocalSearchParams} from "expo-router";
import GetTipoSession from "../global/global_functions";
import NovaMonitoriaBtn from "../admin/monitoria/nova_monitoria_btn";

export default function Monitoria(){
    const [monitorias, setMonitorias] = useState([])
    const { admin } = useLocalSearchParams();
    const [telaAdmin,setTelaAdmin] = useState(admin)
    

    const [viewModalExcluir, setViewModalExcluir] = useState()
    const [modalVisivel,setModalVisivel] = useState(false)

    useEffect(()=>{
        setMonitorias([])
        pegarInfos()
    },[])

    const pegarInfos = async () =>{
        const admin = await GetTipoSession();

        setTelaAdmin(admin)
       
        let monitoria = false

        const querySnapshot = await getDocs(collection(db, "monitorias"));
        querySnapshot.forEach((doc) => {
            monitoria = true
            CriarViews(doc.data(),doc.id)
        });

        if(!monitoria){
            setMonitorias([
                <View style={[styles.sub_menu, styles.sombra]}>
                    <Text style={styles.text_submenu}>Nenhuma monitoria cadastrado no momento.</Text>
                </View>
            ])
        }

    }


    const deleteMonitoria = async (id) =>{
        try{
            await deleteDoc(doc(db, "monitorias", id));
            ToastAndroid.showWithGravity(
                `Monitoria excluida com sucesso!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              )
              setMonitorias([])
            pegarInfos()
        }catch(e){
            console.log(e)
        }
    } 

    const abrirModalExcluir = async (id,nomeMonitoria) =>{
        setModalVisivel(true)
        setViewModalExcluir(
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View style={styles.view_modal}>
                        <Text style={styles.desconect_modal_text}>Você tem certeza que deseja excluir a monitoria {nomeMonitoria} ?</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={[styles.modal_button_desconect,styles.sombra]} onPress={() => {deleteMonitoria(id);setModalVisivel(false)}}>
                                <Text style={styles.text_button_modal_desconect}>OK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.modal_button_desconect,styles.sombra]} onPress={() => {setModalVisivel(false)}}>
                                <Text style={[styles.text_button_modal_desconect,{color:"#DD5F5F"}]}>CANCELAR</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
        )
    }

    const CriarViews = async (dados,id) => {
        try {
           
            let array = monitorias
            array.push(
                <TouchableOpacity key={id} style={[styles.sub_menu, styles.sombra]} onPress={() => router.push({pathname:"monitoria/monitoria_selecionada",params:{id:id}})}>
                    <Text style={styles.text_submenu}>{dados.nome}</Text>
                    <TouchableOpacity onPress={()=>abrirModalExcluir(id,dados.nome)} style={styles.remove_btn}>
                        <Image style={styles.img_remove} resizeMode="cover" resizeMethod="scale" source={require ("../../img/remove.png")}/>
                    </TouchableOpacity>
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

        <Modal
                style={styles.modal}
                animationType="slide"
                
                visible={modalVisivel}
                
            >
                {viewModalExcluir}
            </Modal>
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
    },




    remove_btn:{
        width:"10%",
        position:"absolute",
        top:"4%",
        end:"1%"
    },
    img_remove:{
        height:30,
        width:30
    },






    modal: {
        flex:1,
    },
    view_modal: {
        backgroundColor: "#ECF5FF",
        width: "100%",
        height: "100%",
        alignSelf: "center",
        alignItems: 'center',
        justifyContent:"center",
        marginHorizontal: "auto",
        marginVertical: "auto",
        borderRadius: 40
    },
    modal_button_desconect: {
        width:"40%",
        padding: 8,
        backgroundColor: "#FFF",
        margin: 10,
        borderRadius: 30
    },
    text_button_modal_desconect: {
        fontSize:22,
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        color: "#2A72FD"
    },
    desconect_modal_text:{
        fontSize:22,
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        color: "#2A72FD"
    }
})