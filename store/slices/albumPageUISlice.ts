import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlbumUIState } from '../../types/album'


const initialState: AlbumUIState = {
    query: '',
    timer: null,
    offset: 10,
    loading: false,
    hasMore: true,
}

const albumUISlice = createSlice({
    name: 'albumUI',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload
        },
        setTimer(state, action: PayloadAction<NodeJS.Timeout | null>) {
            state.timer = action.payload
        },
        setOffset(state, action: PayloadAction<number>) {
            state.offset = action.payload
        },
        incrementOffset(state, action: PayloadAction<number>) {
            state.offset += action.payload
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.loading = action.payload
        },
        setHasMore(state, action: PayloadAction<boolean>) {
            state.hasMore = action.payload
        },
        resetUIState(state) {
            state.query = ''
            state.timer = null
            state.offset = 10
            state.loading = false
            state.hasMore = true
        },
    },
})

export const {
    setQuery,
    setTimer,
    setOffset,
    incrementOffset,
    setLoading,
    setHasMore,
    resetUIState,
} = albumUISlice.actions

export default albumUISlice.reducer