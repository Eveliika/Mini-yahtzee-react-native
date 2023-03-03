import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import styles from '../style/style';
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SCOREBOARD_KEY } from '../constants/Game';

export default Scoreboard = ( {navigation} ) => {

    const [scores, setScores] = useState([]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getScoreboeardData();
        });
        return unsubscribe;
    }, [navigation]);

    const getScoreboeardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores.sort((a, b) => parseFloat(b.points) - parseFloat(a.points)));
            }
        } catch (error) {
            console.log('Read error: ' + error.message);
        }
    }

    const B = (props) => <Text style={{fontWeight: 'bold'}}>{props.children}</Text>

    return (
        <View style={styles.container}>
            <Entypo name="trophy" size={70} style={styles.rulessymbol}/>
            <Text style={styles.rulesheader}>Top Seven</Text>
            <View style={styles.rules}>
                {scores.slice(0,7).map((player, i) => (
                    <Text style={styles.playerinfo} key={i}>{i + 1}. {player.name} {player.date} {player.time}   <B>{player.points}</B></Text>
                ))}
            </View>
        </View>
    )
}