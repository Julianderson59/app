import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import styles from './style'
import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';

export default function ListaCity({ navigation }) {
    return (
        <View style={styles.body}>
            <MenuProvider>
                <Menu style={styles.menu}>
                <MenuTrigger style={styles.buttonmenu}>
                    <Text style={styles.titulo}>Cidades</Text>
                </MenuTrigger>
                <MenuOptions style={styles.opcao}>
                    <MenuOption style={styles.select} class="red" onSelect={() => navigation.navigate('Petrolândia')}>
                        <Text style={styles.input}>Petrolândia</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => navigation.navigate('Jatobá')}>
                        <Text style={styles.input}>Jatobá</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => navigation.navigate('Paulo Afonso') } >
                        <Text style={styles.input}>Paulo Afonso</Text>
                    </MenuOption>
                    <MenuOption onSelect={() => navigation.navigate('Tacaratu')}>
                        <Text style={styles.input}>Tacaratu</Text>
                    </MenuOption>
                </MenuOptions>
                </Menu>
            </MenuProvider>
        </View>
    );
}