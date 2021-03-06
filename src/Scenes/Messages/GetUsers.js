import React, { useEffect } from 'react';
import { Image, Text, View, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { getList, removeData } from "../../Actions"
import { connect } from 'react-redux';
import { Container, Header, Button, Icon, Fab } from 'native-base';
import { colors } from '../../style';
import { getAllUsers, startRoom } from '../../Actions';


const GetUsers = (props) => {


    useEffect(() => {
        //console.log(props.user)
        props.getAllUsers(props.user);
    }, []);


    return (
        <View style={{ flex: 1 }}>
            {props.loading ? <ActivityIndicator color='black' size='large' /> :
                <FlatList
                    style={{ flex: 1, backgroundColor: 'white' }}
                    data={props.allUsers}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {

                                    const second_user = item;
                                    const path = props.user.username + '+' + second_user.username;

                                    const params = {
                                        createdDate: new Date(),
                                        first_user: props.user,
                                        second_user,
                                        path
                                    };
                                    props.startRoom(path, params);
                                    props.navigation.navigate('MessageDetail', { data: { path, second_user } });
                                }}
                                style={{ flexDirection: 'row', margin: 10, borderBottomWidth: 0.5 }}>
                                <Image source={{ uri: item.profile_image }} style={{ width: 50, height: 50, borderRadius: 25 }} />
                                <View style={{ padding: 10 }} >
                                    <Text style={{ fontFamily: 'bold', fontSize: 16 }}>{item.name}</Text>
                                    <Text style={{ fontSize: 12 }}>@{item.username}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }

                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{
                                alignItems: 'center',
                                marginTop: 20,
                                height: 300,
                                justifyContent: 'center'
                            }}>
                                <Text style={{ marginBottom: 30 }}>No messages</Text>
                            </View>
                        )
                    }}
                />
            }
        </View>
    );
}

const mapStateToProps = ({ messageResponse, authResponse }) => {
    const { loadingUsers, allUsers } = messageResponse;
    const { user } = authResponse;
    return { loadingUsers, allUsers, user };
}
export default connect(mapStateToProps, { getAllUsers, startRoom })(GetUsers);