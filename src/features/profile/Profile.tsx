import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAuthStore } from '@state/authStore';
import { useCartStore } from '@state/cartStore';
import { fetchCustomerOrders } from '@service/orderService';
import CustomHeader from '@components/ui/CustomHeader';
import OrderItem from '@features/order/OrderItem';
import ProfileOrderItem from './ProfileOrderItem';
import { CustomText } from '@components/ui/customText';
import { Colors, Fonts } from '@utils/Constants';
import WalletSection from './WalletSection';
import ActionButton from './ActionButton';
import { storage, tokenStorage } from '@state/Storage';
import { resetAndNavigate } from '@utils/Navigationutils';

const Profile = () => {
  const [orders,setOrders] = useState([]);
  const {logout,user} = useAuthStore();
  const {clearCart} = useCartStore();

const fetchOrders = async()=>{
   const dataorder= await fetchCustomerOrders(user?._id);
   setOrders(dataorder)
   console.log("orders",dataorder);
   
}
useEffect(()=>{
 fetchOrders();
},[])

const renderHeader=()=>{
  return(
    <View>
      <CustomText variant='h3' fontFamily={Fonts.SemiBold}>
        Your Account
      </CustomText>
      <CustomText variant='h7' fontFamily={Fonts.Medium}>
        {user?.phone}
      </CustomText>
      <WalletSection />
      <CustomText variant='h8' style={styles.informativeText}>
        YOUR INFORNATION
      </CustomText>
      <ActionButton color={Colors.text} icon='book-outline' label='Addess book' />
      <ActionButton color={Colors.text} icon='information-circle-outline' label='About us' />
      <ActionButton color='red' icon='log-out' label='Logout' 
      onPress={()=>{
        clearCart();
        logout();
        tokenStorage.clearAll();
        storage.clearAll();
        resetAndNavigate('CustomerLogin')
      }}
      
      />
      <CustomText variant='h8' style={styles.pastText}>
        PAST ORDERS
      </CustomText>
    </View>
  )
}


const renderOrders=({item,index}:any)=>{
  return(
    
    <ProfileOrderItem item={item} index={index} />
  )
}

  return (
    <View style={styles.container}>
     <CustomHeader title='Profile' />
     <FlatList
       data={orders}
       ListHeaderComponent={renderHeader}
       renderItem={renderOrders}
       keyExtractor={(item:any)=> item?.orderId}
       contentContainerStyle={styles.scrollViewContainer}
     />
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container:{
     flex:1,
     backgroundColor:'#fff'
  },
  scrollViewContainer:{
    padding:10,
    paddingTop:20,
    paddingBottom:100
  },
  informativeText:{
    opacity:0.7,
    marginBottom:20
  },
  pastText:{
    marginVertical:20,
    opacity:0.7
  }
})