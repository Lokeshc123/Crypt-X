import { StyleSheet, Text, View , FlatList , RefreshControl} from 'react-native'
import React , {useState, useEffect}  from 'react'
import { useWatch } from '../Contexts/WatchContext' 
import CoinItem from '../../components/CoinItem';
import { getWatchlistedCoins } from '../../api/request';

const WatchList = () => {
  const { watchCoinIds } = useWatch();
  const [coin , setCoin] = useState([]);
  const [loading , setLoading] = useState(false);
  const transformCoinIds = () => watchCoinIds.join("%2C");
  const fetchWatchlistedCoins = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const watchlistedCoinsData = await getWatchlistedCoins(1, transformCoinIds());
   
    setCoin(watchlistedCoinsData);
 
    setLoading(false);
  };

  useEffect(() => {
    
      fetchWatchlistedCoins();
    console.log(coin.length)
  },[watchCoinIds]);


  return (
    
   <FlatList 
   data = {coin}
renderItem= {({item}) => <CoinItem  marketCoin={item} />}
  refreshControl={
    <RefreshControl
      refreshing={loading}
      tintColor="white"
      onRefresh={fetchWatchlistedCoins}
    />
  }
   
    />
  )
}

export default WatchList

const styles = StyleSheet.create({})