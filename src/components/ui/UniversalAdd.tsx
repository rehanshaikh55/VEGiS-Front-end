import {Pressable, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import {useCartStore} from '@state/cartStore';
import {Colors, Fonts} from '@utils/Constants';
import {CustomText} from './customText';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {RFValue} from 'react-native-responsive-fontsize';

const UniversalAdd: FC<{item: any}> = ({item}) => {
  const count = useCartStore(state => state.getItemCount(item._id));
  const {addItem, removeItem} = useCartStore();
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: count === 0 ? '#fff' : Colors.secondary},
      ]}>
      {count == 0 ? (
        <TouchableOpacity onPress={() => addItem(item)} style={styles.add}>
          <CustomText
            variant="h9"
            fontFamily={Fonts.SemiBold}
            style={styles.addText}>
            ADD
          </CustomText>
        </TouchableOpacity>
      ) : (
        <View style={styles.counterContainer}>
          <TouchableOpacity onPress={() => removeItem(item._id)}>
            <Icon name="minus" color="#fff" size={RFValue(15)} />
          </TouchableOpacity>
          <CustomText
            fontFamily={Fonts.SemiBold}
            style={styles.text}
            variant="h8">
            {count}
          </CustomText>
          <TouchableOpacity onPress={() => addItem(item)}>
            <Icon name="plus" color="#fff" size={RFValue(15)} />
          </TouchableOpacity>
          
        </View>
      )}
    </View>
  );
};

export default UniversalAdd;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: Colors.secondary,
    width: 77,
    padding:3,
    borderRadius: 8,
  },
  add: {
    width: '105%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
    paddingVertical: 7,
  },
  addText: {
    color: Colors.secondary,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 4,
    paddingVertical: 6,
    justifyContent: 'space-between',
  },
  text: {
    color: '#fff',
  },
});
