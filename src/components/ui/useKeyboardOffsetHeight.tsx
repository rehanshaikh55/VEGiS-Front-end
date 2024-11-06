import { useState, useEffect } from 'react';
import { Keyboard, Platform } from 'react-native';

export default function useKeyboardOffsetHeight() {
    const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

    useEffect(() => {
        const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
        const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

        const onKeyboardShow = (e:any) => setKeyboardOffsetHeight(e.endCoordinates.height);
        const onKeyboardHide = () => setKeyboardOffsetHeight(0);

        const showListener = Keyboard.addListener(showEvent, onKeyboardShow);
        const hideListener = Keyboard.addListener(hideEvent, onKeyboardHide);

        return () => {
            showListener.remove();
            hideListener.remove();
        };
    }, []);

    return keyboardOffsetHeight;
}
