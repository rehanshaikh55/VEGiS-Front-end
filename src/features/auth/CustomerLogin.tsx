import {View, Text, StyleSheet, Animated, Image, Alert, SafeAreaView, Keyboard} from 'react-native';
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
import {Colors, Fonts, lightColors} from '@utils/Constants';
import { CustomInput } from '@components/ui/customInput';
import { CustomButton } from '@components/ui/customButton';
import useKetboardOffsetHeight from '@components/ui/useKeyboardOffsetHeight';
import { RFValue } from 'react-native-responsive-fontsize';
import LinearGradient from 'react-native-linear-gradient';
import { customerLogin } from '@service/authService';


const bottomColors = [...lightColors].reverse()

const CustomerLogin: FC = () => {

  const [phoneNumber,setPhoneNumber] = useState('')
  const [loading,setLoading] = useState(false)
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

  const keyboardOffsetHeight = useKetboardOffsetHeight();

  const animatedValue= useRef(new Animated.Value(0)).current

  useEffect(() => {
    const toValue = keyboardOffsetHeight === 0 ? 0 : -keyboardOffsetHeight * 0.84;
    const duration = keyboardOffsetHeight === 0 ? 500 : 400;

    Animated.timing(animatedValue, {
        toValue,
        duration,
        useNativeDriver: true,
    }).start();
}, [keyboardOffsetHeight]);


const handleAuth =async ()=>{
Keyboard.dismiss()

 setLoading(false)
  try {
    await customerLogin(phoneNumber)
    resetAndNavigate('ProductDashboard')
    console.log(phoneNumber);
    
  } catch (error) {
    Alert.alert('Login Failed')
    setLoading(true)
  }
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
              <LinearGradient colors={bottomColors} style={styles.graident} />
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
              <CustomButton onPress={handleAuth} title={'Continue'} disabled={phoneNumber?.length!=10} loading={loading} />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
      </CustomSafeAreaView>

<View style={styles.footer}>
<SafeAreaView>
  <CustomText fontSize={RFValue(7)}>
    By Continuing, you agree to our Term of Service & Privacy Policy 
  </CustomText>
</SafeAreaView>
</View>

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
    marginBottom: 40,
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
    height: 80,
    width: 80,
    marginVertical: 15,
  },
  phoneText:{
    marginLeft:10
  },
  footer:{
    borderTopWidth:0.8,
    width:'100%',
    borderColor:Colors.border,
    paddingBottom:10,
    alignItems:'center',
    zIndex:22,
    position:'absolute',
    justifyContent:'center',
    bottom:0,
    textAlign:'center',
    padding:10


  },
  graident:{
    paddingTop:60,
    width:'100%'
  }
});
export default CustomerLogin;
