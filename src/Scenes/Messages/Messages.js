import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { signOut } from '../../Actions';

const Messages = (props) => {

    useEffect(() => {

    }, []);

    return (
        <View>
            <Text onPress={() => {
                // props.navigation.navigate('MessageDetail');
                props.signOut();
            }}
            >Messages Page</Text>
        </View>
    );
}

const mapStateToProps = ({ charactersResponse }) => {
    const { loadingCharacter, characters } = charactersResponse;
    return { loadingCharacter, characters };
}

export default connect(mapStateToProps, { signOut })(Messages);
