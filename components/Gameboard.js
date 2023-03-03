import React, { useState, useEffect } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';
import { NBR_OF_DICES, NBR_OF_THROWS, MAX_SPOT, SCOREBOARD_KEY } from '../constants/Game';
import { Col, Grid } from 'react-native-easy-grid';
import AsyncStorage from '@react-native-async-storage/async-storage';

let board = [];

export default Gameboard = ({ route }) => {

    const [playerName, setPlayerName] = useState('');
    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('');

    // *** FOR DICE ROW IN THE TOP
    // This array has the information whether dice is selected or not
    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    // This array has dice spots for a throw
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));

    // *** FOR POINTS ROW IN THE BOTTOM
    // This array has total points different spot counts
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

    // *** FOR SPOT COUNTS IN THE BOTTOM
    // This array has the information whether the spot count has been selected or not
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    
    const [scores, setScores] = useState([])
    const [totalPoints, setTotalPoints] = useState(0);
    const [buttonText, setButtonText] = useState('Throw dices');
    const [bonusPoints, setBonusPoints] = useState(63);
    // const [bonusStatus, setBonusStatus] = useState('');

    const row = [];
    for (let i = 0; i < NBR_OF_DICES; i++) {
        row.push(
            <Pressable
                key={"row" + i}
                onPress={() => selectDice(i)}>
                <MaterialCommunityIcons
                    name={board[i]}
                    key={"row" + i}
                    size={50}
                    color={getDiceColor(i)}
                />
            </Pressable>
        );
    }

    const pointsRow = [];
    
    for (let spot = 0; spot < MAX_SPOT; spot++) {
        pointsRow.push(
            <Col key={"points" + spot}>
                <Text key={"points" + spot} style={styles.points}>{getSpotTotal(spot)}</Text>
            </Col>
        )
    }

    const buttonsRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
        buttonsRow.push(
        <Col key={"buttonsRow" + diceButton}>
            <Pressable
                key={"buttonsRow" + diceButton}
                onPress={() => selectDicePoints(diceButton)}>
                <MaterialCommunityIcons
                    name={"numeric-" + (diceButton + 1) + "-circle"}
                    key={"buttonsRow" + diceButton}
                    size={40}
                    color={getDicePointsColor(diceButton)}>
                </MaterialCommunityIcons>
            </Pressable>
        </Col>
        )
    }

    // This will be done once when entering to gameboard first time
    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
            getScoreboeardData();
        }
    }, []);

    // This will be done when number of throws changes
    useEffect(() => {
        if (nbrOfThrowsLeft === 0) {
            setStatus('Select your points');
        } else if (nbrOfThrowsLeft < 0) {
            setNbrOfThrowsLeft(NBR_OF_THROWS - 1);
        // Points will be saved when all points from bottom row have been selected
        } else if (selectedDicePoints.every(x => x)) {
            setStatus('Game over. All points selected');
            setButtonText('New game');
            let sum = 0;
            for (let num of dicePointsTotal) {
                 sum = sum + num;
            }

            if (sum >= 63) {
                setTotalPoints(sum + 50);
            } else {
                setTotalPoints(sum);
            }
            
            savePlayerPoints();
        } else {
            let sum = 0;
            for (let num of dicePointsTotal) {
                 sum = sum + num;
            }
            setTotalPoints(sum);
        }
    }, [nbrOfThrowsLeft]);

    useEffect(() => {
        checkBonusPoints();
    },[totalPoints])

    function getDiceColor(i) {
        return selectedDices[i] ? "black" : "#ab8ee1";
    }

    function getDicePointsColor(i) {
        if (selectedDicePoints[i]) {
            return "black";
        } else {
            return "#ab8ee1";
        }
    }

    function selectDice(i) {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    function selectDicePoints(i) {
        if (nbrOfThrowsLeft > 0) {
            setStatus('Throw 3 times before setting points');
        } else {
            let selected = [...selectedDices];
            let selectedPoints = [...selectedDicePoints];
            let points = [...dicePointsTotal];
            if (!selectedPoints[i]) {
                selectedPoints[i] = true;
                let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0);
                points[i] = nbrOfDices * (i + 1);
                setDicePointsTotal(points);
            }
            selected.fill(false);
            setSelectedDices(selected);
            setSelectedDicePoints(selectedPoints);
            setNbrOfThrowsLeft(NBR_OF_THROWS);

            if (selectedDicePoints[i]) {
                setStatus('You already selected points for ' + [i + 1]);
            }

            return points[i];
        }
    }

    function throwDices() {
        if (nbrOfThrowsLeft <= 0 ) {
            setStatus('Select your points before next throw')
        } else if (selectedDicePoints.every(x => x === true)) {
            setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
            setDicePointsTotal(new Array(MAX_SPOT).fill(0));
            setTotalPoints(0);
            setStatus('Throw dices');
            setButtonText('Throw dices');
        } else {
            let spots = [...diceSpots];
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                  let randomNumber = Math.floor(Math.random() * 6 + 1);
                  board[i] = 'dice-' + randomNumber;
                  spots[i] = randomNumber;
                }
            }
            setNbrOfThrowsLeft(nbrOfThrowsLeft - 1);
            setDiceSpots(spots);
            setStatus('Select and throw dices again');
        }
    }

    function checkBonusPoints() {
        setBonusPoints(63 - totalPoints)
    }

    const getScoreboeardData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(SCOREBOARD_KEY);
            if (jsonValue !== null) {
                let tmpScores = JSON.parse(jsonValue);
                setScores(tmpScores)
            }
        } catch (error) {
            console.log('Read error: ' + error.message);
        }
    }

    const savePlayerPoints = async () => {

        let date = new Date().getDate();
        let month = new Date().getMonth() + 1;
        let year = new Date().getFullYear();
        let hours = (new Date().getHours() < 10 ? '0' : '') + new Date().getHours();
        let minutes = (new Date().getMinutes() < 10 ? '0' : '') + new Date().getMinutes();

        const playerPoints = {
            name: playerName,
            date: date + '.' + month + '.' + year,
            time: hours + ':' + minutes,
            points: totalPoints
        }

        try {
            const newScore = [...scores, playerPoints];
            const jsonValue = JSON.stringify(newScore);
            await AsyncStorage.setItem(SCOREBOARD_KEY, jsonValue);
        } catch (error) {
            console.log('Save error: ' + error.message);
        }
    }

    

    return (
        <View style={styles.gameboard}>
            {nbrOfThrowsLeft == 3 
                ?
                <View style={styles.dices}>
                    <MaterialCommunityIcons
                        name={"dice-multiple"}
                        size={90}
                        color={'#ab8ee1'} />
                </View>
                : 
                <View style={styles.flex}>{row}</View>
            }
            <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsLeft}</Text>
            <Text style={styles.gameinfo}>{status}</Text>
            <Pressable style={styles.button}
                onPress={() => throwDices()}>
                <Text style={styles.buttonText}>
                    {buttonText}
                </Text>
            </Pressable>
            <Text style={styles.gameinfo}>Total: {totalPoints}</Text>
            { totalPoints < 63 
                ?   <Text style={styles.bonus}>You are {bonusPoints} points away from bonus</Text>
                :   <Text style={styles.bonus}>Congrats! 50 bonus points will be added</Text>
            }
            <View style={styles.dicepoints}><Grid>{pointsRow}</Grid></View>
            <View style={styles.dicepoints}><Grid>{buttonsRow}</Grid></View>
            <Text style={styles.player}>Player: {playerName}</Text>
        </View>
    )
}