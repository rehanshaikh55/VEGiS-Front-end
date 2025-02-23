import { View, Text, StyleSheet,Image, Alert } from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from '@utils/Constants'
import { screenHeight, screenWidth } from '@utils/Scaling'
import vegisLogo from '@assets/images/vegislogo.png'
import GeoLocation from '@react-native-community/geolocation'
import { useAuthStore } from '@state/authStore'
import { tokenStorage } from '@state/Storage'
import { resetAndNavigate } from '@utils/Navigationutils'
import { jwtDecode } from 'jwt-decode'
import { reFetchUser, refresh_token } from '@service/authService'


GeoLocation.setRNConfiguration({
   skipPermissionRequests:false,
   enableBackgroundLocationUpdates:true,
   locationProvider:'auto',
   authorizationLevel:'always'

})

interface DecodedToken{
  exp:number;
}

const Splashscreen = () => {

const {user,setUser} = useAuthStore();

console.log(user);

const tokenCheck = async()=>{
  const accessToken = tokenStorage.getString('accessToken') as string
  const refreshToken = tokenStorage.getString('refreshToken') as string
if(accessToken){

const decodedAccessToken = jwtDecode<DecodedToken>(accessToken)
const decodedRefreshToken = jwtDecode<DecodedToken>(refreshToken)

const currentTime = Date.now()/1000;
if(decodedRefreshToken?.exp <currentTime ){
  resetAndNavigate('CustomerLogin')
  Alert.alert("Session Expired",'please login again')
  return false
}
if(decodedAccessToken?.exp < currentTime){
 try {
  refresh_token();
 await reFetchUser(setUser);
 } catch (error) {
  console.log(error);
  Alert.alert('there was an error in refreshing token')
  return false
 }
}

if(user?.role === "Customer"){
  resetAndNavigate("ProductDashboard")
}else{
  resetAndNavigate("DeliveryDashboard")
}

return true

}


resetAndNavigate('CustomerLogin')
return false

}

 useEffect(()=>{
   
    const fetchUserLocation = async()=>{
        try {
          GeoLocation.requestAuthorization()
          tokenCheck()
        } catch (error) {
          Alert.alert("Sorry we need your location for better shopping expierence")
        }
    }
   const timeOutId = setTimeout(fetchUserLocation,1000)
   return ()=> clearTimeout(timeOutId) 
 },[])


  return (
    <View style={styles.container}>
      <Image source={vegisLogo} style={styles.logoImage} />
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
       backgroundColor:"white",
       flex:1,
       justifyContent:'center',
       alignItems:'center'
    },
    logoImage:{
     height:screenHeight * 0.4,
     width:screenWidth * 0.4,
     resizeMode:'contain'
    }
})

export default Splashscreen