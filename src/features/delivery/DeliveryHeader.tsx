import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import { Colors, Fonts } from '@utils/Constants'
import { CustomText } from '@components/ui/customText';
import  Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { resetAndNavigate } from '@utils/Navigationutils';
import { storage, tokenStorage } from '@state/Storage';
import { useAuthStore } from '@state/authStore';

const DeliveryHeader:FC<{name:string;email:string}> = ({name,email}) => {
    const {logout} = useAuthStore();
  return (
    <View style={styles.flexRow}>
        <View style={styles.imgContainer}>
            <Image source={require('@assets/images/delivery_boy.png')}
            style={styles.img}
            />
      </View>
      <View style={styles.infoContainer}>
        <CustomText variant='h4' fontFamily={Fonts.SemiBold}>
            Hello! {name}
        </CustomText>
        <CustomText variant='h8' fontFamily={Fonts.Medium
        }>
             {email}
        </CustomText>
        
        </View>
        <TouchableOpacity
        onPress={()=>{
            resetAndNavigate('CustomerLogin');
            logout();
            tokenStorage.clearAll();
            storage.clearAll();

        }}
        >
            <Icon name='logout' size={30} color='black' />
        </TouchableOpacity>
    </View>
  )
}

export default DeliveryHeader

const styles = StyleSheet.create({
    flexRow:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        padding:10,
        
    },
    imgContainer:{
        padding:4,
        borderRadius:100,
        height:60,
        width:60,
        overflow:'hidden',
        backgroundColor:Colors.backgroundSecondary,
    },
    img:{
        width:'100%',
        bottom:-8,
        height:'100%',
        resizeMode  :'contain',
    },
    infoContainer:{
        width:'70%',
    }
})