import React, { useEffect } from 'react';
import { Image, Text, View, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { getList, removeData } from "../../Actions"
import { connect } from 'react-redux';
const { width, height } = Dimensions.get('window')


const Home = (props) => {

    /*useEffect(() => {
        props.getList();
    }, []);

    const deleteClick = (item) => {
        Alert.alert(
            item.name,
            "Are you sure to delete?",
            [
                {
                    text: "Cancel",
                    onPress: () => { },
                    style: "cancel"
                },
                { text: "OK", onPress: () => props.removeData({ id: item._id }) }
            ],
            { cancelable: false }
        );
    }
*/
    const renderItem = ({ item }) => (
        <View style={{ margin: 10, alignItems: 'center', justifyContent: 'space-between' }}>
            {item.image ?
                <Image source={{ uri: item.image }} resizeMode='contain' style={{ height: width, width: '100%', }} />
                : /* defaultSource={require('../../Image/head.png')} */
                <Image source={require('../../Image/head.png')} resizeMode='contain' style={{ height: width, width: '100%', }} />
            }
            <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../Image/instagram_like.png')} style={{ height: 25, width: 25, marginRight: 10 }} />
                    <Image source={require('../../Image/instagram_comment.png')} style={{ height: 25, width: 25, marginRight: 10 }} />
                    <Image source={require('../../Image/forward_outline.png')} style={{ height: 25, width: 25, marginRight: 10 }} />
                </View>


                <TouchableOpacity onPress={() => { deleteClick(item) }}>
                    <Image source={require('../../Image/delete.png')} style={{ height: 25, width: 25 }} />
                </TouchableOpacity>

            </View>
            <View style={{ justifyContent: 'space-between', width: '100%', flexDirection: 'row' }}>
                <Text style={{ margin: 10 }}>{item.name}</Text>
                <Text style={{ margin: 10 }}>{item.status}</Text>
                <Text style={{ margin: 10 }}>{item.species}</Text>
            </View>

        </View >
    );
    return (
        <View style={{ flex: 1 }}>
            <Text onPress={() => props.navigation.navigate('HomeDetail')}>Home Page</Text>

            {/* {props.loadingCharacter ? <ActivityIndicator color='black' size='large' /> :
                <FlatList
                    style={{ flex: 1 }}
                    data={props.characters}
                    renderItem={renderItem}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{
                                alignItems: 'center',
                                marginTop: 20,
                                height: 300,
                                justifyContent: 'center'
                            }}>
                                <Text onPress={() => props.navigation.navigate('HomeDetail')} style={{ marginBottom: 30 }}>No record</Text>
                            </View>
                        )
                    }}
                />
            } */}
        </View>
    );
}

const mapStateToProps = ({ charactersResponse }) => {
    const { loadingCharacter, characters } = charactersResponse;
    return { loadingCharacter, characters };
}
export default connect(mapStateToProps, { getList, removeData })(Home);