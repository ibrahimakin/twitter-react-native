import React, { useState } from 'react';
import { Alert, Text, View, ScrollView, StyleSheet, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Input, Button } from '../Components'
import DateTimePicker from '@react-native-community/datetimepicker';
const { width, height } = Dimensions.get('window')
import { updateList } from '../Actions'


const FormPage = (props) => {

    const [title, setTitle] = useState()
    const [desc, setDesc] = useState()

    // DateTimePicker
    const [date, setDate] = useState(new Date()); //1598051730000
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };
    //-----
    const Invalid = () => {
        Alert.alert(
            "Alert",
            "Title and Description cannot be empty!",
            [
                { text: "OK", onPress: () => { } }
            ],
            { cancelable: false }
        );
    };
    return (
        <ScrollView>
            <View style={styles.container}>

                <Input
                    placeholder='Title'
                    value={title}
                    style={{ margin: 15 }}
                    onChangeText={(value) => setTitle(value)}
                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.dateText} >{date.toDateString()}</Text>
                        <Button text='Select Date' style={{ width: width * 0.4 }} onPress={showDatepicker} title="Show date picker!" />
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.dateText} >{date.toLocaleTimeString() /* toTimeString() */}</Text>
                        <Button text='Select Time' style={{ width: width * 0.4 }} onPress={showTimepicker} title="Show time picker!" />
                    </View>
                    {show && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={date}
                            mode={mode}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                        />
                    )}

                </View>

                <Input
                    placeholder='Description'
                    value={desc}
                    multiline
                    style={{ margin: 15, height: height * 0.2, textAlignVertical: 'top' }}
                    onChangeText={(value) => setDesc(value)}
                />

                <Button
                    text={'Add'}
                    style={{ margin: 15, height: height * 0.07 }}
                    onPress={() => {
                        const dt = date.toDateString();
                        const time = date.toLocaleTimeString();
                        const id = props.list.length.toString();

                        if (title == undefined || desc == undefined || title.toString().trim() == "" || desc.toString().trim() == "") {
                            Invalid();
                        }
                        else {
                            let obj = {
                                id,
                                title,
                                desc,
                                date,
                                dt,
                                time
                            };
                            props.updateList(obj);
                            props.navigation.pop();
                        }
                    }}
                />
                {props.loading && <ActivityIndicator size='large' style={{ marginTop: 30 }} />}
            </View>
        </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    }
});

const mapStateToProps = ({ listResponse }) => {
    const { list, loading } = listResponse;
    return { list, loading };
};


export default connect(mapStateToProps, { updateList })(FormPage);