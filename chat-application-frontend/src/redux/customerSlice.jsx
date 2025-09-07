import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const customerSlice = createSlice({
     name: 'customers',
     initialState: {

     },
     reducers: {

     },
});

// Example async thunk to fetch customers from an API
export const fetchCustomers = createAsyncThunk(
     'customers/fetchCustomers',
     async (_, thunkAPI) => {
          try {
               const response = await fetch('/api/customers');
               const data = await response.json();
               return data;
          } catch (error) {
               return thunkAPI.rejectWithValue(error.message);
          }
     }
);

export const { addCustomer, removeCustomer, updateCustomer } = customerSlice.actions;

export default customerSlice.reducer;
