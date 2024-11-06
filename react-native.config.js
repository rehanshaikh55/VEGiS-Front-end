module.exports={
    projects:{
       ios:{},
       android:{}

    },
    "react-native-vector-icons":{
        platfrom:{
         ios:null
        }
    },
    assets:['./src/assets/fonts'],
    getTransformModulePath(){
        return require.resolve("react-native-typescript-transformer")
    },
    getSourceExts(){
        return ['ts','tsx']
    }
}