import React from "react";
import { View, Text, Platform, TextInput, StyleSheet, Button, FlatList } from "react-native";
import { useEffect } from "react";
import { PermissionsAndroid } from "react-native";
import Geolocation, { GeoCoordinates } from "react-native-geolocation-service";
import { useState } from "react";
import { Theater } from "../API/NearestTheaters";
import { fetchNearestTheaters, fetchCoordinates } from "../API/NearestTheaters";
import { TheaterCell } from "../CommonUI/TheaterCell";

async function requestLocationPermission() {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: "Location Permission",
                message: "This app needs access to your location.",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("Location permission granted");
        } else {
            console.log("Location permission denied");
        }
    } catch (error) {
        console.log(error);
    }
}

const TheatersView = () => {
    const [zipcode, setZipcode] = useState<string | null>(null)
    const [theaters, setTheaters] = useState<Theater[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [coordinates, setCoordinates] = useState<{lat: number, lng: number} | null>(null)

    useEffect(() => {
        fetchTheaters()
    }, []);


    async function getCurrentLocation(): Promise<GeoCoordinates> {
        return new Promise((resolve, reject) => {
            if (Platform.OS === 'android') {
                requestLocationPermission().then(() => {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            resolve(position.coords as GeoCoordinates);
                        },
                        (error) => {
                            setError("Error getting location: " + error.message);
                            console.error("Error getting location: ", error);
                            reject(error);
                        }, 
                        {
                            enableHighAccuracy: true,
                            timeout: 15000,
                            maximumAge: 10000
                        }
                    )
                })

            } else if (Platform.OS === 'ios') {
                Geolocation.requestAuthorization('whenInUse').then(() => {
                    Geolocation.getCurrentPosition(
                        (position) => {
                            resolve(position.coords as GeoCoordinates);
                        },
                        (error) => {
                            setError("Error getting location: " + error.message);
                            console.error("Error getting location: ", error);
                            reject(error);
                        },
                        {
                            enableHighAccuracy: true,
                            timeout: 15000,
                            maximumAge: 10000
                        }
                    )
                })
            }
        })
    }

    const fetchTheaters = async () => {
        console.log("Fetching theaters with zipcode: ", zipcode);
        setLoading(true);
        setError(null);
        if (zipcode == null || zipcode.trim() === "") {
            if (coordinates === null) {
                const coordinates = await getCurrentLocation() as GeoCoordinates

                setCoordinates({ lat: coordinates.latitude, lng: coordinates.longitude });
                try {
                    const theaters = await fetchNearestTheaters(coordinates.latitude, coordinates.longitude);
                    console.log("Theaters fetched: ", theaters);
                    setTheaters(theaters);
                } catch (error) {
                    setError("Error fetching theaters: " + (error as Error).message);
                    setTheaters([]);
                    console.error("Error fetching theaters: ", error);
                } finally {
                    setLoading(false);
                }
            }
        } else {
            try {
                const coordinates = await fetchCoordinates(zipcode as string);
                console.log("Coordinates fetched: ", coordinates);
                setCoordinates(coordinates);
                const theaters = await fetchNearestTheaters(coordinates.lat, coordinates.lng);
                setTheaters(theaters);
            }
            catch (error) {
                setError((error as Error).message);
                setTheaters([]);
                console.error(error);
            } finally {
                setLoading(false);
            }
        }
    }
    
    return (
        <View style={styles.mainContainer}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    placeholder="Enter Zipcode"
                    value={zipcode ?? ""}
                    onChangeText={(text) => setZipcode(text)}
                />
                <Button
                    title="Search"
                    onPress={() => {
                        fetchTheaters();
                    }}
                />
            </View>
            {loading && <Text style={styles.loadingText}>Loading Nearby theaters...</Text>}
            {error && <Text>{`error at fetching your location: ${error}`}</Text>}
            <FlatList
                data = {theaters}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => {
                    return (
                        <TheaterCell theater={item} />
                    );
                }}
            />

        </View>
    );
}

export default TheatersView;


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 8,
        marginRight: 8,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        marginTop: 8,
        alignContent: 'center',
    }


})