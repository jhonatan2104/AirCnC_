import React, { useState} from "react";
import { SafeAreaView, Alert, StyleSheet, TextInput, TouchableOpacity, AsyncStorage,Text } from "react-native";

import api from "../services/api";

export default function Book({ navigation }){
    const id = navigation.getParam("id");
    const [date, setDate] = useState("");
    async function hendleSubmit(){
        const user_id = await AsyncStorage.getItem("User");

        await api.post(`/spots/${id}/booking`, {
            date
        }, {
            headers: {user_id}
        });

        Alert.alert("Solicitação de reserva enviada.");
        
        navigation.navigate("List");
    };

    function hendleCancel(){
        navigation.navigate("List");
    }
    return (
        <SafeAreaView style={styles.conteiner}>
            <Text style = {styles.label}>DATA DE INTERESSE</Text>
            <TextInput
                style = {styles.input}
                placeholder = "Qual data você quer reserva?"
                placeholderTextColor = "#999"
                autoCapitalize = "words"
                autoCorrect = {false}
                value = {date}
                onChangeText = {setDate}
            />
            <TouchableOpacity onPress={hendleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={hendleCancel} style={[styles.button,styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    conteiner : {
        margin: 30
    },
    label :{
        fontWeight: "bold",
        color : "#444",
        marginBottom: 8,
        marginTop: 10
    },
    input: {
        borderWidth : 1,
        borderColor : "#ddd",
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button : {
        height: 42,
        backgroundColor: "#f05a5b",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2
    },
    buttonText : {
        color: "#FFF",
        fontWeight: "bold",
        fontSize: 16
    },
    cancelButton : {
        backgroundColor: "#ccc",
        marginTop: 10
    },
})