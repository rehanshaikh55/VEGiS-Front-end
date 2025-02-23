import {View, Text,Image, StyleSheet} from 'react-native';
import React, {FC, useMemo} from 'react';
import {imageData} from '@utils/dummyData';
import AutoScroll from '@homielab/react-native-auto-scroll';
import { screenHeight, screenWidth } from '@utils/Scaling';

const ProductSlider = () => {
  const rows = useMemo(() => {
    const result = [];
    for (let i = 0; i < imageData.length; i += 4) {
      result.push(imageData.slice(i, i + 4));
    }
    return result;
  }, []);
  return (
    <View pointerEvents="none">
      <AutoScroll style={styles.autoScroll} endPaddingWidth={0}  duration={10000} >
        <View style={styles.gridContainer}>
          {rows?.map((row:any, rowIndex:number) => {
            return <MemoizedRow key={rowIndex} row={row} rowIndex={rowIndex}  />;
          })}
        </View>
      </AutoScroll>
    </View>
  );
};

const Row:FC<{row:typeof imageData;rowIndex:number}> =({row,rowIndex})=>{
    return(
        <View style={styles.row}>
            {row.map((image,imageIndex)=>{
                const horizontalShift = rowIndex%2 === 0 ? -20 : 20
                return(
                    <View style={[styles.imageContainer,{transform:[{translateX:horizontalShift}]}]}>
                        <Image source={image} style={styles.image} />
          
                        
                    </View>
                )
            })}
        </View>
    )
}
const MemoizedRow = React.memo(Row)

const styles = StyleSheet.create({
    imageContainer:{
        marginTop:10,
        marginBottom:5,
        marginHorizontal:10,
        width:100,
        height:110,
        backgroundColor:'#f1fff1',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25

    },
    
    image:{
            width:'103%',
            height:'103%',
            resizeMode:'contain'
    },
    autoScroll:{
       position:'absolute',
       zIndex:-2,
    },
    gridContainer:{
     justifyContent:'center',
     overflow:'visible',
     alignItems:'center',
    },
    row:{
 flexDirection:'row',
 marginBottom:5
    }
})

export default ProductSlider;
