export interface IComment {
    _id: string;
    username: string;
    text: string
}

export interface Track {
    id: string
    name: string
}

export interface ITrack {
    _id: string;
    name: string;
    artist: string;
    text: string;
    listens: number;
    picture: string;
    audio: string;
    comments: IComment[];
    duration: number;
}

export interface TrackState {
    tracks: ITrack[];
    error: string;
    loading: boolean
}

export enum TrackActionTypes {
    FETCH_TRACKS = 'FETCH_TRACKS',
    FETCH_TRACKS_ERROR = 'FETCH_TRACKS_ERROR',
}

interface FetchTracksActon {
    type: TrackActionTypes.FETCH_TRACKS;
    payload: ITrack[]
}

interface FetchTracksErrorActon {
    type: TrackActionTypes.FETCH_TRACKS_ERROR;
    payload: string
}

export type TrackAction = FetchTracksActon | FetchTracksErrorActon