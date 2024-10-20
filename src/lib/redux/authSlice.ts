import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../interfaces/data.type";
import { users } from "../../data/users";
import toast from "react-hot-toast";


const initialState: { registeredUsers: User[], loggedUser: string, userHospital: string, userHospitalLogo: string, isValid: boolean } = {
    registeredUsers: users,
    loggedUser: '',
    userHospital: '',
    userHospitalLogo: '',
    isValid: false
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        validateInput: (state, { payload }) => {
            state.registeredUsers.map((user) => {
                if (payload.username.toLocaleLowerCase() === user.username.toLocaleLowerCase() &&
                    payload.password === user.password &&
                    payload.hospital.toLocaleLowerCase() === user.hospital.name.toLocaleLowerCase()) {
                        state.loggedUser = user.username
                        state.userHospital = user.hospital.name
                        state.userHospitalLogo = user.hospital.logo
                        state.isValid = true
                }
            })
            state.isValid ? toast.success(`Welcome back ${state.loggedUser}`) : toast.error('Invalid data, please try again', {
                position: 'top-right'
            })


        },
        loggedOutUser: (state) => {
            state.loggedUser = '',
                state.userHospital = '',
                state.userHospitalLogo = ''
            state.isValid = false
        }
    }
})

export default authSlice.reducer
export const { validateInput, loggedOutUser } = authSlice.actions