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

    const declOfNum = (n: number, titles: [string, string, string]): string => {
        const cases = [2, 0, 1, 1, 1, 2];
        return titles[
            n % 100 > 4 && n % 100 < 20
                ? 2
                : cases[n % 10 < 5 ? n % 10 : 5]
        ];
    };

    const count = album.tracks.length;
    const trackWord = declOfNum(count, ['трек', 'трека', 'треков']);

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
                <p className={styles.tracksCount}>
                    {count} {trackWord}
                </p>
            </div>
        </div>
    );
};

export default AlbumItem;