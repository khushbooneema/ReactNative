import { openDatabase, SQLiteDatabase, enablePromise } from 'react-native-sqlite-storage';
import { Movie } from '../API/endpoint';

enablePromise(true)

const dataBaseName = 'movie.db';
const tableName = 'FAV_MOVIES';

export const getDBConnection = async () => {
    return openDatabase({
        name: dataBaseName, location: 'default'
    }) 
}

// create table if not exist -----
export const createFavTable = async (db: SQLiteDatabase) => {
    
    const query = `
        CREATE TABLE IF NOT EXISTS ${tableName}(
            id INTEGER PRIMARY KEY,
            title TEXT NOT NULL,
            overview TEXT NOT NULL,
            poster_path TEXT NOT NULL,
            release_date TEXT NULL UNIQUE,
            popularity INTEGER NULL,
            vote_count INTEGER NULL,
            rating INTEGER NULL
        );`

    try {
        await db.executeSql(query);
         console.log("created table favMovies into the database")
    } catch (error) {
        console.log("Error at creating table favMovies into the database")
    }
}

export const getFavMovies = async (db: SQLiteDatabase) => {
    const query = `SELECT * FROM ${tableName};`;

    try {
        const results = await db.executeSql(query);
        const favMovies: Movie[] = [];

        results.forEach((resultSet) => {
            for (let i = 0; i < resultSet.rows.length; i++) {
                
                const favMovie: Movie = {
                    id: resultSet.rows.item(i).id,
                    title: resultSet.rows.item(i).title,
                    overview: resultSet.rows.item(i).overview,
                    poster_path: resultSet.rows.item(i).poster_path,
                    release_date: resultSet.rows.item(i).release_date,
                    popularity: resultSet.rows.item(i).popularity,
                    vote_count: resultSet.rows.item(i).vote_count,
                    rating: resultSet.rows.item(i).rating
                }
                
                favMovies.push(favMovie);
            }
        })

        console.log(`movies fetched successfully from the database ${favMovies.length}`)
        return favMovies;

    } catch (error) {
        console.error("Error fetching favorite movies:", error);
        throw error;
    }
}


export const saveFavorites = async (db: SQLiteDatabase, movie: Movie) => {

    const query = `INSERT OR REPLACE INTO ${tableName} (id, title, overview, poster_path, release_date, popularity, vote_count, rating) VALUES (?,?,?,?,?,?,?,?)`
    
    try {
        await db.executeSql(query, [
            movie.id,
            movie.title,
            movie.overview,
            movie.poster_path,
            movie.release_date,
            movie.popularity,
            movie.vote_count,
            movie.rating
        ])

        console.log(`${movie.title} movie saved into the database`)
    } catch (error) {
        console.log('Failed to save favorite', error)
    }
}

export const deleteFav = async (db: SQLiteDatabase, id: number) => {

    const query = 'DELETE from ${tableName} where id = ${id}'

    try {
        db.executeSql(query)
        console.log("deleted from the database")
    }  catch(error) {
        console.log(`failure to delete the database: error - ${error}`)
    }
}