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
    runtime: number;
    languages: Language[];
    production_companies: ProductionCompany[];
}

export interface Language {
    name: string;
    english_name: string;
}

export interface ProductionCompany {
    id: number;
    name: string;
    logo_path: string;
    origin_country: string;
}

export interface Genre {
    id: number;
    name: string;
}

export interface User {
    id: number,
    name: string,
    username: string,
    password: string,
    emailId: string,
    country: string,
    zipcode: string
}