import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMenus, fetchMenuById, saveMenu } from '../services/menuService';

// Async Thunks
export const getMenus = createAsyncThunk('menu/getMenus', async () => {
  const response = await fetchMenus();
  return response.data;
});

export const getMenuById = createAsyncThunk('menu/getMenuById', async (id) => {
  const response = await fetchMenuById(id);
  return response.data;
});

export const saveMenuThunk = createAsyncThunk('menu/saveMenu', async (menuData) => {
  const response = await saveMenu(menuData);
  return response.data;
});

// Slice
const menuSlice = createSlice({
  name: 'menu',
  initialState: {
    menus: [],
    currentMenu: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMenus.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.loading = false;
        state.menus = action.payload;
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default menuSlice.reducer;
