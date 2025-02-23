import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { FC } from 'react'
import { StickyView, useCollapsibleContext } from '@r0b0t3d/react-native-collapsible'
import { Colors } from '@utils/Constants'
import { interpolate, useAnimatedStyle } from 'react-native-reanimated'
import SearchBar from '@components/dashboard/SearchBar'

const StickySearchBar:FC = () => {

    const {scrollY} = useCollapsibleContext()
const animatedShadow= useAnimatedStyle(()=>{
    const opacity = interpolate(scrollY.value,[0,140],[0,1])
    return {opacity}
})

const backgroundColorChange = useAnimatedStyle(()=>{
    const opacity = interpolate(scrollY.value,[1,80],[0,1])
    return {backgroundColor:`rgba(255,255,255,${opacity})`}
})
  return (
    <StickyView style={[backgroundColorChange]}>
     <SearchBar />
      <Animated.View style={[styles.shadow,animatedShadow]} />

      
    </StickyView>
  )
}

const styles=StyleSheet.create({
    shadow:{
        height:15,
        width:'100%',
        borderBottomWidth:1,
 borderBottomColor:Colors.border
    }
})
export default StickySearchBar