import { CustomText } from '@components/ui/customText';
import Geolocation from '@react-native-community/geolocation';
import {sendLiveOrderUpdates} from '@service/orderService';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import { navigate } from '@utils/Navigationutils';
import {FC, useEffect, useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const withLiveOrder = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithLiveOrder: FC<P> = props => {
    const {currentOrder, user} = useAuthStore();

    const [myLocation, setMyLocation] = useState<any>(null);
    useEffect(() => {
      if (currentOrder) {
        const watchId = Geolocation.watchPosition(
          async position => {
            const {latitude, longitude} = position.coords;
            setMyLocation({latitude, longitude});
          },
          err => console.log(err),
          {enableHighAccuracy: true, distanceFilter: 0, interval: 1000},
        );
        return () => {
          Geolocation.clearWatch(watchId);
        };
      }
    }, [currentOrder]);
    useEffect(() => {
      async function sendLiveUpdates() {
        if (
          currentOrder?.deliveryPartner?._id == user?._id &&
          currentOrder?.status != 'delivered' &&
          currentOrder?.status != 'cancelled'
        ) {
          const data = await sendLiveOrderUpdates(
            currentOrder?._id,
            myLocation,
            currentOrder?.status,
          );
          console.log('send live updates', data);
        }
      }
    }, [myLocation]);

    return (<View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && (
          <View
            style={[
              styles.cartContainer,
              {flexDirection: 'row', alignItems: 'center',paddingVertical:20},
            ]}>
            <View style={styles.flexRow}>
              <View style={styles.img}>
                <Image
                source={require('@assets/icons/bucket.png')}
                style={{width: 20, height: 20}}
                />
              </View>
              <View style={{width: '65%'}}>
            <CustomText variant='h6' fontFamily={Fonts.SemiBold}>
                #{currentOrder?.orderId}
            </CustomText>
            <CustomText variant='h9' fontFamily={Fonts.Medium}>
                {currentOrder?.deliveryLocation?.address}
            </CustomText>
                </View>

                <TouchableOpacity
                onPress={() => 
                    navigate('DeliveryMap',{
                        ...currentOrder
                    })
                }
                style={styles.btn}
                >
                  <CustomText variant='h8' style={{color:Colors.secondary}} fontFamily={Fonts.Medium}>
                    Continue
                  </CustomText>
                </TouchableOpacity>
            </View>
          </View>
        )}
    </View>);
  };
  return WithLiveOrder;
};

const styles = StyleSheet.create({
  cartContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  container: {
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    padding: 10,
  },
  img: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderWidth: 0.7,
    borderColor: Colors.border,
    borderRadius: 5,
  },
});

export default withLiveOrder;
