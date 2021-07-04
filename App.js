import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as SQLite from "expo-sqlite";
import { Phoneme, Pattern, Group } from './components/classes'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import PhonemeScreen from './Screens/Phonemes'
import GenTreeScreen from './Screens/GenTree'

function RandomNo(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

const db = SQLite.openDatabase("wordgen.db");

function Home( {route, navigation} ) {
	const [ word, setWord ] = useState(['',''])
	const [ phonemes, setphonemes ] = useState({})
	const [ gentree, setgentree ] = useState({})

	function genWord() {
		return;
	}
	function loadAll() {
		loadPhonemes()
		loadGroupsPatterns()
	}
	function loadPhonemes() {
		function phonemeSetter(seq) {
			var tmpsto = {};
			for (var i = 0; i < seq.length; i++) {
				tmpsto[seq[i].ref] = new Phoneme(seq[i].romanisation, seq[i].ipa)
			}
			setphonemes(tmpsto)
		}
		db.transaction((tx)=> {
			tx.executeSql(
				'SELECT * FROM phonemes ORDER BY id DESC', null, 
				(txObj, {rows: { _array }}) => phonemeSetter(_array), 
				(txObj, error) => console.log("DB error: ", error)
			) 
		})
	}
	function loadGroupsPatterns() {
		var tmpsto = {}
		function groupSetter(seq) {
			for (var i = 0; i < seq.length; i++) {
				tmpsto[seq[i].ref] = new Group(seq[i].seq.split(','))
			}
		}
		function patternSetter(seq) {
			for (var i = 0; i < seq.length; i++) {
				tmpsto[seq[i].ref] = new Pattern(seq[i].seq.split(','))
			}
		}
		db.transaction((tx)=> {
			tx.executeSql(
				'SELECT * FROM groups ORDER BY id DESC', null, 
				(txObj, {rows: { _array }}) => groupSetter(_array), 
				(txObj, error) => console.log("DB error: ", error)
			) 
		})
		db.transaction((tx)=> {
			tx.executeSql(
				'SELECT * FROM patterns ORDER BY id DESC', null, 
				(txObj, {rows: { _array }}) => patternSetter(_array), 
				(txObj, error) => console.log("DB error: ", error)
			) 
		})
		setgentree(tmpsto)
	}

	//initial load all DB data
	useEffect(() => {
		db.transaction((tx) => {
			tx.executeSql('CREATE TABLE IF NOT EXISTS phonemes (id INTEGER PRIMARY KEY AUTOINCREMENT, romanisation TEXT, ipa TEXT, ref INTEGER)')
		}, null, null)
		db.transaction((tx) => {
			tx.executeSql('CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, seq TEXT, ref TEXT)')
		}, null, null)
		db.transaction((tx) => {
			tx.executeSql('CREATE TABLE IF NOT EXISTS patterns (id INTEGER PRIMARY KEY AUTOINCREMENT, seq TEXT, ref TEXT)')
		}, null, null)
		loadAll()
	}, [])

	//phoneme list update
	useEffect(() => {
		if (route.params?.phonemes) {
			const tPhonemes = phonemes
			const nPhonemes = {}
			for (var i = 0; i < route.params.phonemes.length; i++) {
				const ipa = route.params.phonemes[i][1].ipa
				const romanisation = route.params.phonemes[i][1].romanisation
				const ref = route.params.phonemes[i][0]
				nPhonemes[ref].push(route.params.phonemes[i][1])

				//check for modifications and UPDATE
				if (ref in tPhonemes) {
					//TODO : update db
				}
				// check for additions and INSERT
				else {
					db.transaction((tx) => {
						tx.executeSql(`INSERT INTO phonemes (romanisation, ipa, ref) VALUES (?, ?, ?)`, [
							romanisation, ipa, ref
						])
					}, null, null)
				}
			}
		}
	}, [route.params?.phonemes])

	return (
		<View style={styles.container}>
			<Text style={styles.paragraph}>
				PLACEHOLDER - ROMANISATION
			</Text>
			<Text style={styles.subtitle}>
				PLACEHOLDER - IPA
			</Text>
			<Button title="Gen" onPress={genWord} />
			<Button title="Phonemes" onPress={() => navigation.navigate("Phonemes", {phonemes})} />
		</View>
	);
}

const Stack = createStackNavigator();
export default function App() {
	//TODO - GenTreeScreen
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Phonemes" component={PhonemeScreen} />
				<Stack.Screen name="Patterns and Groups" component={GenTreeScreen} />
			</Stack.Navigator>
		</NavigationContainer>
		
	)
}

const styles = StyleSheet.create({
container: {
	flex: 1,
	justifyContent: 'center',
	paddingTop: Constants.statusBarHeight,
	backgroundColor: '#ecf0f1',
	padding: 8,
},
paragraph: {
	margin: 1,
	fontSize: 18,
	fontWeight: 'bold',
	textAlign: 'center',
},
subtitle: {
	color: 'gray',
	fontSize: 16,
	textAlign: 'center',
	margin: 5,
},
});
