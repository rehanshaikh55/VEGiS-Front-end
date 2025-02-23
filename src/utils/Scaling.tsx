import { Dimensions, Platform } from "react-native";


export const screenWidth:number = Dimensions.get('screen').width
export const screenHeight:number = Dimensions.get('screen').height
export const NoticeHeight = Platform.OS==='ios' ? screenHeight*0.12 : screenHeight*0.08