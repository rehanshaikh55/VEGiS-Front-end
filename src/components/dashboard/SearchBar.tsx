import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors, Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import RollingBar from 'react-native-rolling-bar';
import {CustomText} from '@components/ui/customText';
import { navigate } from '@utils/Navigationutils';

const SearchBar = () => {
  return (
    <TouchableOpacity style={styles.container} onPress={()=>navigate('ProductCategories')} activeOpacity={0.8}>
      <Icon name="search" color={Colors.text} size={RFValue(20)} />
      <RollingBar
        interval={3000}
        defaultStyle={false}
        customStyle={styles.textContainer}>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "Sweets"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "Milk"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "Snacks"
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search for ata,dal,coke
        </CustomText>
        <CustomText variant="h6" fontFamily={Fonts.Medium}>
          Search "chips"
        </CustomText>
      </RollingBar>
      <View style={styles.divider} />
      <Icon name="mic" color={Colors.text} size={RFValue(20)} />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor:'#F3F4F7',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderRadius:10,
    borderWidth:0.6,
    borderColor:Colors.border,
    marginTop:15,
    overflow:'hidden',
    paddingHorizontal:10,
    marginHorizontal:10
  },
  textContainer: {
    width:'90%',
    paddingLeft:10,
    height:50
  },
  divider:{
    width:1,
    height:24,
    backgroundColor:'#ddd',
    marginHorizontal:10
  }
});
export default SearchBar;
