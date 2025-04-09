import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  confirmOrder,
  getOrderbyId,
  sendLiveOrderUpdates,
} from '@service/orderService';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import LiveHeader from '@features/map/LiveHeader';
import LiveMap from '@features/map/LiveMap';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {RFValue} from 'react-native-responsive-fontsize';
import {CustomText} from '@components/ui/customText';
import DeliveryDetails from '@features/map/DeliveryDetails';
import OrderSummary from '@features/map/OrderSummary';
import {useRoute} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {hocStyles} from 'styles/GlobelStyle';
import {CustomButton} from '@components/ui/customButton';

const DeliveryMap = () => {
  const user = useAuthStore(state => state.user);
  const [orderData, setOrderData] = useState<any>(null);
  const [myLocation, setMyLocation] = useState<any>(null);
  const route = useRoute();

  const orderDetails = route?.params as Record<string, any>;
  const {setCurrentOrder} = useAuthStore();

  const fetchOrderDetails = async () => {
    const data = await getOrderbyId(orderDetails?._id as any);
    console.log("dataaa",data);
    
    setOrderData(data);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  useEffect(() => {
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
  }, []);

  const acceptOrder = async () => {
    const data = await confirmOrder(orderDetails?._id, myLocation);
    if (data) {
      setCurrentOrder(data);
      Alert.alert('Order Accepted', 'You have accepted the order');
    } else {
      Alert.alert('Error', 'Unable to accept order');
    }
    fetchOrderDetails();
  };
  const orderPickedUp = async () => {
    const data = await sendLiveOrderUpdates(
      orderDetails?._id,
      myLocation,
      'arriving',
    );
    if (data) {
      setCurrentOrder(data);
      Alert.alert('Order Picked Up', 'You have picked up the order');
    } else {
      Alert.alert('Error', 'Unable to pick up order');
    }
    fetchOrderDetails();
  };

  const orderDelivered = async () => {
    const data = await sendLiveOrderUpdates(
      orderDetails?._id,
      myLocation,
      'delivered',
    );
    if (data) {
      setCurrentOrder(data);
      Alert.alert('Order Delivered', 'You have delivered the order');
    } else {
      Alert.alert('Error', 'Unable to deliver order');
    }
    fetchOrderDetails();
  };

  let msg = 'Start this order';
  if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status == 'confirmed'
  ) {
    msg = 'Grab this order';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status == 'arriving'
  ) {
    msg = 'Order picked up';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status == 'delivered'
  ) {
    msg = 'Order delivered';
  } else if (
    orderData?.deliveryPartner?._id == user?._id &&
    orderData?.status == 'available'
  ) {
    msg = 'Order available';
  }
  useEffect(() => {
    async function sendLiveUpdates() {
      if (
        orderData?.deliveryPartner?._id == user?._id &&
        orderData?.status != 'delivered' &&
        orderData?.status != 'cancelled'
      ) {
        await sendLiveOrderUpdates(
          orderDetails?._id,
          myLocation,
          orderData?.status,
        );
        fetchOrderDetails();
      }
    }
    sendLiveUpdates();
  }, [myLocation]);

  return (
    <View style={styles.container}>
      <LiveHeader
        type="Delivery"
        title={msg}
        secondTitle="Delivery in 10 minutes"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}>
        <LiveMap
          deliveryLocation={orderData?.deliveryLocation}
          pickupLocation={orderData?.pickupLocation}
          deliveryPersonLocation={orderData?.deliveryPersonLocation}
          hasAccepted={orderData?.status == 'confirmed'}
          hasPickedUp={orderData?.status == 'arriving'}
        />
        <View style={styles.containerBranch}>

        <View style={styles.flexRow2}>
                <View style={styles.iconContainer}>
                  <Icon name="storefront-outline" color={Colors.disabled} size={RFValue(20)} />
                </View>
                <View style={{width: '80%'}}>
                  <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                     Pickup Order from this branch
                  </CustomText>
                  <CustomText variant="h8" numberOfLines={2} style={{marginTop:2}} fontFamily={Fonts.Regular}>
                     {orderData?.branch?.name || '-------'} 
                  </CustomText>
                  
                  </View>
              </View>
        </View>
        <DeliveryDetails details={orderData?.customer} />
        <OrderSummary order={orderData} />

        <View style={styles.flexRow}>
          <View style={styles.iconContainer}>
            <Icon
              name="cards-heart-outline"
              color={Colors.disabled}
              size={RFValue(20)}
            />
          </View>

          <View style={{width: '82%'}}>
            <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
              Do you like our app?
            </CustomText>
            <CustomText
              variant="h9"
              style={{marginTop: 2}}
              fontFamily={Fonts.Medium}>
              Rate us on Playstore
            </CustomText>
          </View>
        </View>

        <CustomText
          fontFamily={Fonts.SemiBold}
          variant="h6"
          style={{opacity: 0.6, marginTop: 15}}>
          Rehan Shaikh x VEGiS
        </CustomText>
      </ScrollView>
      {orderData?.status != 'delivered' && orderData?.status != 'cancelled' && (
        <View style={[styles.cartContainer, styles.btnContainer]}>
          {orderData?.status == 'available' && (
            <CustomButton
              disabled={false}
              title="Accept Order"
              onPress={acceptOrder}
              loading={false}
            />
          )}
          {orderData?.status == 'confirmed' &&
            orderData?.deliveryPartner?._id == user?._id && (
              <CustomButton
                disabled={false}
                title="Order Picked Up"
                onPress={orderPickedUp}
                loading={false}
              />
            )}
            {orderData?.status == 'arriving' &&
            orderData?.deliveryPartner?._id == user?._id && (
              <CustomButton
                disabled={false}
                title="Order Delivered"
                onPress={orderDelivered}
                loading={false}
              />
            )}
        </View>
      )}
    </View>
  );
};

export default DeliveryMap;

const styles = StyleSheet.create({
  containerBranch: {
    width: '100%',
    borderRadius: 15,
    marginTop:10,
    marginBottom: 0,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.secondary,
  },
  btnContainer: {
    padding: 10,
  },
  cartContainer: {
   alignItems: 'center',
   paddingBottom:20,
    width: '100%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 10,
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  scrollContainer: {
    paddingBottom: 150,
    backgroundColor: Colors.backgroundSecondary,
    padding: 15,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    borderRadius: 15,
    marginTop: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderBottomWidth: 0.7,
    borderColor: Colors.border,
  },
  iconContainer: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 100,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexRow2: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 10,
  },
});
