import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, {useState,useEffect} from 'react'
import Header from './components/Header'
import SearchableDropDown from 'react-native-searchable-dropdown'
import { getAllCoins, getDetailedCoinData, getMarketData } from '../../api/request'
import { fetchCoins } from '../../api/Details'
import { useRecoilState } from 'recoil'
import { useNavigation } from '@react-navigation/native'
import { allPortfolioBoughtAssetsInStorage } from '../../atoms/PortfolioAssets'
import AsyncStorage from '@react-native-async-storage/async-storage'
import uuid from 'react-native-uuid';
const AddNewAssets = () => {
  const navigation = useNavigation();
  const [bougthQuantity, setBougthQuantity] = useState("0");
  const [coins , setCoins] = useState([]);
  const [loading , setLoading] = useState(false);
  const [selectedCoinId , setSelectedCoinId] = useState(null);
  const [selectedCoin , setSelectedCoin] = useState(null);
  const [assetsInStorage, setAssetsInStorage] = useRecoilState(
    allPortfolioBoughtAssetsInStorage
  );
  const onAddNewAsset = async () => {
    if (!selectedCoin) {
      // handle error or return early
      console.error('Selected coin is not available');
      return;
    }
   
    const newAsset = {
      id: selectedCoin.id,
      unique_id: selectedCoin.id + uuid.v4(),
      name: selectedCoin.name,
      image: selectedCoin.image.small,
      ticker: selectedCoin.symbol,
      quantityBought: parseFloat(bougthQuantity),
      priceBought: selectedCoin.market_data.current_price.usd,
    };
  
    const newAssets = [...assetsInStorage, newAsset];
    const jsonValue = JSON.stringify(newAssets);
  
    try {
      await AsyncStorage.setItem("@portfolio_coins", jsonValue);
      setAssetsInStorage(newAssets);
      navigation.goBack();
    } catch (error) {
      console.error('Error saving asset to AsyncStorage:', error);
      // Handle error (e.g., show an error message to the user)
    }
  };
  


  const fetchingCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const fetchedCoins = await getAllCoins();
    setCoins(fetchedCoins);
    
    setLoading(false);
  }
  const fetchCoinInfo = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinInfo = await getDetailedCoinData(selectedCoinId);
    setSelectedCoin(coinInfo);
    setLoading(false);
  };
  useEffect(() => {
    fetchingCoins();
  },[]);

const isQuantityEntered = () => bougthQuantity === "0";
useEffect(() => {
  if (selectedCoinId) {
    fetchCoinInfo();
  }
}, [selectedCoinId]);
  return (
    <View style={{flex: 1}}>
     <Header />
     <SearchableDropDown  
     containerStyle={{
      width: "100%",
      paddingHorizontal : 10,
      paddingVertical : 20,
     }}
     itemStyle={{ 
      padding: 10,
      marginTop: 2,
      backgroundColor: "#1e1e1e",
      borderWidth: 1,
      borderColor: "#444444",
      borderRadius: 5,
     }}
     onItemSelect={(item) => setSelectedCoinId(item.id)}
     itemTextStyle={{ color: "#fff" }}
     items={coins}
     resetValue={false}
     placeholder={selectedCoinId || "Select a coin"}
     placeholderTextColor="#fff"
     textInputProps = {{
      underlineColorAndroid: "transparent",
      style: {
        padding: 12,
        borderWidth: 1.5,
        borderColor: "#444444",
        borderRadius: 5,
        backgroundColor: "#1e1e1e",
        color: "#fff",  
      },  
     }}
     />
    
    {selectedCoin ? (
      <>
        <View style={styles.boughtQuantityContainer}>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              value={bougthQuantity}
              keyboardType="numeric"
              style={{ color: 'white', fontSize: 80 }}
              onChangeText={setBougthQuantity}
            />
            <Text style={styles.ticker}>
              {selectedCoin.symbol ? selectedCoin.symbol : 'Symbol Unavailable'}
            </Text>
          </View>
          <Text style={styles.pricePerCoin}>
            ${selectedCoin.market_data?.current_price?.usd || 'Price Unavailable'} per coin
          </Text>
        </View>
        <Pressable
          style={styles.btn}
          onPress={onAddNewAsset}
          disabled={isQuantityEntered()}
        >
          <Text style={styles.btntxt}>Add New Assets</Text>
        </Pressable>
      </>
    ) : null}





        
    </View>
  )
}

export default AddNewAssets

const styles = StyleSheet.create({
  ticker: {
    color: "grey",
    fontWeight: "700",
    fontSize: 20,
     marginTop: 25,
    marginLeft: 5
  },
  boughtQuantityContainer: {
alignItems: "center",
marginTop: 50,
flex: 1
  },
  btn: {
    backgroundColor: "#4169E1",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
    borderRadius: 5,
        },
        btntxt: {
    color: "white",
    fontWeight: "600",
    fontSize: 17,
        },
        pricePerCoin: {
          color: "grey",
          fontWeight: "700",
          fontSize: 17,
          letterSpacing: 0.5
        }
})