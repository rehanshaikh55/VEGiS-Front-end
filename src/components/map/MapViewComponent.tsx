import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MapView,{Polyline} from 'react-native-maps';
import { customMapStyle } from '@utils/CustomMap';
import Markers from './Markers';

const MapViewComponent = ({
  mapRef,
  setMapRef,
  hasAccepted,
  deliveryLocation,
  pickupLocation,
  deliveryPersonLocation,
  hasPickedUp,
}:any) => { 
        
 

  return (
    /*
   <MapView
   ref={setMapRef}
   style={{flex:1}}
  
   customMapStyle={customMapStyle}
   showsUserLocation={true}
   userLocationCalloutEnabled
   userLocationPriority='high'
   showsTraffic={false}
   pitchEnabled={false}
   followsUserLocation={true}
   showsCompass={true}
   showsBuildings={false}
   showsIndoors={false}
   showsScale={false}
   showsIndoorLevelPicker={false}
   >

    <Markers
     deliveryPersonLocation={deliveryPersonLocation}
     deliveryLocation={deliveryLocation}
     pickupLocation={pickupLocation}
    />
     </MapView>
  */
 <View>
     <Image
      source={{uri:"https://res.cloudinary.com/dycdei95h/image/upload/v1743147875/Screenshot_2025-03-28_131337_oodnlq.png"}}
      style={{width:'100%',height:'100%',}}
     />

 </View>
  
  );
};

export default MapViewComponent;

const styles = StyleSheet.create({});
