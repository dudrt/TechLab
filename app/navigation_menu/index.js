import { View,Text,StyleSheet,Image } from "react-native";



export default function Navigation(){

    return(
        <View style={styles.container}>
            <Image style={styles.home} resizeMode="contain" source={require("../../img/home.png")}></Image>
            <Image style={styles.home} resizeMode="contain" source={require("../../img/config.png")}></Image>
        </View>
    )
}


const styles = new StyleSheet.create({
    container:{
        position:"absolute",
        bottom:0,
        width:"100%",
        height:"9%",
        backgroundColor:"#B2CDFF",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row"
    },
    home:{
        width:"50%",
        height:"65%"
    }

})