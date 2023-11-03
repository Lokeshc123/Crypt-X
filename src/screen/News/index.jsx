import { StyleSheet, Text, View } from 'react-native'
import React, {useState, useEffect} from 'react'
import { fetchNews } from '../../api/Details'
import { FlatList } from 'react-native';
import NewsItem from './componets/NewsItem';
import { ActivityIndicator } from 'react-native';

const News = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDailyNews =  async () => {
    setLoading(true);
  const news = await fetchNews();
  setLoading(false);
  setNews(news);
  }
  useEffect(() => {
    fetchDailyNews();
  }, [])
  if (!news) {
    return null;
  }else {
    console.log(news);
  }
  if(loading) {
    return (
     <ActivityIndicator color="white" size="large"/>
    )
  }
  
  return (
    <View>
     <FlatList 
      data={news}
      renderItem={({item}) =><NewsItem name={item.name} imageUrl={item.image.thumbnail.contentUrl}/>}
      keyExtractor={(item) => item.id}
      />
    </View>
  )
}

export default News

const styles = StyleSheet.create({})