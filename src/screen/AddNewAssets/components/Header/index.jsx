import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'; 
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
const Header = () => {
    const navigation = useNavigation();
  return (
    <View style={{paddingHorizontal: 10 , flexDirection: "row"}}>
        <TouchableOpacity style={{flexDirection : "row"}} onPress={() =>navigation.navigate("Portfolio")}>
    <Ionicons name="arrow-back-sharp" size={28} color="white" />
    <Text style={styles.headerTitle}>Back</Text>
    </TouchableOpacity>
    <View>
        <Text style={styles.headerTxt}>Add New Assets</Text>
    </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    headerTitle: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 1,
    },
    headerTxt: 
        {color: "white",
         fontWeight: "bold",
         fontSize: 20,
        marginLeft: 50,        
        }
    
})