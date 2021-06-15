import React from 'react';
import {SafeAreaView, StyleSheet, Text, View,  } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import StackRoutes from 'D:/NLW/plantmanager/src/routes/stack.routes';

import { Button } from '../componentes/Button';

import colors from './styles/colors';
import fonts from './styles/fonts';


interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug',
    nextScreen: string;
}

const emojis = {
    hug: '🤗',
    smile: '😄'
}


export function Confirmation(){
    const navigation = useNavigation();
    const routes = useRoute();

    const {
        title,
        subtitle,
        buttonTitle,
        icon,
        nextScreen

    } = routes.params as Params

    function handleMoveOn(){
        navigation.navigate(nextScreen);
    }

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>   

                <Text style={styles.tittle}>
                    {title}
                </Text>

                <Text style={styles.subtittle}>
                    {subtitle}
                </Text>

                <View style={styles.footer}>
                    <Button
                        tittle={buttonTitle}
                        onPress={handleMoveOn}
                    />
                </View>
            </View>
        </SafeAreaView>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems:'center',
        justifyContent: 'space-around'
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30
    },

    tittle: {
        fontSize: 22,
        fontFamily:fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        lineHeight: 38,
        marginTop: 15
    },

    subtittle:{
        fontFamily: fonts.text,
        textAlign: 'center',
        fontSize: 17,
        paddingVertical: 10,
        color: colors.heading
    },

    emoji: {
        fontSize: 78
    },

    footer: {
        width: '100%',
        paddingHorizontal: 75,
        marginTop: 20
    }
})