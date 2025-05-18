import React from 'react';
import AlbumItem from './AlbumItem';
import styles from '../../styles/album/AlbumList.module.scss';

interface Album {
    _id: string;
    picture: string;
    name: string;
    author: string;
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