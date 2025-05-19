import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/album/AlbumItem.module.scss';
import { AlbumItemProps } from '../../types/album';


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