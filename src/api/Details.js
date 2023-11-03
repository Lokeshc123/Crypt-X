import axios from "axios";
export const fetchHistorial = async () => {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "25832351f3mshf3e34e1e5c8cb45p1d5372jsn2af00fd1bdab",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  const params = new URLSearchParams({
    referenceCurrencyUuid: "yhjMzLPhuIDl",
    timePeriod: "24h",
  });

  try {
    const response = await fetch(
      `https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?${params}`,
      options
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error(error);
  }
};

export const fetchCoins = async () => {
  const options = {
    method: "GET",
    url: "https://coinranking1.p.rapidapi.com/coins",
    params: {
      referenceCurrencyUuid: "yhjMzLPhuIDl",
      timePeriod: "24h",
      "tiers[0]": "1",
      orderBy: "marketCap",
      orderDirection: "desc",
      limit: "50",
      offset: "0",
    },
    headers: {
      "X-RapidAPI-Key": "25832351f3mshf3e34e1e5c8cb45p1d5372jsn2af00fd1bdab",
      "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const { coins } = response.data.data;
    return coins;
  } catch (error) {
    console.error(error);
  }
};

export const fetchNews = async () => {
  const options = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news",
    params: {
      safeSearch: "Off",
      textFormat: "Raw",
    },
    headers: {
      "X-BingApis-SDK": "true",
      "X-RapidAPI-Key": "25832351f3mshf3e34e1e5c8cb45p1d5372jsn2af00fd1bdab",
      "X-RapidAPI-Host": "bing-news-search1.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);
    const { value } = response.data;
    return value;
  } catch (error) {
    console.error(error);
  }
};
