import {FC} from 'react';
import {ActivityIndicator, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {CustomText} from './customText';
import {Colors, Fonts} from '@utils/Constants';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
}

export const CustomButton: FC<CustomButtonProps> = ({
  onPress,
  title,
  disabled,
  loading,
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.mainButton,
        {backgroundColor: disabled ? Colors.disabled : '#589c0b'},
      ]}
      disabled={disabled}
      onPress={onPress}>

        {loading?
        <ActivityIndicator color='#fff' size='small' />:

        <CustomText
        style={styles.buttonText}
        variant="h6"
        fontFamily={Fonts.SemiBold}>
        {title}
      </CustomText>
     
    
    }
     
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mainButton: {
    width: '90%',
    height: 50,

    borderRadius: 12,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    bottom: -5,
  },
  buttonText: {
    color: '#fff',
  },
});
