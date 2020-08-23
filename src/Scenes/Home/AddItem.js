import React, { useState, useEffect } from 'react';
import { Alert, Text, View, ScrollView, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { Button, Input } from '../../Components/';
import { postData } from "../../Actions"
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

const AddItem = (props) => {

    const [name, setName] = useState('Kodluyoruz7');
    const [status, setStatus] = useState('Alive');
    const [species, setSpecies] = useState('Human');
    const [gender, setGender] = useState('Male');
    const [image, setImage] = useState();



    const AddItemClick = () => {
        if (name == '' || status == '') {
            return;
        }
        const params = {
            name,
            status,
            species,
            type: '',
            gender,
            image: image ? image.uri : '' //'https://assets.classy.org/6141548/0f6b8c2c-a8bb-11e9-a0dc-0ec090e27e30.png'
        };
        props.postData(params);
    }
    const options = {
        title: 'Select Avatar',
        //customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };

    return (
        <ScrollView>
            <View >
                <Input placeholder='Name' value={name} onChangeText={(value) => setName(value)} style={{ margin: 30, }} />
                <Input placeholder='Status' value={status} onChangeText={(value) => setStatus(value)} style={{ margin: 30, }} />
                <Input placeholder='Species' value={species} onChangeText={(value) => setSpecies(value)} style={{ margin: 30, }} />
                <Input placeholder='Gender' value={gender} onChangeText={(value) => setGender(value)} style={{ margin: 30, }} />
                <TouchableOpacity onPress={() => {
                    ImagePicker.showImagePicker(options, (response) => {
                        console.log('Response = ', response);

                        if (response.didCancel) {
                            //console.log('User cancelled image picker');
                        } else if (response.error) {
                            //console.log('ImagePicker Error: ', response.error);
                        } else if (response.customButton) {
                            //console.log('User tapped custom button: ', response.customButton);
                        } else {
                            const source = { uri: response.uri };

                            // You can also display the image using data:
                            // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                            setImage(source);
                        }
                    });
                }} style={{ alignSelf: 'center', }}>
                    {image ?
                        <Image source={image}
                            style={{ width: 200, height: 200, borderRadius: 15 }} />
                        ://defaultSource={require('../../Image/head.png')}
                        <Image source={require('../../Image/head.png')}
                            style={{ width: 200, height: 200, borderRadius: 15 }} />}
                </TouchableOpacity>
                <Button text='Add' loading={props.loadingAddItem} style={{ margin: 30, padding: 10, }} onPress={AddItemClick} />
            </View>
        </ScrollView>
    );
}
const mapStateToProps = ({ charactersReducers }) => {
    const { loadingAddItem } = charactersReducers;
    return { loadingAddItem };
}
export default connect(mapStateToProps, { postData })(AddItem);