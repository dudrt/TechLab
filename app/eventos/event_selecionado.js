import { View, Text, TouchableOpacity, Image } from "react-native"
import { useNavigation, useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import db from "../firebase";

export default function EventoSelecionado() {

    const { id } = useLocalSearchParams();
    const [infos, setInfos] = useState(null)
    useEffect(() => {
        PegarInfos()
    }, [])

    const PegarInfos = async () => {

        const docRef = doc(db, "eventos", id);
        const docSnap = await getDoc(docRef);
        const json = docSnap.data()
        setInfos(json)
    }

    return (
        <View>
            <TouchableOpacity>
                <Text>Voltar</Text>
            </TouchableOpacity>
            {infos == null ? (<></>) : (
                <View>
                    <View>
                        <Image source={require("../../img/fmp.png")}/>
                        <Text>{infos.nome}</Text>
                    </View>
                    <View>
                        <Text>{infos.descricao}</Text>
                    </View>
                </View>
            )}
        </View>
    )
}