import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import styles from './style'

export default function CreateUser() {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorCreateUser, setErrorCreateUser] = useState(null)

    const validate = () => {
        if (nome == "") {
            setErrorCreateUser("Informe seu nome")
        } else if (email == "") {
            setErrorCreateUser("Informe seu e-mail")
        } else if (password == ""){
            setErrorCreateUser("Informe uma senha")
        } else {
            setErrorCreateUser(null)
            // createUser()
        }
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