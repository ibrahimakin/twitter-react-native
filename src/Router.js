import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Scenes/Auth/Login'
import Register from './Scenes/Auth/Register'
import Home from './Scenes/Home/Home'
import AddItem from './Scenes/Home/AddItem';


import { navigationRef } from './RootNavigation';
import AsyncStorage from '@react-native-community/async-storage';
import { LOCAL_AUTH_ID, USER } from './Actions/types';
import FirstScreen from './Scenes/Auth/FirstScreen';

const Stack = createStackNavigator();

function Router(props) {
    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator initialRouteName='FirstScreen'>

                <Stack.Screen
                    name="FirstScreen"
                    component={FirstScreen}
                    options={({ navigation, route }) => ({
                        title: 'Login',
                        headerShown: false
                    })}

                />

                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={({ navigation, route }) => ({
                        title: 'Login',
                        headerShown: false
                    })}
                />


                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        title: 'Register',
                        headerShown: false
                    }}
                />
                <Stack.Screen
                    name="Home"
                    component={Home}
                    options={({ navigation }) => ({
                        title: 'Home',
                        headerLeft: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    AsyncStorage.removeItem(LOCAL_AUTH_ID);
                                    USER.token = null;
                                    navigation.replace('Login');
                                }}
                                style={{ marginLeft: 10 }}>
                                <Image style={{ height: 20, width: 20 }} source={require('./Image/logout.png')} />
                            </TouchableOpacity>
                        ),
                        headerRight: () => (
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate('AddItem');
                                }}
                                style={{ marginRight: 10 }}>
                                <Text style={{ fontSize: 30 }}>+</Text>
                            </TouchableOpacity>
                        ),
                    })}
                />
                <Stack.Screen
                    name="AddItem"
                    component={AddItem}
                    options={{ title: 'Add New Character' }}
                />


            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Router;