import { View, Text, StyleSheet,Image } from 'react-native'
import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { darkWeatherColors } from '@utils/Constants'
import { screenHeight, screenWidth } from '@utils/Scaling'
import LottieView from 'lottie-react-native'
import { useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import Animated,{ interpolate, useAnimatedStyle } from 'react-native-reanimated'

const Visuals:FC = () => {

const {scrollY} = useCollapsibleContext()
const headerAnimatedStyle = useAnimatedStyle(()=>{
  const opacity = interpolate(scrollY.value,[0,120],[1,0])
  return {opacity}
})
  return (
    <Animated.View style={[styles.container,headerAnimatedStyle]}>
      <LinearGradient colors={darkWeatherColors } style={[styles.graident]} />
     <Image source={require('@assets/images/cloud.png')} style={styles.cloud}/>
    <LottieView autoPlay enableMergePathsAndroidForKitKatAndAbove={true} style={styles.lottie} source={require('@assets/animations/raining.json')} />
    </Animated.View>
  )
}
const styles = StyleSheet.create({
    container:{
        position:'absolute',
        
    },
    lottie:{
        width:'100%',
        height:150,
        position:'absolute',
        transform:[{scaleX:-1}]
    },
    graident:{
            width:'100%',
            height:screenHeight*0.4,
            position:'absolute',
            
    },
    cloud:{
        width:screenWidth,
        resizeMode:'stretch',
        height:100,
       
    }

})
export default Visuals