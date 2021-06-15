import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import colors from '../pages/styles/colors';
import fonts from '../pages/styles/fonts';

//import colors from './styles/colors';

interface EnviromentButtonProps extends RectButtonProps {
    tittle: string;
    active?: boolean;
}

export function EnviromentButton ({
    tittle,
    active = false,
    ...rest
} : EnviromentButtonProps){
    return(
        <RectButton
            style={[
                styles.container,
                active && styles.containerActive
            ]}
            {...rest}
        >
            <Text style={[
                styles.text,
                active && styles.textActive
            ]}>
                {tittle}
            </Text>
        </RectButton>    
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.shape,
        width: 76,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 12,
        marginHorizontal: 5
    },

    containerActive: {
        backgroundColor: colors.green_light
    },

    text: {
        color: colors.heading,
        fontFamily: fonts.text

    },

    textActive: {
        fontFamily: fonts.heading,
        color: colors.green_dark
    }
})
