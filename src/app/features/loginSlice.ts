import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { AxiosError } from "axios";
import { axiosInstance } from "../../config/axios.config";
import type { RootState } from "../store";
import { createStandaloneToast } from "@chakra-ui/react";
import CookieService from "../../services/CookieService";

const { toast } = createStandaloneToast();

interface IErrorResponse {
  error: {
    message?: string;
    status?: number;
    name?: string;
  };
}

interface IInitialState {
  loading: boolean;
  data: {
    jwt: string;
  };
  error: unknown;
}

const initialState: IInitialState = {
  loading: false,
  data: {
    jwt: "",
  },
  error: null,
};

export const userLogin = createAsyncThunk(
  "login/userLogin",
  async (user: { identifier: string; password: string }, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axiosInstance.post("/api/auth/local", user);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
        const date = new Date();
        const IN_DAYS = 2;
        const EXPIERS_AT = 1000 * 60 * 60 * 24 * IN_DAYS;
        date.setTime(date.getTime() + EXPIERS_AT);
        const options = { path: "/", expires: date };
        CookieService.set("jwt", action.payload.jwt, options);
        toast({
          title: "logged in successfully",
          status: "success",
          isClosable: true,
          duration: 1500,
        });
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.data = { jwt: "" };
        state.error = action.payload;
        const errorPayload = action.payload as AxiosError<IErrorResponse>;
        toast({
          title:
            errorPayload?.response?.data?.error?.message ??
            "Something went wrong, please try again",
          status: "error",
          isClosable: true,
          duration: 1500,
        });
      });
  },
});

export const loginSelector = ({ login }: RootState) => login;
export default loginSlice.reducer;
