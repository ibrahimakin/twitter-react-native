import * as React from 'react';
import { View, Text, TouchableOpacity, Image, Animated, ActivityIndicator } from 'react-native';
import { Icon } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
//import { AuthContext } from './context';
import { connect } from 'react-redux';
import auth from '@react-native-firebase/auth';

import Menu from './Scenes/Menu/Menu'
import Login from './Scenes/Auth/Login'
import Register from './Scenes/Auth/Register'
import FirstScreen from './Scenes/Auth/FirstScreen';
import Home from './Scenes/Home/Home'
import HomeDetail from './Scenes/Home/HomeDetail'
import AddItem from './Scenes/Home/AddItem';
import Messages from './Scenes/Messages/Messages';
import MessageDetail from './Scenes/Messages/MessageDetail';
import GetUsers from './Scenes/Messages/GetUsers';
import Notifications from './Scenes/Notifications/Notifications';
import NotificationDetail from './Scenes/Notifications/NotificationDetail';
import Search from './Scenes/Search/Search';
import SearchDetail from './Scenes/Search/SearchDetail';
import AddTweet from './Scenes/Tweets/AddTweet';

import { navigationRef } from './RootNavigation';
import { LOCAL_AUTH_ID, USER } from './Actions/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from './style'

const AuthStack = createStackNavigator();
const AuthStackScreen = () => {
    return (
        < AuthStack.Navigator initialRouteName='FirstScreen'>

            <AuthStack.Screen
                name="FirstScreen"
                component={FirstScreen}
                options={({ navigation, route }) => ({
                    title: 'Login',
                    headerShown: false
                })}

            />

            <AuthStack.Screen
                name="Login"
                component={Login}
                options={({ navigation, route }) => ({
                    title: 'Login',
                    headerShown: false
                })}
            />


            <AuthStack.Screen
                name="Register"
                component={Register}
                options={{
                    title: 'Register',
                    headerShown: false
                }}
            />
            <AuthStack.Screen
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
            <AuthStack.Screen
                name="AddItem"
                component={AddItem}
                options={{ title: 'Add New Character' }}
            />


        </AuthStack.Navigator>
    );
};

const menu = (navigation) => {
    return (
        <TouchableOpacity
            onPress={() => { navigation.openDrawer() }}
            style={{ marginLeft: 10 }}
        >
            <Icon name='user' type='FontAwesome' />
        </TouchableOpacity>
    )
}

const HomeStack = createStackNavigator();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={Home}
                options={({ navigation, route }) => ({
                    headerLeft: () => menu(navigation),
                })}
            />
            <HomeStack.Screen name="HomeDetail" component={HomeDetail} />
        </HomeStack.Navigator>
    );
};

const MessagesStack = createStackNavigator();
const MessagesStackScreen = () => {
    return (
        <MessagesStack.Navigator>
            <MessagesStack.Screen name="Messages" component={Messages} options={({ navigation, route }) => ({ headerLeft: () => menu(navigation), })} />
            <MessagesStack.Screen name="MessageDetail" component={MessageDetail} />
            <MessagesStack.Screen name="GetUsers" component={GetUsers} />
        </MessagesStack.Navigator>
    );
};

const NotificationsStack = createStackNavigator();
const NotificationsStackScreen = () => {
    return (
        <NotificationsStack.Navigator>
            <NotificationsStack.Screen name="Notifications" component={Notifications} options={({ navigation, route }) => ({ headerLeft: () => menu(navigation), })} />
            <NotificationsStack.Screen name="NotificationDetail" component={NotificationDetail} />
        </NotificationsStack.Navigator>
    );
};

const SearchStack = createStackNavigator();
const SearchStackScreen = () => {
    return (
        <SearchStack.Navigator>
            <SearchStack.Screen name="Search" component={Search} options={({ navigation, route }) => ({ headerLeft: () => menu(navigation), })} />
            <SearchStack.Screen name="Search Detail" component={SearchDetail} />
        </SearchStack.Navigator>
    );
};

const TabStack = createBottomTabNavigator();
const TabStackScreen = () => {
    return (
        <TabStack.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = 'home'
                    } else if (route.name === 'Search') {
                        iconName = 'search';
                    } else if (route.name === 'Notifications') {
                        iconName = 'bell';
                    } else if (route.name === 'Messages') {
                        iconName = 'envelope-open';
                    }


                    // You can return any component that you like here!
                    return <Icon name={iconName} type='FontAwesome' size={size} style={{ color: focused ? colors.main : color }} />;
                },
            })}
            tabBarOptions={{
                //activeTintColor: 'tomato',
                inactiveTintColor: 'gray',
                showLabel: false,
            }}
        >
            <TabStack.Screen name="Home" component={HomeStackScreen} />
            <TabStack.Screen name="Search" component={SearchStackScreen} />
            <TabStack.Screen name="Notifications" component={NotificationsStackScreen} />
            <TabStack.Screen name="Messages" component={MessagesStackScreen} />
        </TabStack.Navigator>);
};

const DrawerStack = createDrawerNavigator();
const DrawerStackScreen = () => {
    return (
        <DrawerStack.Navigator
            drawerContent={Menu}
            drawerType='back'
            drawerStyle={{
                //width: '85%'
            }}>
            <DrawerStack.Screen name="Drawer" component={TabStackScreen} />
        </DrawerStack.Navigator>
    )
}

const RootStack = createStackNavigator();

function Router(props) {
    // const [isAuth, setAuth] = React.useState(false);
    // const authContext = React.useMemo(
    //     () => ({
    //         signIn: async data => {
    //             setAuth(true)
    //         },
    //         signOut: () => {
    //             setAuth(false)
    //         },
    //         // signUp: async data => {
    //         //     setAuth(true)
    //         // },
    //     }),
    //     []
    // );

    return (
        //<AuthContext.Provider value={authContext}>
        <NavigationContainer ref={navigationRef}>
            <RootStack.Navigator headerMode='none' mode='model'>
                {props.user ?
                    (<>
                        <RootStack.Screen
                            name='Main'
                            component={DrawerStackScreen}
                            options={{
                                animationEnabled: false
                            }}
                        />
                        <RootStack.Screen name='AddTweet' component={AddTweet} />
                    </>)
                    :
                    (<RootStack.Screen
                        name='Main'
                        component={AuthStackScreen}
                        options={{
                            animationEnabled: false
                        }}
                    />)
                }
            </RootStack.Navigator>

        </NavigationContainer >

        //</AuthContext.Provider>
    );
}
const mapStateToProps = ({ authResponse }) => {
    const { loading, user } = authResponse;
    return { loading, user };
};

export default connect(mapStateToProps, {})(Router);