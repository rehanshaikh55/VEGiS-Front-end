import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'

const DeliveryOrderItem:FC<{item:string;index:number}> = ({index,item}) => {
  return (
    <View>
      <Text>DeliveryOrderItem</Text>
    </View>
  )
}

export default DeliveryOrderItem

const styles = StyleSheet.create({})