import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const HomeDetail = ({ params, }) => {

    useEffect(() => {

    }, []);

    return (
        <View>
            <Text>Home Detail Page</Text>
        </View>
    );
}

const mapStateToProps = ({ charactersResponse }) => {
    const { loadingCharacter, characters } = charactersResponse;
    return { loadingCharacter, characters };
}

export default connect(mapStateToProps, {})(HomeDetail);
