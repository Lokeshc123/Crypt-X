import { StyleSheet, Text, View } from 'react-native'
import React, {Suspense} from 'react'
import PortfolioAssetsList from './components/AssetsPortfolio'

const Portfolio = () => {
  return (
    <View>
      <Suspense fallback={<Text>Loading</Text>}>
      <PortfolioAssetsList />
      </Suspense>
    </View>
  )
}

export default Portfolio

const styles = StyleSheet.create({})