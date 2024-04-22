import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
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
            <Stack.Navigator initialRouteName="Tabs">

                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />

                <Stack.Screen name="CreateUser" component={CreateUser} />

                <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

function Tabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Início" component={Home} />
            <Tab.Screen name="Conta" component={Account} />
            <Tab.Screen name="Sobre" component={About} />
        </Tab.Navigator>
    );
}