import { View,StyleSheet,Image, TouchableOpacity } from "react-native";
import { router } from "expo-router";



export default function Navigation(){

    return(
        <View style={styles.container}>
            <TouchableOpacity style={styles.home} onPress={()=>router.replace("/inicio")}>
                <Image style={styles.img}  resizeMode="contain" source={require("../../img/home.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.home} onPress={()=>router.replace("/inicio")}>
                <Image style={styles.img} resizeMode="contain" source={require("../../img/config.png")}></Image>            
            </TouchableOpacity>
        </View>
    )
}


const styles = new StyleSheet.create({
    container:{
        position:"absolute",
        bottom:0,
        width:"100%",
        height:80,
        backgroundColor:"#B2CDFF",
        flexDirection:"row"
    },
    home:{
        alignItems:"center",
        justifyContent:"center",
        width:"50%",
        height:"100%"
    },
    img:{
        width:"100%",
        height:"50%"
    },
    

})