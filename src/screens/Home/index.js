import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './style'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { firebase } from '../../services/firebaseConfig'
import { collection, doc, getDoc, getFirestore, onSnapshot, orderBy, query } from 'firebase/firestore';
import { getDatabase, onValue, ref } from "firebase/database";
import { getAuth } from "firebase/auth";
// const db = getFirestore(firebase);
const db = getDatabase();
const auth = getAuth();

export default function Home({ navigation }) {
    const [tasks, setTask] = useState([])

    useEffect(() => {
        const userId = auth.currentUser.uid;
        // console.log("Usuário:" + userId);
        return onValue(ref(db, 'tasks/' + userId), (snapshot) => {
            const list = []
            const data = snapshot.val()
            for (const id in data) {
                list.push({...data[id], id: id});
            }
            console.log(list);
            setTask(list)
        });

        // Função para listar os registros
        /* const q = query(collection(db, "tasks"), orderBy("date_registry", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const list = []
            querySnapshot.forEach((doc) => {
                list.push({ ...doc.data(), id: doc.id })
                console.log("LISTAGEM")
                console.log(doc.id, " => ", doc.data());
            });
            setTask(list)
            console.log(list);
        }); */

    }, [])

    const tarefas = [
        {
            id: '1',
            data: '20/05/2024',
            descricao: 'Estudar para as provas da segunda etapa',
        },
        {
            id: '2',
            data: '25/05/2024',
            descricao: 'Começar projeto de Mobile',
        },
        {
            id: '3',
            data: '25/05/2024',
            descricao: 'Levar chachorro para tomar vacina',
        },
        {
            id: '4',
            data: '26/05/2024',
            descricao: 'Reunião de projeto de extensão',
        },
        {
            id: '5',
            data: '27/05/2024',
            descricao: 'Reunião de projeto de Mobile',
        },
        {
            id: '6',
            data: '28/05/2024',
            descricao: 'Ir ao dentista',
        },
    ];

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
                        <Text style={styles.descricao}><MaterialCommunityIcons name="check-circle-outline" size={32} /></Text>
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