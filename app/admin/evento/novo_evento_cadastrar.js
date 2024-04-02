import { View, StyleSheet, TextInput, Touchable, Text, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';

export default function CadastrarEvento() {
    // const [date, setDate] = useState(new Date())
    const [date, setDate] = useState(new Date());
    const [open, setOpen] = useState(false)

    const onChange = (event, selectedDate) => {
        if(event.type == "set"){
            setOpen(false)
            //confirmou
        }else{
            setOpen(false)
        }
        console.log(event.type,selectedDate)
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);
    };
    return (
        <View style={styles.container}>
            <StatusBar style="dark" backgroundColor="#ECF5FF" />
            <TextInput
                placeholder="Nome do evento"
            />
            <TextInput
                placeholder="Descrição do evento"
            />
            <TextInput
                placeholder="Horas complementares"
            />
            <TouchableOpacity onPress={() => setOpen(true)}>
                <Text>Data</Text>
            </TouchableOpacity>
            {open?(
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="time"
                display="clock"
                is24Hour={true}
                onChange={onChange}
            />
            ):<></>}




        </View>
    )
}

const styles = new StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ECF5FF",

    }
})