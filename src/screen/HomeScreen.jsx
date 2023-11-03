import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, View, Text } from "react-native";
import CoinItem from "../components/CoinItem";
import { getMarketData } from "../api/request";
import { fetchCoins,fetchHistorial } from "../api/Details";
const HomeScreen = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);

  const [requestCount, setRequestCount] = useState(0);
 
  
  const [lastRequestTime, setLastRequestTime] = useState(0);
  const fetchCoin= async () => {
    if (loading) {
      return;
    }
    const now = Date.now();
    if (now - lastRequestTime < 60000) { // Within a minute
      if (requestCount >= 30) { // Reached rate limit
        return;
      }
    } else {
      // Reset if it's been more than a minute since the last request
      setRequestCount(0);
    }
    setLoading(true);
    const coinsData = await getMarketData();
   
    setCoins(coinsData);
    setRequestCount(prevCount => prevCount + 1);
    setLastRequestTime(now);
    setLoading(false);
  };
 
  const refetchCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const coinsData = await getMarketData();
    setCoins(coinsData);
    setLoading(false);
  };
  
  useEffect(() => {
     fetchCoin();
     
  
  }, []);
   
  return (
    <View >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
        <Text style={{ color: "white", fontSize: 25, letterSpacing: 1, paddingHorizontal: 20, paddingBottom: 5 }}>Cryptoassets</Text>
        <Text style={{color: 'lightgrey', fontSize: 12, paddingHorizontal: 10}}>Powered by CoinGecko</Text>
      </View>
      <FlatList
        data={coins}
        contentContainerStyle={{ paddingBottom: 30 }}
        renderItem={({ item }) => <CoinItem marketCoin={item} key={item.id} />}
        
        refreshControl={
          <RefreshControl
            refreshing={loading}
            tintColor="white"
            onRefresh={refetchCoins}
          />
        }
      />
    </View>
  );
};

export default HomeScreen;