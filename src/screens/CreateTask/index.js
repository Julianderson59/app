import { firebase } from '../../services/firebaseConfig'
import { getDatabase, push, ref, set } from "firebase/database";
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { getAuth } from "firebase/auth";
import React, { useState } from 'react'
import styles from './style'
const db = getDatabase();
const auth = getAuth();

export default function CreateTask({ navigation }) {
    const [date, setDate] = useState("")
    const [description, setDescription] = useState("")
    const [errorCreateTask, setErrorCreateTask] = useState(null)

    const validate = () => {
        if (date == "") {
            setErrorCreateTask("Informe a data da tarefa")
        } else if (description == "") {
            setErrorCreateTask("Informe a descrição da tareja")
        } else {
            setErrorCreateTask(null)
            createTask()
        }
    }

    const createTask = () => {
        const taskListRef = ref(db, 'tasks/' + auth.currentUser.uid);
        const newTaskRef = push(taskListRef);
        set(newTaskRef, {
            date: date,
            description: description
        });
        navigation.navigate('Tabs')
    }

    return (
        <View style={styles.container}>
            {errorCreateTask != null && (
                <Text style={styles.alert}>{errorCreateTask}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='Data'
                value={date}
                onChangeText={setDate}
            />

            <TextInput
                style={styles.input}
                placeholder='Descrição'
                value={description}
                onChangeText={setDescription}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={validate}
            >
                <Text style={styles.textButton}>Criar tarefa</Text>
            </TouchableOpacity>
        </View>
    )
}