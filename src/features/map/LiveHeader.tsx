import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { useAuthStore } from '@state/authStore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { navigate } from '@utils/Navigationutils';
import  Icon  from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomText } from '@components/ui/customText';
import { Fonts } from '@utils/Constants';

const LiveHeader:FC<{
    type:'Customer' | 'Delivery';
    title:string;
    secondTitle:string;
}> = ({
    title,
    secondTitle,
    type

}) => {

const isCustomer = type === 'Customer';
const {currentOrder,setCurrentOrder} = useAuthStore()

  return (
    <SafeAreaView>
      <View style={styles.headerContainer}>
        <Pressable style={styles.backButton} onPress={()=>{
            if(isCustomer){
                navigate('ProductDashboard')
                if(currentOrder?.status == 'delivered'){
                    setCurrentOrder(null)
                }
                return
            }
            navigate('DeliveryDashboard')

        }}>
       <Icon name="chevron-back" size={RFValue(16)} color={isCustomer ? "#fff":"#000"} />
        </Pressable>
        <CustomText
        variant='h8'
        fontFamily={Fonts.Medium}
        style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
        >
            {title}
        </CustomText>
        <CustomText
        variant='h4'
        fontFamily={Fonts.SemiBold}
        style={isCustomer ? styles.titleTextWhite : styles.titleTextBlack}
        >
            {secondTitle}
        </CustomText>
      </View>
    </SafeAreaView>
  )
}

export default LiveHeader

const styles = StyleSheet.create({
    headerContainer:{
        justifyContent:'center',
        paddingVertical:25,
        alignItems:'center',
    },
    backButton:{
        position:'absolute',
        left:20,
    
    },
    titleTextBlack:{
        color:'black',
    },
    titleTextWhite:{
        color:'white',
    },

})