import { combineReducers } from "redux";
import { HYDRATE } from "next-redux-wrapper";
import playerReducer from "./playerSlice";
import trackReducer from "./trackSlice";

const rootReducer = combineReducers({
    player: playerReducer,
    track: trackReducer,
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