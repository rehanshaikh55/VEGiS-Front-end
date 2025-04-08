import {View, Text, StyleSheet, SafeAreaView, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '@utils/Constants';
import DeliveryHeader from './DeliveryHeader';
import {useAuthStore} from '@state/authStore';
import TabBar from './TabBar';
import Geolocation from '@react-native-community/geolocation';
import { fetchOrders } from '@service/orderService';
import DeliveryOrderItem from './DeliveryOrderItem';
import { CustomText } from '@components/ui/customText';


const DeliveryDashboard = () => {
  const {user, setUser} = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>(
    'available',
  );
  const [loading,setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const updateUser =()=>{
    Geolocation.getCurrentPosition(
      position=>{
        const {latitude, longitude} = position.coords;
        
      },
      err => console.log(err),
      {
        enableHighAccuracy: false,
        timeout: 15000,
        
      },
      
      
    )
  }

  useEffect(() => {
   updateUser()
  },[])

  const fetchData = async () => {
   setData([]);
   setRefreshing(true);
   setLoading(true);
   const data = await fetchOrders(selectedTab,user?._id,user?.branch);
   setData(data);
   setRefreshing(false); 
   setLoading(false);

  }
  useEffect(() => {
    fetchData();
  },[]);


  const renderOrderItem = ({item,index}: any) => {
    return(
      <DeliveryOrderItem item={item} index={index} />
    )
  }
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
      <View style={styles.subContainer}>
              <TabBar selectedTab={selectedTab} onTabChange={setSelectedTab}  />
      <FlatList
      data={data}
      refreshControl={
        <RefreshControl 
        refreshing={refreshing}
        onRefresh={async()=>await fetchData}
        />
      }
      ListEmptyComponent={()=>{
        if(loading){
            return(
              <View style={styles.center}>
                <ActivityIndicator color={Colors.secondary} size="small" />
              </View>
            )
        }
        return(
          <View style={styles.center}>
           <CustomText >
           
           </CustomText>
          </View>
        )
      }}
      renderItem={renderOrderItem}
      keyExtractor={item=> item.orderId}
      contentContainerStyle={styles.flatlistContainer}
      />
      </View>
    </View>
  );
};

export default DeliveryDashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
  subContainer: {
    backgroundColor: Colors.backgroundSecondary,
    flex: 1,
    padding: 6,
  },
  flatlistContainer: {
    padding: 2,
  },
  center: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
