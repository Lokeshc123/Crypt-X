import { StyleSheet, Text, View } from 'react-native'
import React , { useContext, createContext , useState, useEffect }from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
const WatchContext = createContext();

export const useWatch =() => useContext(WatchContext);
const WatchListProvider = ({children}) => {

  const [watchCoinIds, setwatchCoinIds] = useState([]);
  const getWatchListData  = async () => {
  try{
  const jsonValue = await AsyncStorage.getItem('@watchlist_coins');
  setwatchCoinIds(jsonValue != null ? JSON.parse(jsonValue) : []);       
  } catch(e){
    console.log(e);
  }
  };
    useEffect(() =>{
  
  getWatchListData();
    }
    ,[])

    const storeWatchCoinId = async (coinId) => {
try{
const newWatchList = [...watchCoinIds, coinId];
const jsonValue = JSON.stringify( newWatchList);   
await AsyncStorage.setItem('@watchlist_coins', jsonValue); 
setwatchCoinIds(newWatchList); 
} catch(e){
  console.log(e);
};
    }
const removeWatchCoinId = async (coinId) => {
  try{
const newWatchList = watchCoinIds.filter((id) => id !== coinId);
const jsonValue = JSON.stringify( newWatchList);
await AsyncStorage.setItem('@watchlist_coins', jsonValue);
setwatchCoinIds(newWatchList);
  } catch (e){
    console.log(e);
  }
    };
  return (
   <WatchContext.Provider value={{watchCoinIds , storeWatchCoinId, removeWatchCoinId}}>
      {children}
    </WatchContext.Provider>
  )
}

export default WatchListProvider

const styles = StyleSheet.create({})