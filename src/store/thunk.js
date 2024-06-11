import {createAsyncThunk} from '@reduxjs/toolkit'
import {apiUrl} from "../constants";

export const getUserInfo = createAsyncThunk(
    'user/get_user',
    async ({user_id}, thunkAPI) => {
        console.log(`${apiUrl}/get_user?user_id=${user_id}`)
        let response = await fetch(`${apiUrl}/get_user?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json',
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PATCH"
            }
        });
        return response.json();
    }
);
