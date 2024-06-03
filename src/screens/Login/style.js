import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F7EAF8",
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    logo: {
        marginBottom: 50,
    },
    alert: {
        fontSize: 18,
        color: '#710473',
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        fontSize: 18,
        borderRadius: 10,
        backgroundColor: '#D9D9D9',
        padding: 20,
        marginBottom: 20,
        width: '90%'
    },
    button: {
        backgroundColor: '#710473',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '40%'
    },
    textButton: {
        fontSize: 24,
        textAlign: 'center',
        color: '#fff'
    },
    buttonCreate: {
        backgroundColor: '#710473',
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        width: '40%'
    },
    buttonCreateText: {
        fontSize: 18,
        textAlign: 'center',
        color: '#FFF'
    }
})

export default styles