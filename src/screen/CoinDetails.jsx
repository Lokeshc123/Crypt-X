import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Dimensions,
  TextInput,
  ActivityIndicator,
  StyleSheet,
  Pressable
} from "react-native";
import DetailsHeader from "../components/CoinItem/DetailsHeader"
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { LineChart, CandlestickChart } from "react-native-wagmi-charts";
import { useRoute } from "@react-navigation/native";
import {
  getDetailedCoinData,
  getCoinMarketChart,
  getCandleChartData,
} from "../api/request";
import {fetchHistorial } from "../api/Details"
import { MaterialIcons } from "@expo/vector-icons";




const CoinDetailedScreen = () => {
  const navigation = useNavigation();
 
  const [coin, setCoin] = useState(null);
  const [coinMarketData, setCoinMarketData] = useState(null);
  const [coinCandleChartData, setCoinCandleChartData] = useState(null);
  const route = useRoute();
  const {
    params: { coinId },
  } = route;

  const [loading, setLoading] = useState(false);
  const [coinValue, setCoinValue] = useState("1");
  const [usdValue, setUsdValue] = useState("");
  const [selectedRange, setSelectedRange] = useState("1");
  const [isCandleChartVisible, setIsCandleChartVisible] = useState(false);

  const fetchCoinData = async () => {
    setLoading(true);
    const fetchedCoinData = await getDetailedCoinData(coinId);
    
    setCoin(fetchedCoinData);
    
   
    setUsdValue(fetchedCoinData.market_data.current_price.usd.toString());
    
    setLoading(false);
    
  };

const [historical, setHistorical] = useState([]);
const fetchCoinRankingData = async () => {
  setLoading(true);
  const coins = await fetchHistorial();
  setHistorical(coins);
  setLoading(false);
};
console.log(historical.length);

   const fetchMarketCoinData = async (selectedRangeValue) => {
   const fetchedCoinMarketData = await getCoinMarketChart(
     coinId,
      selectedRangeValue
    );

    setCoinMarketData(fetchedCoinMarketData);
  };

 
  useEffect(() => {
    // Fetch data based on coinId change
    fetchCoinData();
    fetchMarketCoinData(1);
  }, [coinId]); // Add 'coinId' as a dependency
  
  useEffect(() => {
    // Fetch historical data
    fetchCoinRankingData();
  }, []); // No dependencies, will run once, fetching the historical data
 

  if (loading || !coin || !historical) {
    return <ActivityIndicator size="large" />;
  }

  if (!coinMarketData) {
    // You can return a loading indicator or some message here
    return <ActivityIndicator size="large" />;
  }

  const {
    id,
    image: { small },
    name,
    symbol,
    market_data: {
      market_cap_rank,
      current_price,
      price_change_percentage_24h,
    },
  } = coin;
  
  const { prices } = coinMarketData;

  const percentageColor =
    price_change_percentage_24h < 0 ? "#ea3943" : "#16c784" || "white";
  const chartColor = price_change_percentage_24h > 0 ? "#16c784" : "#ea3943";
  const screenWidth = Dimensions.get("window").width;

  const formatCurrency = ({ value }) => {
    "worklet";
    if (value === "") {
      if (current_price.usd < 1) {
        return ` $${current_price.usd}`;
      }
      return ` $${current_price.usd.toFixed(3)}`;
    }
    if (current_price.usd < 1) {
      return ` $${parseFloat(value)}`;
    }
    return ` $${parseFloat(value).toFixed(3)}`;
  };

  const changeCoinValue = (value) => {
    setCoinValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setUsdValue((floatValue * current_price.usd).toString());
  };

  const changeUsdValue = (value) => {
    setUsdValue(value);
    const floatValue = parseFloat(value.replace(",", ".")) || 0;
    setCoinValue((floatValue / current_price.usd).toString());
  };

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <LineChart.Provider
        data={prices.map(([timestamp, value]) => ({ timestamp, value }))}
      >
        <DetailsHeader
          coinId={id}
          image={small}
          symbol={symbol}
          marketCapRank={market_cap_rank}
        />
        <View style={styles.priceContainer}>
          <View>
            <Text style={styles.name}>{name}</Text>
            <LineChart.PriceText
              format={formatCurrency}
              style={styles.currentPrice}
            />
          </View>
          <View
            style={{
              backgroundColor: percentageColor,
              paddingHorizontal: 3,
              paddingVertical: 8,
              borderRadius: 5,
              flexDirection: "row",
            }}
          >
            <AntDesign
              name={price_change_percentage_24h < 0 ? "caretdown" : "caretup"}
              size={12}
              color={"white"}
              style={{ alignSelf: "center", marginRight: 5 }}
            />
            <Text style={styles.priceChange}>
              {price_change_percentage_24h?.toFixed(2)}%
            </Text>
          </View>
        </View>
       
          <LineChart height={screenWidth / 2} width={screenWidth}>
            <LineChart.Path color={chartColor} />
           
          </LineChart>
        

        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>
              {symbol.toUpperCase()}
            </Text>
            <TextInput
              style={styles.input}
              value={coinValue}
              keyboardType="numeric"
              onChangeText={changeCoinValue}
            />
          </View>

          <View style={{ flexDirection: "row", flex: 1 }}>
            <Text style={{ color: "white", alignSelf: "center" }}>USD</Text>
            <TextInput
              style={styles.input}
              value={usdValue}
              keyboardType="numeric"
              onChangeText={changeUsdValue}
            />
          </View>
        </View>
        <Pressable style={styles.btn} onPress={() =>navigation.navigate("NewAsset")}>
          <Text style={styles.btntxt}>Add New Assets</Text>
        </Pressable>
     
      </LineChart.Provider>
    </View>
  );
};

export default CoinDetailedScreen;
const styles = StyleSheet.create({
  currentPrice: {
    color: "white",
    fontSize: 30,
    fontWeight: "600",
    letterSpacing: 1,
  },
  name: {
    color: "white",
    fontSize: 15,
  },
  priceContainer: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceChange: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 10,
    fontSize: 16,
    color: "white",
  },
  filtersContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#2B2B2B",
    paddingVertical: 5,
    borderRadius: 5,
    marginVertical: 10,
    marginBottom: 20
  },
  candleStickText: {
    color: "white",
    fontWeight: "700",
  },
  candleStickDataContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    marginTop: 20,
  },
  candleStickTextLabel: {
    color: 'grey',
    fontSize: 13
  },
  btn: {
    backgroundColor: "#4169E1",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 25,
    marginHorizontal: 10,
    borderRadius: 5,
        },
        btntxt: {
    color: "white",
    fontWeight: "600",
    fontSize: 17,
        }
})
