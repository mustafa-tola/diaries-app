import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import http from "../../services/api";
import {User} from "../../interface";

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credential: {email: string, password: string}) => {
      const response = await http.post('/api/auth/login', credential);
      return response
    }
)

export const signUpUser = createAsyncThunk(
    'auth/signup',
    async (credential: {username: string; email: string; password: string}) => {
      const response = await http.post('/api/auth/signup', credential);
      return response
    }
)

interface authState {
    authenticated: boolean;
    token : string | null;
    loading : boolean;
    user: User | null;
}

const authSlice = createSlice({
    name: "auth",
    initialState: {
        authenticated: true,
        token : "d413f4441164d86c",
        loading: false,
        user: {
            diaryIds: null,
            email: "uzair@example.com",
            id: "2",
            password: "cYSB2YDG4DC8yc.",
            username: "uzair"
        }
    } as authState,
    reducers : {
        start_loading : (state) => {
            state.loading = true;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        }).addCase(loginUser.fulfilled, (state, action : PayloadAction<any>) => {
            console.log(action)
            if(action.payload){
                const {token, user} = action.payload;
                return {
                    ...state,
                    token: token,
                    user: user,
                    authenticated: true,
                    loading : false
                }
            }
            else{
                return {
                    ...state,
                    loading : false
                }
            }
        }).addCase(signUpUser.pending, (state, action: PayloadAction<any>) => {
            state.loading = true;
        }).addCase(signUpUser.fulfilled, (state, action : PayloadAction<any>) => {
            const {token, user} = action.payload;
            return {
                ...state,
                token: token,
                user: user,
                authenticated: true,
                loading : false
            }
        })
    }
})

export default authSlice.reducer;