import { instance, protectedInstance } from "./instance";

const userServices = {
    signUp: async (name, email, password, confirmPassword) => {
        const data = {
            name,
            email,
            password,
            confirmPassword
        }
        return instance.post('/user/sign-up', data);
    },
    signIn: async (email, password) => {
        const data = {
            email,
            password
        }
        return instance.post('/user/sign-in', data)
    },
    getUser: async () => {
        return protectedInstance.get('/user/get-user')
    },
    logout: async () => {
        return instance.get('/user/logout')
    }
}

export default userServices