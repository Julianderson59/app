import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../services/firebaseConfig'
import { getDatabase, onValue, orderByChild, query, ref, remove } from "firebase/database";
import { getAuth } from "firebase/auth";
const db = getDatabase();
const auth = getAuth();

export default function Tasks({ navigation }) {
    const [tasks, setTask] = useState([])

    const deleteTask = (id) => {
        remove(ref(db, 'tasks/' + auth.currentUser.uid + '/' + id));
    }

    useEffect(() => {
        const listTask = query(ref(db, 'tasks/' + auth.currentUser.uid), orderByChild('date'));
        onValue(listTask, (snapshot) => {
            const list = []
            snapshot.forEach((data) => {
                list.push({...data.val(), id: data.key});

            });
            // console.log(list)
            setTask(list)
        });
    }, [])

    return (
        <View style={styles.container}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={tasks}
                renderItem={({ item }) =>
                    <View style={styles.tarefa}>
                        <View>
                            <Text style={styles.data}>{item.date}</Text>
                            <Text style={styles.descricao}>{item.description}</Text>
                        </View>
                        <View style={styles.action}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('EditTask', {id: item.id})}
                            >
                                <Text style={styles.descricao}><MaterialCommunityIcons name="file-document-edit-outline" size={32} /></Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => deleteTask(item.id)}
                            >
                                <Text style={styles.descricao}><MaterialCommunityIcons name="delete-outline" size={32} /></Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                }
            />

            <TouchableOpacity
                style={styles.buttonCreate}
                onPress={() => navigation.navigate('CreateTask')}>
                <Text style={styles.textButtonCreate}>+</Text>
            </TouchableOpacity>
        </View>
    )
}