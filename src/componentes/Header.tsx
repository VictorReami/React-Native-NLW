import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from '../pages/styles/colors';
import fonts from '../pages/styles/fonts';
import userImg from 'D:/NLW/plantmanager/assets/1620008192451.png';


export function Header(){

    const [userName, setuserName] = useState<string>();

    useEffect(() => {
        async function loadStorageUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user');
            setuserName(user || '');
        }       

        loadStorageUserName();
    },[])

    return (
        <View style={styles.container}>
            <View>

                <Text style={styles.geeting}>
                    olá
                </Text>

                <Text style={styles.userNamer}>
                    {userName}
                </Text>
            
            </View>            
            <Image source={userImg} style={styles.image} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 30,
        padding: 20
    },

    geeting:{
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text
    },

    userNamer:{
        fontSize: 32,
        fontFamily: fonts.heading,
        color: colors.heading,
        lineHeight: 40
        
    },

    image:{
        width: 70,
        height: 70,
        borderRadius: 40
    }
})
