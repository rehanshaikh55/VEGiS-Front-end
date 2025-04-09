import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';
import {screenHeight} from '@utils/Scaling';
import {Colors, Fonts} from '@utils/Constants';
import {CustomText} from '@components/ui/customText';
import {RFValue} from 'react-native-responsive-fontsize';
import UniversalAdd from '@components/ui/UniversalAdd';
import { useCartStore } from '@state/cartStore';

const ProductItem: FC<{item: any; index: number}> = ({item, index}) => {
  const isSecondColumn = index % 2 != 0;
   const {addItem, removeItem} = useCartStore();
  return (
    <View style={[styles.container, {marginRight: isSecondColumn ? 10 : 0}]}>
      <View style={styles.imageContainer}>
        <Image source={{uri: item?.image}} style={styles.image} />
      </View>
      <View style={styles.content}>
        <View style={styles.flexrow}>
          <Image
            source={require('@assets/icons/clock.png')}
            style={styles.clockicon}
          />
          <CustomText fontSize={RFValue(6)} fontFamily={Fonts.Medium}>
            15 mins
          </CustomText>
        </View>
        <CustomText
          fontFamily={Fonts.Medium}
          variant="h8"
          numberOfLines={2}
          style={{marginVertical: 5}}>
          {item.name}
        </CustomText>
        <View style={styles.priceContainer}>
          <View>
            <CustomText variant='h8' fontFamily={Fonts.Medium}>
            ₹{item?.price}
            </CustomText>
            <CustomText
            variant='h8' fontFamily={Fonts.Medium}
            style={{opacity:0.8, textDecorationLine:'line-through'}}

            >
               ₹{item?.discountPrice}  
            </CustomText>
          </View>
          <TouchableOpacity
          onPress={() => addItem(item)}
          >
            

             <UniversalAdd item={item} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '45%',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
    marginLeft: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    height: screenHeight * 0.14,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    height: '100%',
    width: '100%',
    aspectRatio: 1 / 1,
    resizeMode: 'contain',
    borderRadius: 8,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
  },
  flexrow: {
    flexDirection: 'row',
    padding: 2,
    borderRadius: 4,
    alignItems: 'center',
    gap: 2,
    backgroundColor: Colors.backgroundSecondary,
    alignSelf: 'flex-start',
  },
  clockicon: {
    width: 15,
    height: 15,
  },
  priceContainer:{
      flexDirection:'row',
      justifyContent:'space-between',
      alignItems:'center',
      paddingVertical:10,
      marginTop:'auto'   
  }
});
export default ProductItem;
