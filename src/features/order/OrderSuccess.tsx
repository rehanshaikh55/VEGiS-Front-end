import {StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {screenWidth} from '@utils/Scaling';
import { Colors, Fonts } from '@utils/Constants';
import { useAuthStore } from '@state/authStore';
import LottieView from 'lottie-react-native';
import { CustomText } from '@components/ui/customText';
import { replace } from '@utils/Navigationutils';

const OrderSuccess: FC = () => {
    const {user} = useAuthStore();
    useEffect(() => {
   const timeoutId = setTimeout(() => {
      replace('LiveTracking');}, 3000);
    return () => clearTimeout(timeoutId);
    }, []);

  return (
    <View style={styles.container}>
      <LottieView
         source={require('@assets/animations/confirm.json')}
            autoPlay
            loop={false}
            duration={2000}
            speed={1}
            style={styles.lottieView}
            enableMergePathsAndroidForKitKatAndAbove   
            hardwareAccelerationAndroid
      />
      <CustomText
      variant='h8'
        style={styles.orderPlaceText}
        fontFamily={Fonts.SemiBold}
      >
           ORDER PLACED SUCCESSFULLY
      </CustomText>
        <View style={styles.deliveryContainer}>
            <CustomText
            variant='h4'
            fontFamily={Fonts.SemiBold}
            style={styles.deliveryText}
            >
                Delivery to Home
          </CustomText>

        </View>
        <CustomText
        variant='h9'
        fontFamily={Fonts.Medium}>
            {user?.address || 'Somewhere, Knowhere'}
        </CustomText>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  lottieView: {
    width: screenWidth * 0.6,
    height: 150,
  },
  orderPlaceText: {
    opacity: 0.4,
  },
  deliveryContainer: {
    borderBottomWidth: 2,
    paddingBottom: 4,
    marginBottom: 5,
    borderColor:Colors.secondary
  },
    deliveryText: {
        borderColor: Colors.secondary,
        marginTop: 15,
    },
    addressText: {
        opacity: 0.8,
        width:'80%',
        textAlign:'center',
        marginTop: 10,
    }
});
