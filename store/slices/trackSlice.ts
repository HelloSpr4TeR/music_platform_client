import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { ITrack, TrackState } from "../../types/track"

const initialState: TrackState = {
  tracks: [],
  error: '',
  loading: false
}

export const fetchTracks = createAsyncThunk(
  'tracks/fetchAll',
  async (
    { offset = 0, count = 10 }: { offset?: number; count?: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tracks`, {
        params: { offset, count },
      })
      return response.data as ITrack[]
    } catch (err) {
      return rejectWithValue('Произошла ошибка при загрузке треков')
    }
  }
)

export const searchTracks = createAsyncThunk(
  'tracks/search',
  async (query: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tracks/search?query=${query}`)
      return response.data as ITrack[]
    } catch (err) {
      return rejectWithValue('Произошла ошибка при поиске треков')
    }
  }
)

const trackSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(fetchTracks.fulfilled, (state, action: PayloadAction<ITrack[]>) => {
        state.loading = false
        state.tracks = [...state.tracks, ...action.payload]
      })
      .addCase(fetchTracks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })

      .addCase(searchTracks.pending, (state) => {
        state.loading = true
        state.error = ''
      })
      .addCase(searchTracks.fulfilled, (state, action: PayloadAction<ITrack[]>) => {
        state.loading = false
        state.tracks = action.payload
      })
      .addCase(searchTracks.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export default trackSlice.reducer