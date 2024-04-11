import { View, StyleSheet, ToastAndroid, Modal,TextInput, Text, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";
import { collection, addDoc} from "firebase/firestore";
import db from "../../firebase";

export default function CadastrarEvento() {

    const [date, setDate] = useState(new Date());
    const [dateSelecionado, setDateSelecionado] = useState(false)
    const [dateArrumado, setDateArrumado] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [openTimeInicio, setOpenTimeInicio] = useState(false)
    const [timeInicio ,setTimeInicio] = useState(new Date())
    const [openTimeFim, setOpenTimeFim] = useState(false)
    const [timeFim ,setTimeFim] = useState(new Date())

    const [horasComplementares, setHorasComplementares] = useState(0)
    const [descricaoEvent, setDescricao] = useState("")
    const [nomeEvent, setNomeEvento] = useState("")

    const [modalVisivel,setModalVisivel] = useState(false)
    const mudarData = async (data) => {

        data = String(data.toLocaleString())
        let dataArray = data.split(",")[0].split("/")

        setDateArrumado(`${dataArray[1]}/${dataArray[0]}/${dataArray[2]}`)
    }

    const confirmarDados = async () => {

        if (dateArrumado == "" || nomeEvent == "" || descricaoEvent == "" || horasComplementares == "" || String(timeInicio.toLocaleString()) == String(timeFim.toLocaleString())) {
            ToastAndroid.show('Verifique todos os campos!', ToastAndroid.SHORT);
            return false
        }


        const inicioEventoTemp =  String(timeInicio.toLocaleString()).split(",")[1].slice(0, -6) +   String(timeInicio.toLocaleString()).split(",")[1].slice(-2)
        const fimEventoTemp =  String(timeFim.toLocaleString()).split(",")[1].slice(0, -6) +   String(timeFim.toLocaleString()).split(",")[1].slice(-2)


        addDoc(collection(db, "eventos"), {
            nome:nomeEvent,
            descricao:descricaoEvent,
            horas_comp:horasComplementares,
            inicio_evento:inicioEventoTemp,
            fim_evento:fimEventoTemp,
            data_evento:dateArrumado
        })
        setModalVisivel(true)
    }






    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.voltar_btn, styles.sombra]} onPress={() => router.back("/eventos")}>
                <Text style={styles.voltar_txt}>Voltar</Text>
            </TouchableOpacity>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <Text style={styles.titulo}>Adicionar Evento</Text>
            <ScrollView style={{ flexGrow: 1 }}>

                <TextInput
                    style={[styles.nome_evento_txt, styles.sombra]}
                    placeholder="Nome do evento"
                    maxLength={30}
                    value={nomeEvent}
                    onChangeText={(text) => {
                        setNomeEvento(text)
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
                <Text style={styles.horas_comp_txt}>Horas Complementares</Text>
                <View style={styles.horas_comp_view}>
                    <TouchableOpacity style={styles.operacao_btn}
                        onPress={() => horasComplementares > 0 ? setHorasComplementares(horasComplementares - 1) : ""}>
                        <Text style={styles.operacao_simb}>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.horas_txt}>{horasComplementares}</Text>
                    <TouchableOpacity style={styles.operacao_btn}
                        onPress={() => setHorasComplementares(horasComplementares + 1)}>
                        <Text style={styles.operacao_simb}>+</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity style={[styles.data_btn, styles.sombra]} onPress={() => setOpenDate(true)}>
                    <Text style={styles.data_txt}>Selecionar Data</Text>
                </TouchableOpacity>
                {openDate ? (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        dateFormat="dayofweek day month"
                        themeVariant="dark"
                        minimumDate={new Date()}
                        onChange={(evt, selectedDate) => {
                            if (evt.type == "set") {
                                setOpenDate(false)
                                setDate(selectedDate)
                                mudarData(selectedDate);
                                setDateSelecionado(true)
                            } else {
                                setOpenDate(false)
                            }
                        }}
                    />
                ) : <></>}
                <Text style={styles.data_arrumada_txt}>{dateSelecionado ? "Data Selecionada:\n" + dateArrumado : "Selecione uma data"}</Text>
                
                <Text style={styles.time_text_view}>Selecione o Horário</Text>
                <View style={styles.time_view}>
                        <TouchableOpacity style={[styles.time_btn, styles.sombra]} onPress={() => setOpenTimeInicio(true)}>
                            <Text style={styles.time_btn_txt}>
                                {String(timeInicio.toLocaleString()).split(",")[1].slice(0, -6)}
                                {String(timeInicio.toLocaleString()).split(",")[1].slice(-2)}
                            </Text>
                        </TouchableOpacity>
                        <Text style={styles.time_txt}>-</Text>
                        <TouchableOpacity style={[styles.time_btn, styles.sombra]} onPress={() => setOpenTimeFim(true)}>
                            <Text style={styles.time_btn_txt}>
                                {String(timeFim.toLocaleString()).split(",")[1].slice(0, -6)}
                                {String(timeFim.toLocaleString()).split(",")[1].slice(-2)}
                            </Text>
                        </TouchableOpacity>
                </View>

                {openTimeInicio ? (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={timeInicio}
                        mode="time"
                        display="spinner"
                        themeVariant="dark"
                        onChange={(evt, selectedDate) => {
                            if (evt.type == "set") {
                                setTimeInicio(selectedDate)
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
                        value={timeFim}
                        mode="time"
                        display="spinner"
                        themeVariant="dark"
                        onChange={(evt, selectedDate) => {
                            if (evt.type == "set") {
                                setOpenTimeFim(false)
                                setTimeFim(selectedDate)
                            } else {
                                setOpenTimeFim(false)
                            }
                        }}
                    />
                ) : <></>}

                <TouchableOpacity onPress={() => confirmarDados()} style={[styles.conf_btn, styles.sombra]}>
                    <Text style={styles.conf_txt}>Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>
            <Modal
                style={styles.modal}
                animationType="slide"
                
                visible={modalVisivel}
                
                onRequestClose={() => {
                    router.back('/eventos')
                }}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center"}}>
                    <View style={styles.view_modal}>
                        <Text style={styles.desconect_modal_text}>Você cadastrou o evento com sucesso!</Text>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={[styles.modal_button_desconect,styles.sombra]} onPress={() => router.back("/eventos")}>
                                <Text style={styles.text_button_modal_desconect}>OK</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ECF5FF",

    },
    titulo: {
        alignSelf: "center",
        fontFamily: "Poppins-Extra-Bold",
        fontSize: 30,
        color: "#2A72FD",
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
    nome_evento_txt: {
        backgroundColor: "#FFF",
        width: "80%",
        height: 30,
        textAlign: "center",
        alignSelf: "center",
        borderRadius: 30,
        marginTop: "5%"
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
    horas_comp_txt: {
        alignSelf: "center",
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: "#2A72FD"
    },
    horas_comp_view: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    operacao_btn: {
        backgroundColor: "#FFF",
        width: "10%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    },
    operacao_simb: {
        textAlign: "center",
        textAlignVertical: "center",
        fontFamily: "Poppins-Bold",
        fontSize: 22
    },
    horas_txt: {
        marginStart: 20,
        marginEnd: 20,
        fontFamily: "Poppins-Bold",
        fontSize: 20
    },
    data_btn: {
        marginTop: "5%",
        backgroundColor: "#FFF",
        width: "50%",
        padding: 8,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 40
    },
    data_txt: {
        fontFamily: "Poppins-Bold",
        color: "#2A72FD",
        fontSize: 20,
    },
    data_arrumada_txt: {
        marginTop: "3%",
        textAlign: "center",
        fontFamily: "Poppins",
        alignSelf: "center",
        fontSize: 18,
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
    conf_btn: {
        backgroundColor: "#FFF",
        width: "50%",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        padding: 6,
        borderRadius: 30,
        marginTop: "5%",
        marginBottom: "5%",
        marginStart: "5%"
    },
    conf_txt: {
        fontFamily: "Poppins-Bold",
        fontSize: 18,
        color: "#2A72FD",

    },
    time_view: {
        width: "100%",
        flexDirection: "row",
        justifyContent:"center",
        alignItems:"center"
    },
    time_btn: {
        borderRadius:30,
        alignItems:"center",
        justifyContent:"center",
        height: 40,
        width:"30%",
        backgroundColor: "#FFF"
    },
    time_btn_txt: {
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: "#2A72FD",
    },
    time_txt:{
        fontFamily: "Poppins-Bold",
        fontSize: 14,
        color: "#2A72FD",
        margin:"5%"
    },
    time_text_view:{
        marginTop:"6%",
        alignSelf:"center",
        fontFamily: "Poppins-Bold",
        fontSize: 20,
        color: "#2A72FD",
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