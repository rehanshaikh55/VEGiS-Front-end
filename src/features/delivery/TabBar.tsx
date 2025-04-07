import { StyleSheet, Text, View } from 'react-native'
import React, { FC } from 'react'
import { Colors } from '@utils/Constants'

interface tabBarProps{
    selectedTab:'available' | 'delivered';
    onTabChange:(tab:'available' | 'delivered')=>void;
}

const TabBar:FC<tabBarProps> = ({selectedTab,onTabChange}) => {
  return (
    <View>
      <Text>TabBar</Text>
    </View>
  )
}

export default TabBar

const styles = StyleSheet.create({
    tabContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginBottom:10,
    },
    tab:{
        paddingVertical:10,
        borderRadius:25,
        borderWidth:2,
        width:'38%',
        margin:10,
        borderColor:Colors.border,
        alignItems:'center'
    },
    activeTab:{
        backgroundColor:Colors.secondary,
        borderColor:Colors.secondary,
    },tabText:{
        color:Colors.text,
    },
    activeTabText:{
        color:'#fff'
    },
    inActiveTabText:{
        color:Colors.disabled
    }
})