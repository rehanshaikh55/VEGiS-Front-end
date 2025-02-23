import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React, { FC } from 'react'
import { NoticeHeight } from '@utils/Scaling'
import { CustomText } from '@components/ui/customText'
import { Fonts } from '@utils/Constants'
import Svg, { Defs, G, Path, Use } from 'react-native-svg'
import { wavyData } from '@utils/dummyData'

const Notice:FC = () => {
  return (
    <View style={{height:NoticeHeight}}>
      <View style={styles.container}>
<View style={styles.noticeContainer}>
<SafeAreaView style={{padding:10}}>
 <CustomText style={styles.Heading} variant='h8' fontFamily={Fonts.SemiBold} >
    It's raining near your location
 </CustomText>
 <CustomText style={styles.textCenter} variant='h9'>
    Our Delivery partners may take longer to reach
 </CustomText>
</SafeAreaView>
</View>
      </View>
<Svg
width='100%'
height='35'
fill='#CCD5E4'
viewBox='0 0 4000 1000'
preserveAspectRatio='none'
style={{transform:[{rotateX:'180deg'}]}}
>
    <Defs>
        <Path id='wavepath' d={wavyData} />
    </Defs>
    <G>
        <Use href='#wavepath' y='321' />

       
    </G>
</Svg>

    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        backgroundColor:'#CCD5E4'
    },
    noticeContainer:{
        alignItems:'center',
        justifyContent:'center'
    },
    textCenter:{
        textAlign:'center',
        marginBottom:8
    },
    Heading:{
        marginBottom:8,
        color:'#2D3875',
        textAlign:'center'
    }
})
export default Notice