import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IAlbum, AlbumState } from "../../types/album";

const initialState: AlbumState = {
    albums: [],
    error: '',
    loading: false
};

export const fetchAlbums = createAsyncThunk(
    'albums/fetchAll',
    async (
        { offset = 0, count = 10 }: { offset?: number; count?: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/albums`, {
                params: { offset, count }
            });
            return response.data as IAlbum[];
        } catch (err) {
            return rejectWithValue('Произошла ошибка при загрузке альбомов');
        }
    }
);

export const searchAlbums = createAsyncThunk(
    'albums/search',
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/albums/search?query=${query}`);
            return response.data as IAlbum[];
        } catch (err) {
            return rejectWithValue('Произошла ошибка при поиске альбомов');
        }
    }
);

const albumSlice = createSlice({
    name: 'albums',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAlbums.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchAlbums.fulfilled, (state, action: PayloadAction<IAlbum[]>) => {
                state.loading = false;
                state.albums = [...state.albums, ...action.payload];
            })
            .addCase(fetchAlbums.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(searchAlbums.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(searchAlbums.fulfilled, (state, action: PayloadAction<IAlbum[]>) => {
                state.loading = false;
                state.albums = action.payload;
            })
            .addCase(searchAlbums.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default albumSlice.reducer;