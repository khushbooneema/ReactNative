import React from "react";

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYzU2NjEyMTczMmNlOTgxY2JiOGUwMjZiNzlhMTU2YyIsIm5iZiI6MTc0NDAzNjYwOS4wMjEsInN1YiI6IjY3ZjNlMzAxZGRmOTE5NDM4N2Q5ODc1MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.toZFpk_R8qH5MsIh5_N1vfItmAfQqABCeaPnrRJXKlg'; // Replace with your actual API key
const BASE_URL = 'https://api.themoviedb.org/3';

export interface Response<T> {
    data: T
    status: number
    statusText: string
}

export async function apiRequest<T>(
    endpoint: string,
    options: RequestInit,
    params: Record<string, string | number | boolean>
): Promise<Response<T>> {
   
    const queryParams = new URLSearchParams({
        language: 'en-US',
        ...params,
    });

    try {
        const url = new URL(`${BASE_URL}/${endpoint}?${queryParams.toString()}`);
    
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${API_KEY}`,
            }
        })

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return ({
            data: data,
            status: response.status,
            statusText: response.statusText
        })
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}