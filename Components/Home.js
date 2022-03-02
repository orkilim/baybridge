import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Button, TouchableOpacity, Image } from 'react-native';

import axios from 'axios'
import { api_key, image_url_prefix } from '../consts';

const Home = ({ navigation }) => {

    const [movies, setMovies] = useState([])
    const [favoritesNum,setNum]=useState(0)

    const handleClick = () => {
        axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=1`)
            .then((data) => {
                const results = data.data.results
                console.log(results)
                setMovies(results)
            })
            .catch((err) => {
                console.log("error in axios in useEffect in home is: ", err)
            })
    }

    const listenerAdd=navigation.addListener('add', (e) => {
        // Prevent default action
        e.preventDefault();
        console.log("have been added")
        setNum(favoritesNum++)
      });
      const listenerRemove=navigation.addListener('remove', (e) => {
        // Prevent default action
        e.preventDefault();
        console.log("have been removed")
        setNum(favoritesNum--)
      });

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container} >
                {
                    movies ? movies.map((movie, index) => {
                        console.log(movie.poster_path)
                        return (
                            <View key={index}>
                                <TouchableOpacity onPress={()=>{navigation.navigate("details",{id:movie.id,})}} >
                                    <Image style={styles.image} source={{ uri:image_url_prefix+movie.poster_path }} />
                                    <Text>{movie.title}</Text>
                                </TouchableOpacity>
                            </View>

                        )
                    }) : null
                }
            </ScrollView>
            <TouchableOpacity style={styles.btn} >
                <Button title='Movies List' onPress={handleClick} />
            </TouchableOpacity>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100%"
    },
    btn: {
        display: "flex",


    },
    image: {
        width: "90%",
        height: "90%"
    }
})