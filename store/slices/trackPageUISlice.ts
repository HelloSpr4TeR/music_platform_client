import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TrackPageUIState } from '../../types/track'


const initialState: TrackPageUIState = {
    query: '',
    timer: null,
    offset: 10,
    loading: false,
    hasMore: true,
}

const trackPageUISlice = createSlice({
    name: 'trackPageUI',
    initialState,
    reducers: {
        setQuery(state, action: PayloadAction<string>) {
            state.query = action.payload
        },
        setTimer(state, action: PayloadAction<ReturnType<typeof setTimeout> | null>) {
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
        reset(state) {
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
    reset,
} = trackPageUISlice.actions

export default trackPageUISlice.reducer