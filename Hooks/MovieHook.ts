import React, { use } from "react";
import { useState, useEffect } from "react";
import { Movie, MovieResponse } from "../API/endpoint";
import { apiRequest, Response } from "../API/apiRequest";

export const useMovie = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string|null>(null)
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);

    let sortProps = "Popularity"

    const fetchMovies = async (page: number = 1) => {
        setLoading(true);
        setPage(page);
        setError(null);

        try {
            const response = await apiRequest<MovieResponse> (
                `movie/popular`,
                { method: "GET" },
                { page: page }
            )

            if (response.status != 200) {
                setError(response.statusText);
                setMovies([])
            } else {
                if (page == 1) {
                    setMovies(response.data.results);
                } else {
                    setMovies(prevMovies => [...prevMovies, ...response.data.results]);
                }
                
                setError(null);
                setLoading(false);
            }
        } catch (error) {
            setError("An error occurred while fetching movies.");
            setMovies([]);
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchMovies(page);
    }, [page]);

    // remove the duplicates movies based on the id:
    const uniqueMovies = movies.filter((movie, index, self) =>
        index === self.findIndex((m) => m.id === movie.id)
    );

    function sortMovies(sort: string = "All") {
        console.log("Sort by: ", sort)
        switch (sort) {
            case "Popularity":
                console.log("Popularity")
                const a = uniqueMovies.sort((a, b) => a.popularity > b.popularity ? 1 : -1)
                setMovies(a)
                break
            case "Release Date":
                console.log("Release Date")
                const b = uniqueMovies.sort((a, b) => new Date(a.release_date) > new Date(b.release_date) ? 1 : -1)
                setMovies(b)
                break
            case "Vote count":
                console.log("Vote count")
                const c = uniqueMovies.sort((a, b) => a.vote_count > b.vote_count ? 1 : -1)
                setMovies(c)
                break
        }
    }

    return {
        movies,
        error,
        loading,
        fetchMovies,
        page,
        sortMovies
    }
}