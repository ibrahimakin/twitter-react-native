import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';

const Search = (props) => {

    useEffect(() => {

    }, []);

    return (
        <View>
            <Text onPress={() => props.navigation.navigate('Search Detail')}>Search Page</Text>
        </View>
    );
}

const mapStateToProps = ({ charactersResponse }) => {
    const { loadingCharacter, characters } = charactersResponse;
    return { loadingCharacter, characters };
}

export default connect(mapStateToProps, {})(Search);
