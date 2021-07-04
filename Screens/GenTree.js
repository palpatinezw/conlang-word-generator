import React, { useEffect, useState } from 'react';
import { Text, Modal, View, StyleSheet, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Phoneme } from '../components/classes'

function RandomNo(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export default function GenTreeScreen( {route, navigation} ) {
    const [ phonemes, setphonemes ] = useState([])
    const [ reflist, setreflist ] = useState([])
    const [ curphoneme, setcurphoneme ] = useState(0)
    const [ modalVisible, setModalVisible ] = useState(false)

    useEffect(() => {
        var tmpsto
        var c = 0
        for (var key in route.params.phonemes) {
            if (route.params.phonemes.hasOwnProperty(key)) {
                tmpsto.push( [key, route.params.phonemes[key]] )
                reflist.push(key)
            }
        }
        if (tmpsto.length == 0) {
            tmpsto.push([0, new Phoneme('','') ])
        }
        setphonemes(tmpsto)
    }, [])

    function renderPhonemes({item, index}) {
        if (item[1].ref == 0) {
            return
        }
        return (
            <View style={styles.phonemebox}>
                <TouchableOpacity onPress={() => startEdit(index)}>
                    <Text>{item[1].ref}</Text>
                </TouchableOpacity>
            </View>
        )    
    }
    function startEdit(id) {
        setcurphoneme(id)
        setModalVisible(true)
    }

    function newPhoneme() {
        var ref = RandomNo(1, 10000)
        while (reflist.includes(ref)) ref = RandomNo(1, 10000)
        setphonemes([
            ...phonemes,
            [ref, new Phoneme('romanisation', 'ipa')],
        ])
        setcurphoneme(phonemes.length - 1)
        setModalVisible(true)
    }

    //changes the romanisation of the current phoneme
    function changeRom(nRom) {
        var tmp = phonemes
        tmp[curphoneme][1].romanisation = nRom
        setphonemes(tmp)
    }
    //changes the ipa of the current phoneme
    function changeIpa(nIpa) {
        var tmp = phonemes
        tmp[curphoneme][1].ipa = nIpa
        setphonemes(tmp)
    }
    return (
        <View style={styles.container}>
            <Modal 
                visible={modalVisible} 
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalView}>
                    <TextInput style={styles.TextInput} value={phonemes[curphoneme][1].romanisation} onChangeText={(newText) => changeRom(newText)}/>
                    <TextInput style={styles.TextInput} value={phonemes[curphoneme][1].ipa} onChangeText={(newText) => changeIpa(newText)} />
                    <Button title="Done" onPress={() => setModalVisible(!modalVisible)} />
                </View>
            </Modal>
            <FlatList data={phonemes} renderItem={renderPhonemes} keyExtractor={item => item.id.toString()}/>
            <Button title="New" onPress={newPhoneme} />
        </View>
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
    phonemebox: {
        height: 50,
        borderBottomWidth: 5,
        justifyContent: 'center',
        width: "100%",
        flexDirection: 'row',
        justifyContent:'space-between',
        alignItems: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    TextInput: {
        borderWidth: 2,
        borderRadius: 10,
        height: 500,
        padding: 10,
        flex: 5,
    },
});