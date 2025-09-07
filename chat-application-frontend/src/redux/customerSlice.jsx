import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customers',
  initialState: {
    list: [],
    loading: false,
    error: null,
    user: null,
    token: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});


export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      return data; // Example: { token, user }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const { logout } = customerSlice.actions;

export default customerSlice.reducer;
