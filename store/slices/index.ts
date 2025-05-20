import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import playerReducer from "./playerSlice";
import trackReducer from "./trackSlice";
import albumReducer from "./albumSlice"
import albumUIReducer from './albumPageUISlice'
import trackUIReducer from './trackPageUISlice'
import playlistUIReducer from './playlistPageUISlice';
import playlistReducer from './playlistSlice';


const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
    album: albumReducer,
    albumUI: albumUIReducer,
    trackUI: trackUIReducer,
    playlistUI: playlistUIReducer,
    playlist: playlistReducer,
});

export const reducer = (state: RootState | undefined, action: any) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };

        if (state?.player) nextState.player = state.player;

        return nextState;
    }

    return rootReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;