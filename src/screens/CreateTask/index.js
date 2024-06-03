import { firebase } from '../../services/firebaseConfig'
import { getDatabase, push, ref, set, onValue } from "firebase/database";
import { View, Text, TextInput, TouchableOpacity, Button } from 'react-native'
import { getAuth } from "firebase/auth";
import React, { useState } from 'react'
import styles from './style'
const db = getDatabase();
const auth = getAuth();

    // Função para criar terefa no banco
    export default function Comments({ navigation }) {
        const [comment, setComment] = useState("");
        const [error, setError] = useState(null);
        const [commentsList, setCommentsList] = useState([]);
    
        const validate = () => {
            if (comment === "") {
                setError("Informe um comentário");
            } else {
                setError(null);
                addComment();
            }
        };
    
        const addComment = () => {
            if (auth.currentUser) {
                const commentsRef = ref(db, 'comments/' + auth.currentUser.uid);
                const newCommentRef = push(commentsRef);
                set(newCommentRef, {
                    comment: comment,
                    date: new Date().toISOString()
                }).then(() => {
                    setComment("");
                    fetchComments();
                }).catch((error) => {
                    setError(error.message);
                });
            } else {
                setError("Usuário não está autenticado");
            }
        };
    
        const fetchComments = () => {
            if (auth.currentUser) {
                const commentsRef = ref(db, 'comments/' + auth.currentUser.uid);
                onValue(commentsRef, (snapshot) => {
                    const data = snapshot.val();
                    if (data) {
                        const commentsArray = Object.values(data);
                        setCommentsList(commentsArray);
                    } else {
                        setCommentsList([]);
                    }
                });
            }
        };
    
    
        return (
            <View style={styles.container}>
                {error && (
                    <Text style={styles.alert}>{error}</Text>
                )}
    
                <TextInput
                    style={styles.input}
                    placeholder='Adicione um comentário'
                    value={comment}
                    onChangeText={setComment}
                />
    
                <TouchableOpacity
                    style={styles.button}
                    onPress={validate}
                >
                    <Text style={styles.textButton}>Adicionar Comentário</Text>
                </TouchableOpacity>
    
        
            </View>
        );
    }