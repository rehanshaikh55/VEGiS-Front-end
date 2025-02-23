import {View, Text, Alert, ScrollView, StyleSheet} from 'react-native';
import React, {FC, useState} from 'react';
import {resetAndNavigate} from '@utils/Navigationutils';
import {deliveryLogin} from '@service/authService';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import {screenHeight} from '@utils/Scaling';
import LottieView from 'lottie-react-native';
import {CustomText} from '@components/ui/customText';
import {Fonts} from '@utils/Constants';
import {CustomInput} from '@components/ui/customInput';
import Icon from 'react-native-vector-icons/Ionicons';
import {RFValue} from 'react-native-responsive-fontsize';
import { CustomButton } from '@components/ui/customButton';

const DeliveryLogin: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      await deliveryLogin(email, password);
      resetAndNavigate('DeliveryDashboard');
    } catch (error: any) {
      Alert.alert('error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomSafeAreaView style={{}}>
      <ScrollView
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.lottieContainer}>
            <LottieView
              autoPlay
              loop
              style={styles.lottie}
              source={require('@assets/animations/delivery_man.json')}
            />
          </View>

          <CustomText variant="h3" fontFamily={Fonts.Bold}>
            Delivery Partner Portal
          </CustomText>
          <CustomText
            variant="h6"
            style={styles.text}
            fontFamily={Fonts.SemiBold}>
            Faster Then Flash⚡
          </CustomText>

          <CustomInput
            value={email}
            onChangeText={setEmail}
            left={<Icon
              name="mail"
              color="#F8890E"
              style={{ marginLeft: 15 }}
              size={RFValue(16)} />}
            placeholder='Email'
            inputMode='email'
            right={false} onClear={function (): void {
              throw new Error('Function not implemented.');
            } }          />
          <CustomInput
            value={password}
            onChangeText={setPassword}
            left={<Icon
              name="key-sharp"
              color="#F8890E"
              style={{ marginLeft: 15 }}
              size={RFValue(16)} />}
            placeholder='Password'
            secureTextEntry
            right={false} onClear={function (): void {
              throw new Error('Function not implemented.');
            } }          />

            <CustomButton disabled={email.length===0 || password.length < 8} 
            title='Login'
            onPress={handleLogin}
            loading={loading}
            />
        </View>
      </ScrollView>
    </CustomSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  lottie: {
    height: '100%',
    width: '100%',
  },
  lottieContainer: {
    height: screenHeight * 0.17,
    width: '100%',
  },
  text: {
    marginTop: 7,
    marginBottom: 25,
    opacity: 0.8,
  },
});

export default DeliveryLogin;
