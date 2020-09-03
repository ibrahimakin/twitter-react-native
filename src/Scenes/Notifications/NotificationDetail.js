import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const NotificationDetail = ({ params, }) => {

    useEffect(() => {

    }, []);

    return (
        <View>
            <Text>Notification Detail Page</Text>
        </View>
    );
}

const mapStateToProps = ({ charactersResponse }) => {
    const { loadingCharacter, characters } = charactersResponse;
    return { loadingCharacter, characters };
}

export default connect(mapStateToProps, {})(NotificationDetail);
