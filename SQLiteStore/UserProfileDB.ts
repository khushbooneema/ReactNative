import { SQLiteDatabase, enablePromise } from "react-native-sqlite-storage";
import { getDBConnection } from "./FavoriteMovieDB";
import { User } from "../API/endpoint";
import { use } from "react";

const databaseName = "movie.db"
const tableName = "USER"

enablePromise(true)

export const createUser = async (db: SQLiteDatabase) => {

    const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        emailId TEXT NOT NULL UNIQUE,
        country TEXT NOT NULL,
        zipcode TEXT NOT NULL
    );`
    
    try {
        await db.executeSql(query)
        console.log("User table has been created into the database.")
    } catch (error) {
        console.log("Failed to create table User into database", error)
    }
} 

export const saveUser = async (db: SQLiteDatabase, user: User) => {
    
    const query = `INSERT INTO ${tableName} (name, username, password, emailId, country, zipcode) VALUES (?,?,?,?,?,?)`

    try {
        await db.executeSql(query, [
            user.name,
            user.username,
            user.password,
            user.emailId,
            user.country,
            user.zipcode
        ])
        console.log("User saved into the database.")
    } catch (error) {
        console.log("Failed to save User into database")
    }
}

export const getUser = async (db: SQLiteDatabase, username: string, password:string) => {

    const query = `SELECT * FROM ${tableName} WHERE username = ${username} AND password = ${password}`

    try {
        let data = await db.executeSql(query)
        let result = data[0]
        const user: User = {
            id: result.rows.item(0).id,
            name: result.rows.item(0).name,
            username: result.rows.item(0).username,
            password: result.rows.item(0).password,
            emailId: result.rows.item(0).emailId,
            country: result.rows.item(0).country,
            zipcode: result.rows.item(0).zipcode
        }
        console.log("User fetched successfully", user.username)
        return user
    } catch (error) {
        console.log("Failed to fetch user from the database")
    }
}

export const getAllUsers = async (db: SQLiteDatabase) => {
    console.log("quering the database")
    const query = `SELECT * FROM ${tableName}`

    try {
        let data = await db.executeSql(query)
        let users: User[] = []
        
        data.forEach((result) => {
            for (let i = 0; i < result.rows.length; i++)  {
                const user: User = {
                    id: result.rows.item(i).id,
                    name: result.rows.item(i).name,
                    username: result.rows.item(i).username,
                    password: result.rows.item(i).password,
                    emailId: result.rows.item(i).emailId,
                    country: result.rows.item(i).country,
                    zipcode: result.rows.item(i).zipcode
                }

                users.push(user)
            }
        })
        console.log("fetched users from the database", users.length)
        return users
         
    } catch (error) {
        console.log("Failed to fetch user from the database")
    }
}