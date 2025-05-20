import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { IPlaylist, PlaylistState } from "../../types/playlist";

const initialState: PlaylistState = {
    playlists: [],
    error: '',
    loading: false
};

export const fetchPlaylists = createAsyncThunk(
    'playlists/fetchAll',
    async (
        { offset = 0, count = 10 }: { offset?: number; count?: number },
        { rejectWithValue }
    ) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/playlists`, {
                params: { offset, count }
            });
            return response.data as IPlaylist[];
        } catch (err) {
            return rejectWithValue('Произошла ошибка при загрузке плейлистов');
        }
    }
);

export const searchPlaylists = createAsyncThunk(
    'playlists/search',
    async (query: string, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/playlists/search?query=${query}`);
            return response.data as IPlaylist[];
        } catch (err) {
            return rejectWithValue('Произошла ошибка при поиске плейлистов');
        }
    }
);

const playlistSlice = createSlice({
    name: 'playlists',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPlaylists.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(fetchPlaylists.fulfilled, (state, action: PayloadAction<IPlaylist[]>) => {
                state.loading = false;
                state.playlists = [...state.playlists, ...action.payload];
            })
            .addCase(fetchPlaylists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })

            .addCase(searchPlaylists.pending, (state) => {
                state.loading = true;
                state.error = '';
            })
            .addCase(searchPlaylists.fulfilled, (state, action: PayloadAction<IPlaylist[]>) => {
                state.loading = false;
                state.playlists = action.payload;
            })
            .addCase(searchPlaylists.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
});

export default playlistSlice.reducer;