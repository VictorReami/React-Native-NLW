import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Platform, Keyboard, Alert   } from 'react-native';
import AsyncStorage, {  } from '@react-native-async-storage/async-storage';

import colors from './styles/colors';
import fonts from './styles/fonts';
import { Button } from '../componentes/Button';
import { useNavigation } from '@react-navigation/core';


export function UserIdentification(){
    const [ isFocused, setIsFocosed ] = useState(false);
    const [ isFilled, setIsFilled ] = useState(false);
    const [ name, setName ] = useState<string>();
    const navigation = useNavigation();

    function handleInputBlur(){
        setIsFocosed(false);
        setIsFilled(!!name);
    }

    function handleInputFocus(){
        setIsFocosed(true)       
    }

    function handleInputChange(value: string){
        setIsFilled(!! value)
        setName(value);
    }

    function handleSubmit(){
        if(!name)
        return Alert.alert('Me diz como chamar você 😥');

        try{            
            AsyncStorage.setItem('@plantmanager:user', name);
            navigation.navigate('Confirmation', {
                title: 'prontinho',
                subtitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado.',
                buttonTitle: 'comerçar',
                icon: 'smile',
                nextScreen: 'PlantSelect'
            });
        }catch{
            Alert.alert('Não foi possível salvar seu nome 😥');
        }
    }

    return(
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                style={styles.container}
                behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>

                                <Text style={styles.emoji}>  
                                    {isFilled ? '😄' : '😀'}
                                </Text>

                                <Text style={styles.tittle}>
                                    Como podemos {'\n'}
                                    chamar você
                                </Text>  
                            </View>    

                            <TextInput 
                                style={[
                                    styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                ]}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />

                            <View style={styles.footer}>
                                <Button
                                    tittle="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>

                        </View>                
                    </View>
                    </TouchableWithoutFeedback>            
            </ KeyboardAvoidingView>
        </ SafeAreaView>    
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    content:{
        flex: 1,
        width: '100%'
    },

    form:{
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 54,
        alignItems: 'center',        
    },

    header:{
        alignItems: 'center'
    },

    emoji:{
        fontSize: 44,
    },

    input:{
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 10,
        textAlign: 'center'
    },

    tittle: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        marginTop: 20
    },

    footer: {
        width: '100%',
        marginTop: 40,
        paddingHorizontal: 20    
            
    }
})