export interface Movie {
    id: number;
    title: string;
    overview: string;
    release_date: string;
    rating: number;
    poster_path: string;
    popularity: number;
    vote_count: number;
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    totalPages: number;
    totalResults: number;
}

export interface MovieDetail extends Movie {
    budget: number;
    revenue: number;
    runtime: number;
    language: string;
}

