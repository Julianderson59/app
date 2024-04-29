import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Login from './src/screens/Login'
import CreateUser from './src/screens/CreateUser'
import Home from './src/screens/Home';
import About from './src/screens/About';
import Account from './src/screens/Account';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Tabs"
                screenOptions={{
                    headerTintColor: '#FFF',
                    headerTitleAlign: 'center',
                    headerStyle: { backgroundColor: '#F60' }
                }}
            >

                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

                <Stack.Screen name="CreateUser" component={CreateUser} options={{ title: 'Cadastro de Usuário'}} />

                <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Tabs() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: "#FFF", //Cor de ícones ativos
                tabBarInactiveTintColor: "#F60", //Cor de ícones inativos
                tabBarActiveBackgroundColor: '#F60',
                tabBarShowLabel: true,
                tabBarStyle: { backgroundColor: '#070A52' },
                headerShown: true,
                headerTintColor: '#FFF',
                headerTitleAlign: 'center',
                headerStyle: { backgroundColor: '#F60' }
            }}
        >
            <Tab.Screen name="Início" component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="home" color={color} size={32} />
                    ),
                }}
            />
            <Tab.Screen name="Conta" component={Account}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="account" color={color} size={32} />
                    ),
                }}
            />
            <Tab.Screen name="Sobre" component={About}
                options={{
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="information-outline" color={color} size={32} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}