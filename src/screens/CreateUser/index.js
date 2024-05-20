import React, { useState } from 'react'
import { firebase } from '../../services/firebaseConfig'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getDatabase, push, ref, set } from "firebase/database";
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './style'
// const db = getFirestore(firebase);
const db = getDatabase();

export default function CreateUser({ navigation }) {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorCreateUser, setErrorCreateUser] = useState(null)

    const validate = () => {
        if (nome == "") {
            setErrorCreateUser("Informe seu nome")
        } else if (email == "") {
            setErrorCreateUser("Informe seu e-mail")
        } else if (password == "") {
            setErrorCreateUser("Informe uma senha")
        } else {
            setErrorCreateUser(null)
            createUser()
        }
    }

    const createUser = () => {
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                /* setDoc(doc(db, "users", user.uid), {
                    nome: nome,
                    email: email
                }); */

                set(ref(db, 'users/' + user.uid), {
                    nome: nome,
                    email: email
                });

                navigation.navigate('Tabs')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorCreateUser(errorMessage)
            });

    }

    return (
        <View style={styles.container}>
            {errorCreateUser != null && (
                <Text style={styles.alert}>{errorCreateUser}</Text>
            )}

            <TextInput
                style={styles.input}
                placeholder='Nome'
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                placeholder='E-mail'
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                placeholder='Senha'
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={validate}
            >
                <Text style={styles.textButton}>Criar usuário</Text>
            </TouchableOpacity>
        </View>
    )
}