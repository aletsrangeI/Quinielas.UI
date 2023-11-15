import { login } from "./authSlice";
import { QuinielaAuth } from "../apis/QuinielaAuth";

export const authenticate = (email, password) => {
    async ({ UserName, Password }, { rejectWithValue }) => {
        try {
          const { data } = await useAuthenticateMutation({ UserName, Password }).unwrap();
          return data; // Devuelve los datos si la autenticación es exitosa
        } catch (error) {
          // Si hay un error, lo manejas y lo devuelves con rejectWithValue para que Redux lo maneje como un rechazo
          return rejectWithValue(error.message);
        }
    }
}
