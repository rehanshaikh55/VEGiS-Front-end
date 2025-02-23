import {View, Text, StyleSheet, Image} from 'react-native';
import React, {FC} from 'react';

import {screenHeight, screenWidth} from '@utils/Scaling';
import Carousel from 'react-native-reanimated-carousel';
import ScalePress from '@components/ui/ScalePress';

const AdCarousal: FC<{adData: any}> = ({adData}) => {
  
  
      

  return (
    <View style={{left:-15, marginVertical: 20, paddingHorizontal:10}}>
      <Carousel
       width={screenWidth - 30}
       height={210}
        loop
        pagingEnabled
        snapEnabled
        autoPlay
        autoPlayInterval={3000}
        
        data={adData}
       
        renderItem={({item}:any) => {
          return(

            <ScalePress style={styles.imageContainer} >


                <Image source={item}
                style={styles.img}
                />
            </ScalePress>
          )

        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 20,
  },
});
export default AdCarousal;
