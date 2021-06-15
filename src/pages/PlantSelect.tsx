import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, InteractionManager, ActivityIndicator } from 'react-native';
import colors from './styles/colors';
import { PlantProps } from '../libs/storage';
//import { useNavigation } from '@react-navigation/core';


import { Header } from '../componentes/Header'
import { PlantCardPrimary } from '../componentes/PlantCardPrimary';
import { Load } from '../componentes/Load'


import fonts from './styles/fonts';
import { EnviromentButton } from '../componentes/environmentButton';
import api from '../services/api';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

interface EnviromentProps {
    key: string;
    title: string;
}

export function PlantSelect(){

    const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [FilteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentsSelected, setEnviromentSelected] = useState('all');
    const [loading, setLoading] = useState(true);

    const [page, setPage] = useState(1);    
    const [loadingMore, setLoadingMore] = useState(false);

    const navigation = useNavigation();

    function handleEnviromentSelectede(enviroment: string){
        setEnviromentSelected(enviroment);

        if(enviroment == 'all')
            return setFilteredPlants(plants);

        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        );    
        
        setFilteredPlants(filtered);  
    }

    function handleFechMore(distance: number){
        if(distance < 1)
            return;
        
        setLoadingMore(true);
        setPage(Oldvalue => Oldvalue + 1)

        fetchPlants();
    }

    async function fetchPlants(){
        const { data } = await api.get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if(!data)
            return setLoading(true)

        if(page > 1){
            setPlants(oldvalues => [...oldvalues, ...data])
            setFilteredPlants(oldvalues => [...oldvalues, ...data])
        }else{
            setPlants(data);
            setFilteredPlants(data);
        }

        setLoading(false);
        setLoadingMore(false);
    }

    function handlePlantSelect(plant: PlantProps){
        navigation.navigate('PlantSave', { plant });
    }


    useEffect (() => {
        async function fetchEnviroment(){
            const { data } = await api.get('plants_environments?_sort=title&_order=asc')
            setEnviroments([
                {
                    key:'all',
                    title: 'Todos'
                },
                ...data
            ]);
        }

        fetchEnviroment();        
    }, [] )

    useEffect (() => {        

        fetchPlants();        
    }, [] )


    if(loading){
        return <Load />
    
    }
    return (
        <View style={Styles.container}>
            <View style={Styles.Header}>
                <Header />

                <Text style={Styles.tittle}>
                    Em qual ambiente
                </Text>
                <Text style={Styles.subtittle}>
                    Você quer colocar sua planta?
                </Text>
            </View>

            <View>
                <FlatList
                    data={enviroments}
                    keyExtractor={( item ) => String(item.key)}
                    renderItem={( { item } ) => (
                        <EnviromentButton 
                            tittle={item.title}
                            active={item.key == enviromentsSelected}
                            onPress={() => handleEnviromentSelectede(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={Styles.enviromentlist}
                />
            </View> 

            <View style={Styles.plants}>
                <FlatList
                data={FilteredPlants}
                keyExtractor={( item ) => String(item.id)}
                renderItem={({ item }) => (
                    <PlantCardPrimary 
                        data={item} 
                        onPress={() => handlePlantSelect(item)}
                    />
                )}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                onEndReachedThreshold={0.1}
                onEndReached={({ distanceFromEnd }) =>
                    handleFechMore(distanceFromEnd)            
                }   
                
                ListFooterComponent={
                    loadingMore
                    ? <ActivityIndicator color={colors.green} />
                    : <></>
                }
                             
                />
            </View>
        </View>
    )
}

const Styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.background
    },

    Header:{
        paddingHorizontal: 20
    },

    tittle: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 15        
    },

    subtittle: {
        fontFamily: fonts.text,
        fontSize: 17,
        lineHeight: 20,
        color: colors.heading
    },

    enviromentlist: {
        height: 40,
        justifyContent: "center",
        paddingBottom: 5,
        marginLeft: 32,
        marginVertical: 32
    },

    plants:{
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    }

});