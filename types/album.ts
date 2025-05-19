import { ITrack } from '@/types/track';

export interface IAlbum {
    _id: string;
    name: string;
    author: string;
    picture: string;
    tracks: ITrack[];
}

export interface AlbumState {
    albums: IAlbum[];
    error: string;
    loading: boolean;
}

export interface AlbumUIState {
    query: string
    timer: NodeJS.Timeout | null
    offset: number
    loading: boolean
    hasMore: boolean
}

export interface Album {
    _id: string;
    picture: string;
    name: string;
    author: string;
    tracks: ITrack[];
}

export interface AlbumItemProps {
    album: Album;
}