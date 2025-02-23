import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import ScalePress from '@components/ui/ScalePress';
import {navigate} from '@utils/Navigationutils';
import {CustomText} from '@components/ui/customText';
import {Fonts} from '@utils/Constants';

const CategoryContainer: FC<{data: any}> = ({data}) => {
  const renderItems = (item: any[]) => {
    return (
      <>
        {item.map((item, index) => {
          return (
            
            <ScalePress
              onPress={() => navigate('ProductCategories')}
              key={index}
              style={styles.item}>
              <View style={styles.imageContainer}>
                <Image source={item.image} style={styles.image} />
              </View>
              <CustomText
                style={styles.text}
                variant="h8"
                fontFamily={Fonts.Medium}>
                {item.name}
              </CustomText>
            </ScalePress>
         
          );
        })}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>{renderItems(data?.slice(0, 4))}</View>
      <View style={styles.row}>{renderItems(data?.slice(4))}</View>
    </View>
  );
};

export default CategoryContainer;

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'flex-start',
    marginBottom: 15,
  },
  item: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
    resizeMode: 'contain',
  },
  imageContainer: {
    width: '95%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 6,
    backgroundColor: '#e5f3f3',
    marginBottom: 8,
  },
  text: {
    textAlign:'center'
  },
});
