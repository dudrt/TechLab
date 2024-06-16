import { View, TouchableOpacity,ToastAndroid, Modal,TextInput, ScrollView, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, addDoc} from "firebase/firestore";
import db from "../../firebase";


export default function NovaMonitoria() {


    const [localMonitoria, setLocalMonitoria] = useState("")
    const [nomeEvento, setNomeEvent] = useState("")
    const [nomeMonitor, setNomeMonitor] = useState("")
    const [arrayMonitores, setArrayMonitores] = useState([])
    const [descricaoEvent, setDescricao] = useState("")
    const [viewMonitores, setViewMonitores] = useState([])
    const [openTimeInicio, setOpenTimeInicio] = useState(false)
    const [timeInicio, setTimeInicio] = useState(new Date())
    const [openTimeFim, setOpenTimeFim] = useState(false)
    const [timeFim, setTimeFim] = useState(new Date())
    const [diasSemana, setDiasSemana] = useState([])
    const [bolDiasSemana, setBolDiasSemana] = useState(
        {
            segunda: false,
            terça: false,
            quarta: false,
            quinta: false,
            sexta: false
        }
    )

    const [modalVisivel,setModalVisivel] = useState(false)


    useEffect(() => {
        montarViewMonitores()
    }, []);

    useEffect(() => {
        montarViewMonitores()
    }, [arrayMonitores]);


    const enviarDadosBanco = async () =>{

        if(diasSemana.length ==0 
        || descricaoEvent == "" 
        || arrayMonitores.length == 0 
        || nomeEvento == ""
        || localMonitoria == ""){
            ToastAndroid.show('Verifique se você preencheu todos os campos!', ToastAndroid.SHORT);
            return false;
        }
        
        const inicioEventoTemp = String(timeInicio.toLocaleString()).length == 21? 
            (String(timeInicio.toLocaleString()).split(",")[1].slice(0, -6)+" "+
            String(timeInicio.toLocaleString()).split(",")[1].slice(-2)):
            String(timeInicio.toLocaleString()).split(",")[1].slice(0, -6)+":"+
            String(timeInicio.toLocaleString()).split(",")[1].slice(-5,-3)
            

        const fimEventoTemp = String(timeFim.toLocaleString()).length == 21? 
        (String(timeFim.toLocaleString()).split(",")[1].slice(0, -6)+" "+
        String(timeFim.toLocaleString()).split(",")[1].slice(-2)):
        String(timeFim.toLocaleString()).split(",")[1].slice(0, -6)+":"+
        String(timeFim.toLocaleString()).split(",")[1].slice(-5,-3)

        // const inicioEventoTemp =  String(timeInicio.toLocaleString()).split(",")[1].slice(0, -6) +   String(timeInicio.toLocaleString()).split(",")[1].slice(-2)
        // const fimEventoTemp =  String(timeFim.toLocaleString()).split(",")[1].slice(0, -6) +   String(timeFim.toLocaleString()).split(",")[1].slice(-2)

        addDoc(collection(db, "monitorias"), {
            nome:nomeEvento,
            descricao:descricaoEvent,
            local:localMonitoria,
            inicio_hora:inicioEventoTemp,
            fim_hora:fimEventoTemp,
            dias:diasSemana,
            monitores:arrayMonitores
        })
        setModalVisivel(true)

    }

    const atualizarDiaSemana = (dia, valor) => {
        setBolDiasSemana(prevState => ({
            ...prevState,
            [dia]: valor
        }));
        let arraySup = [...diasSemana];
        let diaSelecionado = dia.charAt(0).toUpperCase() + dia.slice(1) + "-Feira";
        if (valor) {
            arraySup.push(diaSelecionado)
        } else {
            arraySup = arraySup.filter(e => e !== diaSelecionado)
        }
        setDiasSemana(arraySup)
    };

    const addMonitoresArray = async () => {

        let array = arrayMonitores;
        let varSup = nomeMonitor;
        setNomeMonitor("")
        array.push(varSup);

        console.log(array)
        setArrayMonitores(array);
        montarViewMonitores()

    }

    const montarViewMonitores = async () =>{
        let array = [];
        arrayMonitores == 0 ?
            array.push(<Text key={0} style={{ alignSelf: "center" }}>O nome dos monitores aparecerá aqui.</Text>) :
            (arrayMonitores.map((view, index) =>
                array.push(<View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}} key={index}>
                    <Text style={styles.nome_monitores_txt} >
                        {view}
                    </Text>
                    <TouchableOpacity onPress={()=> retirarMonitor(index)} style={styles.del_monitor_btn}><Text style={styles.del_monitor_txt}>-</Text></TouchableOpacity>
                </View>)))

        setViewMonitores([array])

    }

    const retirarMonitor = async (index) =>{
        let array = arrayMonitores;
        array.splice(index,1);
        setArrayMonitores(array);
        console.log(array)
        montarViewMonitores()

    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.voltar_btn, styles.sombra]} onPress={() => router.back("/eventos")}>
                <Text style={styles.voltar_txt}>Voltar</Text>
            </TouchableOpacity>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <Text style={styles.titulo}>Cadastrar Monitoria</Text>
            <ScrollView style={{ flexGrow: 1 }}>

                <TextInput
                    style={[styles.nome_evento_txt, styles.sombra]}
                    placeholder="Nome da Monitoria"
                    maxLength={60}
                    value={nomeEvento}
                    onChangeText={(text) => {
                        setNomeEvent(text)
                    }}
                />
                <TextInput
                    style={[styles.desc_evento_txt, styles.sombra]}
                    placeholder="Descrição do evento"
                    multiline={true}
                    numberOfLines={3}
                    maxLength={500}
                    textAlignVertical="top"
                    value={descricaoEvent}
                    onChangeText={(text) => {
                        setDescricao(text)
                    }}
                />
                <TextInput
                    style={[styles.nome_evento_txt, styles.sombra]}
                    placeholder="Local"
                    maxLength={60}
                    value={localMonitoria}
                    onChangeText={(text) => {
                        setLocalMonitoria(text)
                    }}
                />
                <View style={styles.monitores_view}>
                    <TextInput
                        style={[styles.nome_monitores_input, styles.sombra]}
                        placeholder="Monitores"
                        maxLength={60}
                        value={nomeMonitor}
                        onChangeText={(text) => {
                            setNomeMonitor(text)
                        }}
                    />
                    <TouchableOpacity onPress={() => addMonitoresArray()} style={styles.add_btn}><Text style={styles.add_txt}>+</Text></TouchableOpacity>
                </View>
                <View>
                    {viewMonitores}
                </View>

                <Text style={styles.time_text_view}>Selecione os Dias</Text>
                <View style={styles.dia_semana_view}>
                    <TouchableOpacity style={bolDiasSemana.segunda ? styles.dia_semana_btn_selecionado : styles.dia_semana_btn} onPress={() => atualizarDiaSemana('segunda', !bolDiasSemana.segunda)}>
                        <Text style={bolDiasSemana.segunda ? styles.dia_semana_selecionado : styles.dia_semana}>Segunda-Feira</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={bolDiasSemana.terça ? styles.dia_semana_btn_selecionado : styles.dia_semana_btn} onPress={() => atualizarDiaSemana('terça', !bolDiasSemana.terça)}>
                        <Text style={bolDiasSemana.terça ? styles.dia_semana_selecionado : styles.dia_semana}>Terça-Feira</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={bolDiasSemana.quarta ? styles.dia_semana_btn_selecionado : styles.dia_semana_btn} onPress={() => atualizarDiaSemana('quarta', !bolDiasSemana.quarta)}>
                        <Text style={bolDiasSemana.quarta ? styles.dia_semana_selecionado : styles.dia_semana}>Quarta-Feira</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={bolDiasSemana.quinta ? styles.dia_semana_btn_selecionado : styles.dia_semana_btn} onPress={() => atualizarDiaSemana('quinta', !bolDiasSemana.quinta)}>
                        <Text style={bolDiasSemana.quinta ? styles.dia_semana_selecionado : styles.dia_semana}>Quinta-Feira</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={bolDiasSemana.sexta ? styles.dia_semana_btn_selecionado : styles.dia_semana_btn} onPress={() => atualizarDiaSemana('sexta', !bolDiasSemana.sexta)}>
                        <Text style={bolDiasSemana.sexta ? styles.dia_semana_selecionado : styles.dia_semana}>Sexta-Feira</Text>
                    </TouchableOpacity>
                </View>



                <Text style={styles.time_text_view}>Selecione o Horário</Text>
                <View style={styles.time_view}>
                    <TouchableOpacity style={[styles.time_btn, styles.sombra]} onPress={() => setOpenTimeInicio(true)}>
                        <Text style={styles.time_btn_txt}>

                            {String(timeInicio.toLocaleString()).length == 21? 
                            (String(timeInicio.toLocaleString()).split(",")[1].slice(0, -6)+" "+
                            String(timeInicio.toLocaleString()).split(",")[1].slice(-2)):
                            String(timeInicio.toLocaleString()).split(",")[1].slice(0, -6)+":"+
                            String(timeInicio.toLocaleString()).split(",")[1].slice(-5,-3)
                            }


                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.time_txt}>-</Text>
                    <TouchableOpacity style={[styles.time_btn, styles.sombra]} onPress={() => setOpenTimeFim(true)}>
                        <Text style={styles.time_btn_txt}>
                        {String(timeFim.toLocaleString()).length == 21? 
                            (String(timeFim.toLocaleString()).split(",")[1].slice(0, -6)+" "+
                            String(timeFim.toLocaleString()).split(",")[1].slice(-2)):
                            String(timeFim.toLocaleString()).split(",")[1].slice(0, -6)+":"+
                            String(timeFim.toLocaleString()).split(",")[1].slice(-5,-3)
                            }
                        </Text>
                    </TouchableOpacity>
                </View>

                {openTimeInicio ? (
                    <DateTimePicker
                        testID="dateTimePicker"
                        positiveButton={{label: 'OK', textColor: '#2A72FD'}}
                        negativeButton={{label: 'CANCELAR', textColor: '#2A72FD'}}
                        value={timeInicio}
                        is24Hour={true}
                        // locale="pt-BR"
                        mode="time"
                        display="default"
                        themeVariant="dark"
                        onChange={(evt, selectedDate) => {
                            if (evt.type == "set") {
                                console.log("-----------")
                                console.log(selectedDate)
                                setTimeInicio(selectedDate)
                                console.log(timeInicio)
                                setOpenTimeInicio(false)
                            } else {
                                setOpenTimeInicio(false)
                            }
                        }}
                    />
                ) : <></>}

                {openTimeFim ? (
                    <DateTimePicker
                        testID="dateTimePicker"
                        positiveButton={{label: 'OK', textColor: '#2A72FD'}}
                        negativeButton={{label: 'CANCELAR', textColor: '#2A72FD'}}
                        value={timeFim}
                        is24Hour={true}
                        mode="time"
                        // locale="pt-BR"
                        display="default"
                        themeVariant="dark"
                        onChange={(evt, selectedDate) => {
                            if (evt.type == "set") {
                                console.log(selectedDate)
                                setOpenTimeFim(false)
                                setTimeFim(selectedDate)
                            } else {
                                setOpenTimeFim(false)
                            }
                        }}
                    />
                ) : <></>}
                <TouchableOpacity style={[styles.sombra, styles.confirm_btn]} onPress={() => enviarDadosBanco()}>
                    <Text style={styles.confirm_btn_text}>Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                style={styles.modal}
                animationType="slide"
                
                visible={modalVisivel}
                
                onRequestClose={() => {
                    router.back('/monitoria')
                }}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View style={styles.view_modal}>
                        <Text style={styles.desconect_modal_text}>Você cadastrou a monitoria com sucesso!</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={[styles.modal_button_desconect,styles.sombra]} onPress={() => router.back("/monitoria")}>
                                <Text style={styles.text_button_modal_desconect}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ECF5FF"
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
    voltar_btn: {
        backgroundColor: "#FFF",
        width: "20%",
        justifyContent: "center",
        alignItems: "center",
        padding: 6,
        borderRadius: 30,
        marginTop: "5%",
        marginStart: "5%"
    },
    voltar_txt: {
        fontFamily: "Poppins-Bold",
        fontSize: 18
    },
    titulo: {
        alignSelf: "center",
        fontFamily: "Poppins-Extra-Bold",
        fontSize: 30,
        color: "#2A72FD",
    },
    nome_evento_txt: {
        backgroundColor: "#FFF",
        width: "80%",
        height: 30,
        textAlign: "center",
        alignSelf: "center",
        borderRadius: 30,
        marginTop: "5%"
    },
    nome_monitores_input:{
        backgroundColor: "#FFF",
        width: "70%",
        height: 30,
        textAlign: "center",
        alignSelf: "center",
        borderRadius: 30,
        marginTop: "5%"
    },
    nome_monitores_txt: {
        backgroundColor: "#FFF",
        width: "60%",
        height: 30,
        textAlign: "center",
        alignSelf: "center",
        borderRadius: 30,
        marginTop: "5%",
        color:"#2A72FD",
        fontFamily: "Poppins-Bold",
        fontSize: 16,
    },
    time_view: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    time_btn: {
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: "30%",
        backgroundColor: "#FFF"
    },
    time_btn_txt: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: "#2A72FD",
    },
    time_txt: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: "#2A72FD",
        margin: "5%"
    },
    time_text_view: {
        marginTop: "6%",
        alignSelf: "center",
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: "#2A72FD",
    },
    desc_evento_txt: {
        padding: 10,
        marginTop: "5%",
        marginBottom: "5%",
        backgroundColor: "#FFF",
        width: "80%",
        height: 200,
        textAlign: "left",
        alignSelf: "center",
        borderRadius: 10
    },
    monitores_view: {
        flexDirection: "row",
        justifyContent: "center",
    },
    add_btn: {
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        width: "10%",
        marginTop: "5%"

    },
    add_txt: {
        fontSize: 20,
        textAlign: "auto",
        fontFamily: "Poppins-Bold",
        fontSize: 22
    },
    dia_semana_selecionado: {
        fontFamily: "Poppins-Bold",
        color: "#FFF",
    },
    dia_semana_view: {
        justifyContent: "center",
        alignItems: "center"
    },
    dia_semana_btn: {
        margin: 5,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: "30%",
        backgroundColor: "#FFF"
    },
    dia_semana_btn_selecionado: {
        margin: 5,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center",
        height: 40,
        width: "30%",
        backgroundColor: "#2A72FD"
    },
    confirm_btn: {
        width: "40%",
        padding: 8,
        backgroundColor: "#FFF",
        margin: 10,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 20

    },
    confirm_btn_text: {
        fontSize: 18,
        fontFamily: "Poppins-Bold",
        textAlign: "center",
        color: "#2A72FD",
        },
    del_monitor_btn:{
        backgroundColor: "#FFF",
        width: "8%",
        height: 30,
        alignSelf: "center",
        justifyContent:"center",
        alignItems:"center",
        borderRadius: 30,
        marginTop: "5%",
        color:"#2A72FD",
        marginStart:"2%",
        fontFamily: "Poppins-Bold",
    },
    del_monitor_txt:{
        fontFamily: "Poppins-Bold",
        textAlign:"center",
        textAlignVertical:"center",
        fontSize:20

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