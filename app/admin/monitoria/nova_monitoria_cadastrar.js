import { View, TouchableOpacity, TextInput, ScrollView, StyleSheet, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { router } from "expo-router";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';


export default function NovaMonitoria() { 


    const [setNomeEvento, nomeEvent] = useState("")
    const [setNomeMonitor, nomeMonitor] = useState("")
    const [setArrayMonitores, arrayMonitores] = useState("A")
    const [descricaoEvent, setDescricao] = useState("")
    const [date, setDate] = useState(new Date());
    const [dateSelecionado, setDateSelecionado] = useState(false)
    const [dateArrumado, setDateArrumado] = useState("")
    const [openDate, setOpenDate] = useState(false)
    const [openTimeInicio, setOpenTimeInicio] = useState(false)
    const [timeInicio, setTimeInicio] = useState(new Date())
    const [openTimeFim, setOpenTimeFim] = useState(false)
    const [timeFim, setTimeFim] = useState(new Date())
    
    

    console.log(arrayMonitores)
    
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
                <View style={styles.monitores_view}>
                <TextInput
                    style={[styles.nome_monitores_txt, styles.sombra]}
                    placeholder="Monitores"
                    maxLength={60}
                    value={nomeMonitor}
                    onChangeText={(text) => {
                        setNomeMonitor(text)
                    }}
                />
                <TouchableOpacity style={styles.add_btn}><Text style={styles.add_txt}>+</Text></TouchableOpacity>
                </View>
                <View>
                    {arrayMonitores == "A" ? (<Text>O nome dos monitores aparecerá aqui.</Text>):(<Text>Não é vazio {arrayMonitores}.</Text>)
                   }
                </View>
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

            </ScrollView>
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
    nome_monitores_txt: {
        backgroundColor: "#FFF",
        width: "70%",
        height: 30,
        textAlign: "center",
        alignSelf: "center",
        borderRadius: 30,
        marginTop: "5%"
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
    monitores_view:{
        flexDirection:"row",
        justifyContent:"center",
    },
    add_btn:{
        height: 30,
        justifyContent:"center",
        alignItems:"center",
        width: "10%",
        marginTop: "5%"
        
    },
    add_txt:{
        fontSize:20,
        textAlign:"auto",
        fontFamily: "Poppins-Bold",
        fontSize: 22
    }
})