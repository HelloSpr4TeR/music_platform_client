import React from 'react';
import { useRouter } from 'next/router';
import styles from '../../styles/playlists/PlaylistItem.module.scss';
import { ITrack } from '@/types/track';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';

interface Playlist {
    _id: string;
    name: string;
    tracks: ITrack[];
}

interface PlaylistItemProps {
    playlist: Playlist;
}

const declOfNum = (n: number, titles: [string, string, string]): string => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[(n % 100 > 4 && n % 100 < 20) ? 2 : cases[(n % 10 < 5) ? n % 10 : 5]];
};

const PlaylistItem: React.FC<PlaylistItemProps> = ({ playlist }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/playlists/${playlist._id}`);
    };

    const count = playlist.tracks.length;
    const trackWord = declOfNum(count, ['трек', 'трека', 'треков']);

    return (
        <div className={styles.playlistItem} onClick={handleClick}>
            <div className={styles.iconWrapper}>
                <PlaylistPlayIcon className={styles.icon} />
            </div>
            <div className={styles.playlistInfo}>
                <h3 className={styles.playlistName}>{playlist.name}</h3>
                <p className={styles.tracksCount}>{count} {trackWord}</p>
            </div>
        </div>
    );
};

export default PlaylistItem;