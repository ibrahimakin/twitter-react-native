import React, { useEffect } from 'react';
import { Alert, Image, Text, View, StyleSheet, FlatList, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import { getList, deleteList, deleteItem } from '../Actions';
import { Button } from '../Components'
import { TouchableOpacity } from 'react-native-gesture-handler';


const ListPage = (props) => {

    useEffect(() => {
        props.getList();
    }, [])

    let alertOff = true;

    function deleteAll() {
        props.deleteList(props.data);
    }
    function deleteOne(item) {
        props.deleteItem(item);
    }

    const deleteClick = (item) => {
        Alert.alert(
            item.title,
            "Are you sure to delete?",
            [
                {
                    text: "Cancel",
                    onPress: () => { alertOff = true; },
                    style: "cancel"
                },
                { text: "OK", onPress: () => { deleteOne(item); alertOff = true; } }
            ],
            { cancelable: false }
        );
    }


    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => { if (alertOff) props.navigation.navigate('UpdatePage', { selected: item, index: props.list.indexOf(item) }); }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{item.title}</Text>
                    <TouchableOpacity onPress={() => { alertOff = false; deleteClick(item) }}>
                        <Image style={{ alignItems: 'right' }} source={require('../Image/delete.png')} style={styles.delete} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{item.desc}</Text>
                    <Text>{item.dt}, {item.time}</Text>
                </View>
            </TouchableOpacity>
        </View >
    );

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}>
                <FlatList
                    style={{ flex: 1 }}
                    data={props.list}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={() => {
                        return (
                            <View style={styles.emptyList}>
                                <Text style={{ marginBottom: 30 }}>No record</Text>
                                <Button
                                    text={'Add New'}
                                    style={{ padding: 15, }}
                                    onPress={() => {
                                        props.navigation.navigate('FormPage')
                                    }}
                                />
                            </View>
                        )
                    }} />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    itemContainer: {
        padding: 20,
        margin: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    emptyList: {
        alignItems: 'center',
        marginTop: 20,
        height: 300,
        justifyContent: 'center'
    },
    delete: { width: 17, height: 17, },
});

const mapStateToProps = (state) => {
    const { list, loading, data } = state.listResponse;
    return { list, list, loading, data };
};

export default connect(mapStateToProps, { getList, deleteList, deleteItem })(ListPage);