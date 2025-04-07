import {View, Text, StyleSheet, SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '@utils/Constants';
import DeliveryHeader from './DeliveryHeader';
import {useAuthStore} from '@state/authStore';

const DeliveryDashboard = () => {
  const {user, setUser} = useAuthStore();
  const [selectedTab, setSelectedTab] = useState<'available' | 'delivered'>(
    'available',
  );
  const [loading,setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <DeliveryHeader name={user?.name} email={user?.email} />
      </SafeAreaView>
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
