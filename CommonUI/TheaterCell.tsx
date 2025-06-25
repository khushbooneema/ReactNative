import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Theater } from "../API/NearestTheaters";

export const TheaterCell = ({ theater }: { theater: Theater }) => {

    return (
        <View style={styles.container}>
            <View style={styles.imageView}>
                <Image source={{ uri: theater.icon }} style={styles.imageView} />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.name}>{theater.name}</Text>
                <Text style={styles.address}>{theater.vicinity}</Text>
            </View>
        </View>
    )

}


const styles = StyleSheet.create({
    container: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        flexDirection: "row",
    },
    textContainer: {
        flex: 1,
        flexDirection: "column",
    },
    imageView: {
        width: 100,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    name: {
        fontSize: 18,
        fontWeight: "bold",
    },
    address: {
        fontSize: 14,
        color: "#555",
    }
})