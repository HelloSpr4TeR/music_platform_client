export interface IAlbum {
    _id: string;
    name: string;
    author: string;
    picture: string;
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