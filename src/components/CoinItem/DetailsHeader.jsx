import { StyleSheet, Text, View , Image} from 'react-native'
import React from 'react'
import { Ionicons, EvilIcons , FontAwesome} from "@expo/vector-icons";
import Coin from  "../../../assets/data/crypto.json"
import { useNavigation } from '@react-navigation/native';
import { useWatch  } from '../../screen/Contexts/WatchContext';
const DetailsHeader = (props) => {
    const {image , name , symbol , marketCapRank , coinId} = props;
    const navigation = useNavigation();

  const { watchCoinIds , storeWatchCoinId ,   removeWatchCoinId } = useWatch();
    const checkFavourite = () => {
     return watchCoinIds.some((coinIdValue) => coinIdValue === coinId)
    };
    const handleFav = () => {
     if(checkFavourite()){
       removeWatchCoinId(coinId);
     }
      else{
        storeWatchCoinId(coinId);
      }
    };
  return (
    <View style={styles.headerContainer}>
     <Ionicons name="chevron-back-sharp" size={30} color="white"  onPress={() => navigation.navigate("Home")}/>
     <View style={{flexDirection: "row" , alignItems: "center"}}>
     <Image source={{uri: image}} style={{width: 25, height: 25}}/> 
     <Text style={{color: "white", fontWeight: "bold", marginHorizontal: 5 , fontSize: 17}}>{symbol.toUpperCase()}</Text>
     <View style={{backgroundColor: "#585858" , paddingHorizontal: 5, paddingVertical: 2 , borderRadius: 5}}>
     <Text style={{color: "white", fontWeight: "bold" , fontSize: 15}}># {marketCapRank}</Text>
     </View>
     </View>
        <FontAwesome name={checkFavourite() ? "star" : "star-o"} size={25} color={checkFavourite() ? "#FFBF00" : "white"} onPress={handleFav}/>
    </View>
  )
}

export default DetailsHeader

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row" ,
        paddingHorizontal: 10 ,
        alignItems: "center" ,
        justifyContent: "space-between"
        }
})