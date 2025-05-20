import { ITrack } from '@/types/track'

export interface IPlaylist {
    _id: string;
    name: string;
    tracks: ITrack[];
}

export interface PlaylistState {
    playlists: IPlaylist[];
    loading: boolean;
    error: string;
}

export interface PlaylistUIState {
    query: string;
    timer: NodeJS.Timeout | null;
    offset: number;
    loading: boolean;
    hasMore: boolean;
}

export interface Playlist {
    _id: string;
    name: string;
    tracks: ITrack[];
}

export interface PlaylistItemProps {
    playlist: Playlist;
}