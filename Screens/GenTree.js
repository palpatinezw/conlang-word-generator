import React, { useEffect, useState } from 'react';
import { Text, Modal, View, StyleSheet, Button, FlatList, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import { Phoneme } from '../components/classes'

function RandomNo(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

export default function GenTreeScreen( {route, navigation} ) {
    return (
        <View style={styles.container}>
            <View style={styles.updown}>
                <Text>You thought this was working code?</Text>
            </View>
            <View style={styles.updown}>
                <Text>HA sike</Text>
            </View>
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
    box: {
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
    updown: {
        flex:1,
        padding: 5,
    }
});