
import { useDispatch, useSelector } from "react-redux";
import { User } from "../API/endpoint";
import { setUserToDB, getUserFromDB } from "../Store/Actions/UserActions";
import { AppDispatch } from "../Store/store";
import { RootState } from "../Store/store";
export const useUser = () => {

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>()

    const setUser = async (user: User) => {
        try {
            await dispatch(setUserToDB(user))
            console.log(`saved user into DB`, user)
        } catch (error) {
            return error
        }
    }

    const getUser = (username: string, password: string) => {
        try {
            dispatch(getUserFromDB(username, password))
            console.log(`Received user from the database`, user)
        } catch (error) {
            return error
        }
    }

    return {
        user,
        setUser,
        getUser
    }
}