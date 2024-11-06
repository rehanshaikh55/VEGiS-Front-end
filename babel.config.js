module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins:[
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root:['./src'],
        alias:{
          "@assets":'./src/assets',
          "@features":'./src/features',
          "@components":'./src/components',
          "@styles":'./src/styles',
          "@service":'./src/service',
          "@navigation":'./src/navigation',
          "@utils":'./src/utils',
          "@state":'./src/state',
        }
      }
    ]
  ]
};
