import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { FC } from 'react'
import  Icon  from 'react-native-vector-icons/Ionicons';
import { Colors, Fonts } from '@utils/Constants';
import { RFValue } from 'react-native-responsive-fontsize';
import { CustomText } from '@components/ui/customText';

interface ActionButtonProps{
    icon:string;
    label:string;
    onPress?:()=>void;
    color:string
}


const ActionButton:FC<ActionButtonProps> = ({
    icon,label,onPress,color
}) => {
  return (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
        <View style={styles.iconContainer}>
            <Icon  name={icon} color={color} size={RFValue(18)} />
        </View>
        <CustomText variant='h5' style={{color:color}} fontFamily={Fonts.Regular}>
            {label}
        </CustomText>
    </TouchableOpacity>
  )
}

export default ActionButton

const styles = StyleSheet.create({
    btn:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        marginVertical:10
    },
    iconContainer:{
        justifyContent:'center',
        alignItems:'center',
        padding:12,
        borderRadius:100,
        backgroundColor:Colors.backgroundSecondary
    }
})