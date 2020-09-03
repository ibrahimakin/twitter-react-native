import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const Notifications = (props) => {

    useEffect(() => {

    }, []);

    return (
        <View>
            <Text onPress={() => props.navigation.navigate('NotificationDetail')}>Notifications Page</Text>
        </View>
    );
}

const mapStateToProps = ({ charactersResponse }) => {
    const { loadingCharacter, characters } = charactersResponse;
    return { loadingCharacter, characters };
}

export default connect(mapStateToProps, {})(Notifications);
