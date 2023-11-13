import { quinielasApi } from "../../api/Quinielas.WebService";
import { login } from "./authSlice";

export const authenticate = (email, password) => {
    return async (dispatch) => {
        try {
            const { data } = await quinielasApi.post('api/Users/Authenticate', { email, password });
            dispatch(login(data));
        }
        catch (error) {
            console.log(error);
            dispatch(logout({ errorMessage: error.response.data.message }));
        }
    };
}