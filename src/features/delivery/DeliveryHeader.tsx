import { Image, StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@utils/Constants'
import { CustomText } from '@components/ui/customText';

const DeliveryHeader:FC<{name:string;email:string}> = ({name,email}) => {
  return (
    <View style={styles.flexRow}>
        <View style={styles.imgContainer}>
            <Image source={require('@assets/images/delivery_boy.png')}
            style={styles.img}
            />
      </View>
      <View style={styles.infoContainer}>
        <CustomText>
            
        </CustomText>
        
        </View>
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