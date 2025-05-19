import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/albums/AlbumItem.module.scss';
import { ITrack } from '@/types/track';


interface Album {
    _id: string;
    picture: string;
    name: string;
    author: string;
    tracks: ITrack[];
}

interface AlbumItemProps {
    album: Album;
}

const AlbumItem: React.FC<AlbumItemProps> = ({ album }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/albums/${album._id}`);
    };

    return (
        <div className={styles.albumItem} onClick={handleClick}>
            <img
                src={`${process.env.NEXT_PUBLIC_API_URL}/${album.picture}`}
                alt={album.name}
                className={styles.albumImage}
            />
            <div className={styles.albumInfo}>
                <h3 className={styles.albumName}>{album.name}</h3>
                <p className={styles.albumArtist}>{album.author}</p>
            </div>
            <div className={styles.tracksCount}>
                <p>{album.tracks.length}</p>
            </div>
        </div>
    );
};

export default AlbumItem;