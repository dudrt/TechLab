import { View, StyleSheet, TextInput, Touchable, Text, TouchableOpacity, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState,useEffect } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from "expo-router";

export default function CadastrarEvento() {

    const [date, setDate] = useState(new Date());
    const [dateSelecionado,setDateSelecionado] = useState(false)
    const [dateArrumado , setDateArrumado] = useState()
    const [open, setOpen] = useState(false)
    const [horasComplementares, setHorasComplementares] = useState(0)
    

    const mudarData = async (data)=>{
        
        data = String(data.toLocaleString())
        let dataArray = data.split(",")[0].split("/")
        
        setDateArrumado(`${dataArray[1]}/${dataArray[0]}/${dataArray[2]}`)
    }








    return (
        <View style={styles.container}>
            <TouchableOpacity style={[styles.voltar_btn,styles.sombra]} onPress={()=>router.back("/eventos")}>
                <Text style={styles.voltar_txt}>Voltar</Text>
            </TouchableOpacity>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <Text style={styles.titulo}>Adicionar Evento</Text>
            <ScrollView style={{ flexGrow: 1 }}>

                <TextInput
                    style={[styles.nome_evento_txt, styles.sombra]}
                    placeholder="Nome do evento"
                    maxLength={30}
                />
                <TextInput
                    style={[styles.desc_evento_txt, styles.sombra]}
                    placeholder="Descrição do evento"
                    multiline={true}
                    numberOfLines={3}
                    maxLength={500}
                    textAlignVertical="top"
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
                
                <TouchableOpacity style={[styles.data_btn,styles.sombra]} onPress={() => setOpen(true)}>
                    <Text style={styles.data_txt}>Selecionar Data</Text>
                </TouchableOpacity>
                {open ? (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode="date"
                        display="default"
                        dateFormat="dayofweek day month"
                        themeVariant="dark"
                        minimumDate={new Date()}
                        onChange={(evt, selectedDate) => {
                            if(evt.type=="set"){
                                setOpen(false)
                                setDate(selectedDate)
                                mudarData(selectedDate);
                                setDateSelecionado(true)
                            }else{
                                setOpen(false)
                            }
                          }}
                    />
                ) : <></>}
                <Text style={styles.data_arrumada_txt}>{dateSelecionado?"Data Selecionada:\n"+dateArrumado:"Selecione uma data"}</Text>
                
                <TouchableOpacity onPress={()=> confirmarDados()} style={[styles.conf_btn,styles.sombra]}>
                    <Text style={styles.conf_txt}>Confirmar</Text>
                </TouchableOpacity>
            </ScrollView>
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
        elevation: 9,
    },
    nome_evento_txt: {
        backgroundColor: "#FFF",
        width: "80%",
        height: 30,
        textAlign: "center",
        alignSelf: "center",
        borderRadius: 30,
        marginTop:"5%"
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
    horas_comp_txt:{
        alignSelf:"center",
        fontFamily: "Poppins-Bold",
        fontSize:20,
        color:"#2A72FD"
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
        marginStart:20,
        marginEnd: 20,
        fontFamily: "Poppins-Bold",
        fontSize: 20
    },
    data_btn:{
        marginTop:"5%",
        backgroundColor:"#FFF",
        width:"50%",
        padding:8,
        alignSelf:"center",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:40
    },
    data_txt:{
        fontFamily: "Poppins-Bold",
        color: "#2A72FD",
        fontSize: 20,
    },
    data_arrumada_txt:{
        marginTop:"3%",
        textAlign:"center",
        fontFamily: "Poppins",
        alignSelf:"center",
        fontSize:18,
    },
    voltar_btn:{
        backgroundColor:"#FFF",
        width:"20%",
        justifyContent:"center",
        alignItems:"center",
        padding:6,
        borderRadius:30,
        marginTop:"5%",
        marginStart:"5%"
    },
    voltar_txt:{
        fontFamily: "Poppins-Bold",
        fontSize:18
    },
    conf_btn:{
        backgroundColor:"#FFF",
        width:"50%",
        justifyContent:"center",
        alignItems:"center",
        alignSelf:"center",
        padding:6,
        borderRadius:30,
        marginTop:"5%",
        marginBottom:"5%",
        marginStart:"5%"
    },
    conf_txt:{
        fontFamily: "Poppins-Bold",
        fontSize:18,
        color: "#2A72FD",

    }
})