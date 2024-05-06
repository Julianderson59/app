import React, { useEffect, useState } from 'react'
import { getAuth, signOut } from "firebase/auth";
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './style'
import { firebase } from '../../services/firebaseConfig'
import { doc, getDoc, getFirestore } from 'firebase/firestore';
const db = getFirestore(firebase);

export default function Account({ navigation }) {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")

    const auth = getAuth();

    const recuperarDados = async () => {
        const user = auth.currentUser;
        const docSnap = await getDoc(doc(db, "users", user.uid));
        if (docSnap.exists()) {
            // console.log("Document data:", docSnap.data())
            setNome(docSnap.data().nome)
            setEmail(docSnap.data().email)
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }

    useEffect(() => {
        recuperarDados();
    }, [])

    const logoff = () => {
        signOut(auth).then(() => {
            navigation.navigate('Login')
        }).catch((error) => {
            // An error happened.
        });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Dados do Usuário</Text>
            <Text style={styles.info}>{ nome }</Text>
            <Text style={styles.info}>{ email }</Text>

            <TouchableOpacity style={styles.button}
                onPress={logoff}
            >
                <Text style={styles.textButton}>Sair</Text>
            </TouchableOpacity>
        </View>
    )
}