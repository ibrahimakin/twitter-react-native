import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const SearchDetail = ({ params, }) => {

    useEffect(() => {

    }, []);

    return (
        <View>
            <Text onPress={() => props.navigation.navigate('SearchDetail')}>Search Detail Page</Text>
        </View>
    );
}

const mapStateToProps = ({ charactersResponse }) => {
    const { loadingCharacter, characters } = charactersResponse;
    return { loadingCharacter, characters };
}

export default connect(mapStateToProps, {})(SearchDetail);
