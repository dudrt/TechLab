import { useEffect, useState } from "react"
import { Text, View, Image,ToastAndroid,Modal, StyleSheet,TouchableOpacity, ScrollView,ActivityIndicator } from "react-native"
import db from "../firebase"
import { StatusBar } from "expo-status-bar";
import { collection, getDocs ,deleteDoc, doc} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { router ,useLocalSearchParams} from "expo-router";
import Navigation from "../navigation_menu";
import NovoEventoBTN from "../admin/evento/novo_evento_btn";
import GetTipoSession from "../global/global_functions";

export default function IndexEventos() {
    const [viewEventos, setViewEventos] = useState([])
    const [telaAdmin,setTelaAdmin] = useState(false)

    const [viewModalExcluir, setViewModalExcluir] = useState()
    const [modalVisivel,setModalVisivel] = useState(false)
    useEffect(() => {
        setViewEventos([])
        pegarInfos()

    }, []);

    const pegarInfos = async () => {
        const admin = await GetTipoSession();

        setTelaAdmin(admin)
        



        let eventos = false 
        setViewEventos([])
        const querySnapshot = await getDocs(collection(db, "eventos"));
        querySnapshot.forEach((doc) => {
            eventos = true
            CriarViews(doc.data(),doc.id)
        });

        if(!eventos){
            setViewEventos([(
                <View style={[styles.sub_menu, styles.sombra]}>
                    <Text style={styles.text_submenu}>Nenhum evento cadastrado no momento.</Text>
                </View>
            )])
        }
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

    const deleteEvento = async (id) =>{
        try{
            await deleteDoc(doc(db, "eventos", id));
            ToastAndroid.showWithGravity(
                `Evento excluido com sucesso!`,
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
              )
            setViewEventos([])
            pegarInfos()
        }catch(e){
            console.log(e)
        }
    } 

    const abrirModalExcluir = async (id,nomeEvento) =>{
        setModalVisivel(true)
        setViewModalExcluir(
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View style={styles.view_modal}>
                        <Text style={styles.desconect_modal_text}>Você tem certeza que deseja excluir o evento {nomeEvento} ?</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={[styles.modal_button_desconect,styles.sombra]} onPress={() => {deleteEvento(id);setModalVisivel(false)}}>
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
            let array = viewEventos
            array.push(
                <TouchableOpacity key={id} style={[styles.sub_menu, styles.sombra]} onPress={() => router.push({pathname:"eventos/event_selecionado",params:{id:id}})}>
                    <Image style={styles.img_submenu} resizeMode="contain" source={require ("../../img/fmp.png")}></Image>
                    <Text style={styles.text_submenu}>{dados.nome}</Text>
                    <Text style={styles.data_submenu}>{dados.data_evento}</Text>
                    <TouchableOpacity onPress={()=>abrirModalExcluir(id)} style={styles.remove_btn}>
                        <Image style={styles.img_remove} resizeMode="cover" resizeMethod="scale" source={require ("../../img/remove.png")}/>
                    </TouchableOpacity>
                    
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
        paddingHorizontal:10,
        marginBottom:"2%",
        width:"90%"
    },
    text_submenu: {
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        width: "40%",
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
    },
    data_submenu:{
        position:"absolute",
        bottom:"3%",
        end:"3%",
        fontSize:12,
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        color: "#6096FF"
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