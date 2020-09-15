import React, { useEffect } from 'react';
import { Image, Text, View, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { getList, removeData } from "../../Actions"
import { connect } from 'react-redux';
import { Container, Header, Button, Icon, Fab } from 'native-base';
import { colors } from '../../style';
import { getRooms } from '../../Actions';
import MessageItems from './MessageItems';
const { width, height } = Dimensions.get('window')


const Messages = (props) => {


    useEffect(() => {
        props.getRooms();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            {props.loading ? <ActivityIndicator color='black' size='large' /> :
                <FlatList
                    style={{ flex: 1, backgroundColor: 'white' }}
                    data={props.rooms}
                    renderItem={({ item, index }) =>
                        <MessageItems
                            data={item}
                            index={index}
                        />
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
            <Fab
                containerStyle={{}}
                style={{ backgroundColor: colors.main }}
                position="bottomRight"
                onPress={() => { props.navigation.navigate('GetUsers') }}>
                <Icon name="plus" type='FontAwesome' />
            </Fab>
        </View>
    );
}

const mapStateToProps = ({ messageResponse }) => {
    const { loadingGetRoom, rooms } = messageResponse;
    return { loadingGetRoom, rooms };
}
export default connect(mapStateToProps, { getRooms })(Messages);