import React, { useEffect } from 'react';
import { Image, Text, View, FlatList, ActivityIndicator, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { getList, removeData } from "../../Actions"
import { connect } from 'react-redux';
import { Container, Header, Button, Icon, Fab } from 'native-base';
import { colors } from '../../style';
import { getTweets } from '../../Actions'
import TweetItems from '../Tweets/TweetItems';
const { width, height } = Dimensions.get('window')


const Home = (props) => {


    useEffect(() => {
        props.getTweets();
    }, []);


    return (
        <View style={{ flex: 1 }}>
            {props.loading ? <ActivityIndicator color='black' size='large' /> :
                <FlatList
                    style={{ flex: 1, backgroundColor: 'white' }}
                    data={props.tweets}
                    renderItem={({ item, index }) =>
                        <TweetItems
                            data={item}
                            index={index}
                            profile_url={null}
                        />
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ListEmptyComponent={() => {
                        return (
                            <View style={{
                                alignItems: 'center',
                                marginTop: 20,
                                height: 300,
                                justifyContent: 'center'
                            }}>
                                <Text style={{ marginBottom: 30 }}>No tweet</Text>
                            </View>
                        )
                    }}
                />
            }
            <Fab
                containerStyle={{}}
                style={{ backgroundColor: colors.main }}
                position="bottomRight"
                onPress={() => { props.navigation.navigate('AddTweet') }}>
                <Icon name="pencil" type='FontAwesome' />
            </Fab>
        </View>
    );
}

const mapStateToProps = ({ tweetResponse }) => {
    const { loading, tweets } = tweetResponse;
    return { loading, tweets };
}
export default connect(mapStateToProps, { getTweets })(Home);