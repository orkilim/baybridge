import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Button, TouchableOpacity, Image } from 'react-native';
import { api_key, image_url_prefix } from '../consts';

const Details = ({ route, navigation }) => {

    const [movie, setMovie] = useState({})


    const { id } = route.params
    const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${api_key}&language=en-US`

    useEffect(() => {
        axios.get(url)
            .then((data) => {
                const temp = data.data
                setMovie(temp)
            })
            .catch((err) => {
                console.log("in axios in useEffect in Details err is: ", err)
            })
    }, [])

    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{ uri: image_url_prefix + movie.poster_path }} />
            <Text>{movie.title + "\n"}</Text>
            <Text>Overview: {movie.overview + "\n"}</Text>
            <Text>Rating: {movie.vote_average}</Text>
        </View>
    )
}

export default Details


const styles = StyleSheet.create({

    container: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    image: {
        width: "90%",
        height: "50%"
    },
    favorites:{
        backgroundColor:"blue",
        color:"white",
        borderRadius:5,
        left:"1%",
        up:"0%"
    },
    favs_container:{
        alignSelf:"flex-start",
        marginBottom:"1%"

    }
})