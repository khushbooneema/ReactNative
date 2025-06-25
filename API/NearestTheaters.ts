import { useState, useEffect } from "react";
import { GOOGLE_API_KEY } from '@env'

export interface Theater {
    name: string
    geometry: Geometry
    vicinity: string
    icon: string
}

export interface Geometry {
    location: {
        lat: number
        lng: number
    };
}


const baseURL = `https://maps.googleapis.com/maps/api/`

export async function fetchCoordinates( zipcode: string): Promise<{lat:number, lng: number}> {
    const url = `${baseURL}geocode/json?address=${zipcode}&key=${GOOGLE_API_KEY}`
    const response = await fetch(url)
    if (!response.ok) {
        throw new Error(`Error fetching coordinates: ${response.statusText}`);
    }

    const data = await response.json();
    if (data.status !== "OK" || data.results.length === 0) {
        throw new Error("No results found for the provided zipcode.");
    }

    return data.results[0].geometry.location;
}

export async function fetchNearestTheaters(lat: number, lng: number): Promise<Theater[]> {
    const radius = 20000 // 20 km
    const url = `${baseURL}place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=movie_theater&key=${GOOGLE_API_KEY}`
    const response = await fetch(url)

    if (!response.ok) {
        throw new Error(`Error at fetching the theaters: ${response.statusText}`)
    }

    const data = await response.json()

    if (data.status !== "OK") {
        throw new Error("No theaters found in the specified area.");
    }

    return data.results.map((theater: any) => {
        return {
            name: theater.name,
            geometry: theater.geometry,
            vicinity: theater.vicinity,
            icon: theater.icon
        } as Theater
    })
}
