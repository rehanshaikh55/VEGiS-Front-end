import {
  View,
  Text,
  Animated as RNAnimated,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import React, {FC, useEffect, useRef} from 'react';
import {useAuthStore} from '@state/authStore';
import NoticeAnimation from './NoticeAnimation';
import {NoticeHeight, screenHeight} from '@utils/Scaling';
import Visuals from './Visuals';
import {
  CollapsibleContainer,
  CollapsibleHeaderContainer,
  CollapsibleScrollView,
  useCollapsibleContext,
  withCollapsibleContext,
} from '@r0b0t3d/react-native-collapsible';
import AnimatedHeader from './AnimatedHeader';
import StickySearchBar from './StickySearchBar';
import ContentContainer from '@components/dashboard/ContentContainer';
import {CustomText} from '@components/ui/customText';
import {RFValue} from 'react-native-responsive-fontsize';
import {Fonts} from '@utils/Constants';
import Animated, {useAnimatedStyle, withTiming} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import withCart from '@features/cart/WithCart';
import withLiveStatus from '@features/map/withLiveStatus';
import { getOrderfromCustomerid } from '@service/orderService';
const NOTICE_HEIGHT = -(NoticeHeight + 12);
const ProductDashboard: FC = () => {
  const user = useAuthStore();
  
  console.log(user);

  const {scrollY, expand} = useCollapsibleContext();
  const previousScroll = useRef<number>(0);

  const backToTopStyle = useAnimatedStyle(() => {
    const isScrollingUp =
      scrollY.value < previousScroll.current && scrollY.value > 180;
    const opacity = withTiming(isScrollingUp ? 0 : 0, {duration: 300});
    const translateY = withTiming(isScrollingUp ? 0 : 10, {duration: 300});
    previousScroll.current = scrollY.value;
    return {
      opacity,
      transform: [{translateY: translateY}],
    };
  });

  const noticePosition = useRef(new RNAnimated.Value(NOTICE_HEIGHT)).current;

  const slideUp = () => {
    RNAnimated.timing(noticePosition, {
      toValue: NOTICE_HEIGHT,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };
  const slideDown = () => {
    RNAnimated.timing(noticePosition, {
      toValue: 0,
      duration: 1200,
      useNativeDriver: false,
    }).start();
  };

  useEffect(() => {
    slideDown();
    const timeoutId = setTimeout(() => {
      slideUp();
    }, 3500);
    return () => clearTimeout(timeoutId);
  }, []);
  return (
    <NoticeAnimation noticePosition={noticePosition}>
      <>
        <Visuals />
        <SafeAreaView />

        <CollapsibleContainer style={styles.panelContainer}>
          <CollapsibleHeaderContainer
            containerStyle={{backgroundColor: 'transparent'}}>
            <AnimatedHeader
              showNotice={() => {
                slideDown();
                const timeoutId = setTimeout(() => {
                  slideUp();
                }, 3500);
                return () => clearTimeout(timeoutId);
              }}
            />
            <StickySearchBar />
          </CollapsibleHeaderContainer>
          <CollapsibleScrollView
            nestedScrollEnabled
            style={styles.panelContainer}
            showsVerticalScrollIndicator={false}>
            <ContentContainer />

            <View style={{backgroundColor: '#f8f8f8', padding: 20}}>
              <CustomText
                fontSize={RFValue(32)}
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2}}>
                Groceries in a Flash!🥭
              </CustomText>
              <CustomText
                fontFamily={Fonts.Bold}
                style={{opacity: 0.2, marginTop: 10, paddingBottom: 70}}>
                Developed By 💛 Rehan Shaikh 
              </CustomText>
              <Animated.View style={styles.backToTopButton}> 
                <TouchableOpacity
                  onPress={() => {
                    scrollY.value = 0;
                    expand();
                  }}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                  <Icon
                    name="arrow-up-circle-outline"
                    color="#fff"
                    size={RFValue(30)}
                  />
                  <CustomText
                    variant="h9"
                    style={{color: 'white', textAlign: 'center'}}
                    fontFamily={Fonts.SemiBold}>
                    Back to
                  </CustomText>
                  <CustomText
                    variant="h9"
                    style={{color: 'white', textAlign: 'center'}}
                    fontFamily={Fonts.SemiBold}>
                    Top
                  </CustomText>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </CollapsibleScrollView>
        </CollapsibleContainer>
      </>
    </NoticeAnimation>
  );
};

const styles = StyleSheet.create({
  panelContainer: {
    flex: 1,
  },
  backToTopButton: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 70,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#000',
    borderRadius: 200,
    height: 100,
    width: 100,
    zIndex: 999,
  },
});
export default withLiveStatus( withCart( withCollapsibleContext(ProductDashboard)));
