import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const MessageDetail = ({ params, }) => {

    useEffect(() => {

    }, []);

    return (
        <View>
            <Text>Message Detail Page</Text>
        </View>
    );
}

const mapStateToProps = ({ authResponse }) => {
    const { user } = authResponse;
    return { user };
}

export default connect(mapStateToProps, {})(MessageDetail);
