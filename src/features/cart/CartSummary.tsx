import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { screenHeight, screenWidth } from '@utils/Scaling'
import { Colors } from '@utils/Constants'

interface CartSummaryProps{
    cartCount:number
    cartImage:string
}

const CartSummary:FC<CartSummaryProps> = ({cartCount,cartImage}) => {

  return (
    <View>
      <Text>CartSummary</Text>
    </View>
  )
}

export default CartSummary

const styles = StyleSheet.create({
    container:{
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection:'row',
        paddingHorizontal:screenWidth * 0.05,
        paddingBottom:screenHeight * 0.03,
        paddingTop:screenHeight * 0.014,
    },
    flexRowGap:{
        alignItems:'center',
        flexDirection:'row',
        gap:screenWidth* 0.03
    },
    image:{
        width:screenWidth * 0.1,
        height:screenHeight * 0.1,
        borderRadius:screenWidth * 0.025,
        borderColor:Colors.border,
        borderWidth:1
    },
    btn:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        paddingVertical:screenHeight*0.01,
        borderRadius:screenWidth*0.025,
        backgroundColor:Colors.secondary,
        paddingHorizontal:screenWidth *0.1
    },btnText:{
        marginLeft:screenWidth*0.02,
        color:'#fff'
    }

})