import {StyleSheet, Text, View} from 'react-native';
import React, { FC } from 'react';
import {Colors, Fonts} from '@utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomText} from '@components/ui/customText';

const DeliveryDetails:FC<{details:any}> = ({details}) => {
  return (
    <View style={styles.container}>
      <View style={styles.flexRow}>
        <View style={styles.iconContainer}>
          <Icon name="bike-fast" color={Colors.disabled} size={RFValue(20)} />
        </View>
        <View>
          <CustomText variant="h5" fontFamily={Fonts.SemiBold}>
            Your Delivery Details
          </CustomText>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
            Details of your current order
          </CustomText>
        </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Icon name="map-marker-outline" color={Colors.disabled} size={RFValue(20)} />
        </View>
        <View style={{width: '80%'}}>
          <CustomText variant="h8" fontFamily={Fonts.Medium}>
             Delivery at Home
          </CustomText>
          <CustomText variant="h8" numberOfLines={2} fontFamily={Fonts.Regular}>
             {details?.address || '-------'} 
          </CustomText>
          
          </View>
      </View>
      <View style={styles.flexRow2}>
        <View style={styles.iconContainer}>
          <Icon name="phone-outline" color={Colors.disabled} size={RFValue(20)} />
        </View>
        <View style={{width: '80%'}}>
         
          <CustomText variant="h8" numberOfLines={2} fontFamily={Fonts.Medium}>
             {details?.name || '---'} {details?.phone || 'XXXXXXXXX'}
          </CustomText>
          <CustomText variant="h8" numberOfLines={2} fontFamily={Fonts.Regular}>
                Receiver's Contact no.
            </CustomText>
          </View>
      </View>

    </View>
  );
};

export default DeliveryDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 15,
    marginVertical: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  flexRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
