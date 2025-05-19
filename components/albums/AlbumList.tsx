import React from 'react';
import AlbumItem from './AlbumItem';
import styles from '../../styles/albums/AlbumList.module.scss';
import { ITrack } from '@/types/track';

interface Album {
    _id: string;
    picture: string;
    name: string;
    author: string;
    tracks: ITrack[]
}

interface AlbumListProps {
    albums: Album[];
    className?: string;
}

const AlbumList: React.FC<AlbumListProps> = ({ albums }) => {
    return (
        <div className={styles.albumList}>
            {albums.map((album) => (
                <AlbumItem
                    key={album._id}
                    album={album}
                />
            ))}
        </div>
    );
};

export default AlbumList;