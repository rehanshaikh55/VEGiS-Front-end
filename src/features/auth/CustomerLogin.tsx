import {View, Text, StyleSheet, Animated, Image, Alert} from 'react-native';
import React, {FC, useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '@components/global/CustomSafeAreaView';
import ProductSlider from '@components/login/ProductSlider';
import {resetAndNavigate} from '@utils/Navigationutils';
import {CustomText} from '@components/ui/customText';
import {Fonts} from '@utils/Constants';
import { CustomInput } from '@components/ui/customInput';
import { CustomButton } from '@components/ui/customButton';
import useKetboardOffsetHeight from '@components/ui/useKeyboardOffsetHeight';

const CustomerLogin: FC = () => {

  const [phoneNumber,setPhoneNumber] = useState('')
  const [loading,setLoading] = useState(false)
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

  const keyboardOffsetHeight = useKetboardOffsetHeight();

  const animatedValue= useRef(new Animated.Value(0)).current

  useEffect(() => {
    const toValue = keyboardOffsetHeight === 0 ? 0 : -keyboardOffsetHeight * 0.84;
    const duration = keyboardOffsetHeight === 0 ? 500 : 1000;

    Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: true,
    }).start();
}, [keyboardOffsetHeight]);


const handleAuth = ()=>{

}


  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;
      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }
      console.log(translationX, translationY, direction);

      const newSequence = [...gestureSequence, direction].slice(-5);
      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <CustomSafeAreaView style={{flex: 1,}}>
        <ProductSlider />
        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
           style={{transform:[{translateY:animatedValue}],}}
            keyboardDismissMode="on-drag"
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.subContainer}>
            <View style={[styles.content,]}>
              <Image
                source={require('@assets/images/vegislogo2.png')}
                style={styles.logo}
              />
              <CustomText variant="h3" style={{marginLeft:15,textAlign:'center',alignItems:'center',justifyContent:'center'}} fontFamily={Fonts.Bold}>
              Groceries in a Flash!⚡
              </CustomText>
              <CustomText
                variant="h5"
                fontFamily={Fonts.SemiBold}
                style={{opacity: 0.8, marginTop: 2, marginBottom: 25}}>
                Login or Signup
              </CustomText>
              <CustomInput
                onChangeText={(text) => { setPhoneNumber(text.slice(0, 10)); } }
                onClear={() => { setPhoneNumber(''); } }
                value={phoneNumber}
                left={<CustomText style={styles.phoneText} variant='h6' fontFamily={Fonts.SemiBold}
                >
                  +91
                </CustomText>}
                placeholder='Enter Phone Number'
                inputMode='numeric' right={false}              >

              </CustomInput>
              <CustomButton onPress={()=>{return}} title={'Continue'} disabled={phoneNumber?.length!=10} loading={loading} />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
      </CustomSafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
   
  },
  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 30,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 20,
    width: '100%',
     backgroundColor:'#fff'
    
    
  },
  logo: {
    height: 65,
    width: 65,
    marginVertical: 15,
  },
  phoneText:{
    marginLeft:10
  }
});
export default CustomerLogin;
