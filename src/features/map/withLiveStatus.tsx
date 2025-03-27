import {CustomText} from '@components/ui/customText';
import {useNavigation, useNavigationState} from '@react-navigation/native';
import {SOCKET_URL} from '@service/config';
import {getOrderbyId, getOrderfromCustomerid} from '@service/orderService';
import {useAuthStore} from '@state/authStore';
import {Colors, Fonts} from '@utils/Constants';
import {navigate} from '@utils/Navigationutils';
import {FC, useEffect} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {io} from 'socket.io-client';


const withLiveStatus = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
): FC<P> => {
  const WithLiveStatusComponent: FC<P> = props => {
    const {currentOrder, setCurrentOrder} = useAuthStore();
    const user = useAuthStore();
    const routeName = useNavigationState(
      state => state.routes[state.index]?.name,
    );
    
    const fetchOrderDetails = async () => {
      const data = await getOrderbyId(currentOrder?.id as any);
      setCurrentOrder(data);
    };
    useEffect(() => {
      if (currentOrder) {
        const socketInstance = io(SOCKET_URL, {
          transports: ['websocket'],
          withCredentials: true,
        });
        socketInstance.emit('joinRoom', currentOrder?.id);
        socketInstance?.on('liveTrackingUpdate', updatedOrder => {
          fetchOrderDetails();
          console.log('recieved live tracking update', updatedOrder);
        });
        socketInstance.on('orderConfirmed', confirmOrder => {
          fetchOrderDetails();
          console.log('recieved order confirmed', confirmOrder);
        });
        return () => {
          socketInstance.disconnect();
        };
      }
    }, [currentOrder]);
          console.log('currentOrder', currentOrder);
          
    return (
      <View style={styles.container}>
        <WrappedComponent {...props} />
        {currentOrder && routeName === 'ProductDashboard' && (
          <View
            style={[
              styles.cartContainer,
              {flexDirection: 'row', alignItems: 'center'},
            ]}>
            <View style={styles.flexRow}>
              <View style={styles.img}>
                <Image
                  source={require('@assets/icons/bucket.png')}
                  style={{width: 20, height: 20}}
                />
              </View>
              
              
              <View style={{width: '68%'}}>
                <CustomText variant="h7" fontFamily={Fonts.SemiBold}>
                  Order is {currentOrder?.status}
                </CustomText>
                <CustomText variant="h9" fontFamily={Fonts.Medium}>
                  {currentOrder?.items![0]?.item.name +
                    (currentOrder?.items?.length - 1 > 0
                      ? ` and ${currentOrder?.items?.length - 1}+ items`
                      : '')}
                </CustomText>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigate('LiveTracking')}
              style={styles.btn}>
              <CustomText
                variant="h8"
                fontFamily={Fonts.Medium}
                style={{color: Colors.secondary}}>
                View
              </CustomText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };
  return WithLiveStatusComponent;
};

export default withLiveStatus;

const styles = StyleSheet.create({
    cartContainer:{
        position:'absolute',
        bottom:0,
        width:'100%',
        backgroundColor:'#fff',
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        elevation:10,
        shadowOffset:{width:1,height:1},
        shadowOpacity:0.3,
        shadowRadius:5
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
