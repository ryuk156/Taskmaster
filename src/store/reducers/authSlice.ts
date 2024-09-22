// authSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI } from "../api";
import axios, { Axios, AxiosError } from "axios";
import { LoginCredentials, URL } from "../../interfaces/interface";


export interface AuthState {
  token: any;
  isAuthenticated: boolean;
  error: string | null;
  loading: boolean;
  userInfo: any;
  success: boolean;
}

const userToken = localStorage.getItem('userToken')
  ? localStorage.getItem('userToken')
  : null


const initialState: AuthState = {
  token: userToken,
  isAuthenticated: userToken ? true : false,
  loading: false,
  userInfo: {},
  error: null,
  success: false,
};



export const userLogin = createAsyncThunk(
    'auth/login',
    async (credentials: LoginCredentials, { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
          `${URL}userlogin/`,
          credentials,
          config
        )
        // store user's token in local storage
        localStorage.setItem('userToken', data.token)
        return data
      } catch (error:  any) {
        console.error("Axios error:", error.message);
        return rejectWithValue({
        status: error.response.status,
        data: error.response.data,
      });
      }
    }
  )

  export const userSignUp = createAsyncThunk(
    'auth/signup',
    async (credentials: {username: string, password: string , email: string}  , { rejectWithValue }) => {
      try {
        // configure header's Content-Type as JSON
        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        }
        const { data } = await axios.post(
          `${URL}userregister/`,
          credentials,
          config
        )
        // store user's token in local storage
        localStorage.setItem('userToken', data.token)
        return data
      } catch (error:  any) {
        console.error("Axios error:", error.response.data);
        
        return rejectWithValue({
            status: error.response.status,
            data: error.response.data,
          });
      }
    }
  )





const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },
    clearToken(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(userLogin.pending, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.loading = true;
        state.error = null;
      });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.token = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload as string;
    }).addCase(userSignUp.pending, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
        state.loading = true;
        state.error = null;
      }).addCase(userSignUp.fulfilled, (state, action) => { 
        state.token = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        state.error = null;
      }).addCase(userSignUp.rejected, (state, action) => {
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setToken, clearToken,setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
