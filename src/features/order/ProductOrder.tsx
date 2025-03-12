import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CustomHeader from '@components/ui/CustomHeader'
import { Colors, Fonts } from '@utils/Constants'
import OrderList from './OrderList'
import { CustomText } from '@components/ui/customText'
import  Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { RFValue } from 'react-native-responsive-fontsize'
import BillDetails from './BillDetails'
import { useCartStore } from '@state/cartStore'
import { useAuthStore } from '@state/authStore'

const ProductOrder = () => {
 const {getTotalPrice,cart,clearCart} = useCartStore();
 const {user,setCurrentOrder,currentOrder} = useAuthStore();
  const totalItemPrice = getTotalPrice()

  return (
    <View style={styles.container} >
     <CustomHeader title='Checkout' />
     <ScrollView contentContainerStyle={styles.scrollContainer}>
         <OrderList />
          <View style={styles.flexRowBetween}>
            <View style={styles.flexRow}>
                    <Image
                    source={require('@assets/icons/coupon.png')}
                    style={{width:25,
                      height:25
                    }}
                    />
                    <CustomText variant='h6' fontFamily={Fonts.SemiBold}>
                           Use Coupons
                    </CustomText>
            </View>
            <Icon name='chevron-right' size={RFValue(16)} color={Colors.text} /> 
          </View>
          <BillDetails totalItemPrice={totalItemPrice} />
          <View style={styles.flexRowBetween}>
            <View>
              <CustomText variant='h8' fontFamily={Fonts.SemiBold}>
                Cancellation Policy
              </CustomText>
              <CustomText variant='h9' style={styles.cancelText} fontFamily={Fonts.SemiBold}>
                Orders cannot be cancelled once packed for delivery, In case of unexpected delay, refund will be provided, if applicable
              </CustomText>
            </View>

          </View>
     </ScrollView>
     
    </View>
  )
}

export default ProductOrder

const styles = StyleSheet.create({
  cancelText:{
         marginTop:4,
         opacity:0.6
  },
    container:{
        flex:1,
        backgroundColor:'#fff'
    },scrollContainer:{
        backgroundColor:Colors.backgroundSecondary,
        padding:10,
        paddingBottom:250
    },
    flexRowBetween:{
      backgroundColor:'#fff',
      alignItems:'center',
      justifyContent:'space-between',
      padding:10,
      flexDirection:'row',
      borderRadius:15
    },
    flexRow:{
      alignItems:'center',
      flexDirection:'row',
      gap:10
    }
})