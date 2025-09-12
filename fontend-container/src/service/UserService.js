import { get } from '../utils/request.js';

export const Login = async (email, password) => {
    const result = await get(`users?email=${email}&password=${password}`);

    return result;
}
