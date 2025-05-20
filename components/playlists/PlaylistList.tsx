import React from 'react';
import PlaylistItem from './PlaylistItem';
import styles from '../../styles/playlists/PlaylistList.module.scss';
import { Playlist } from '@/types/playlist';

interface PlaylistListProps {
    playlists: Playlist[];
    className?: string;
}

const PlaylistList: React.FC<PlaylistListProps> = ({ playlists }) => {
    return (
        <div className={styles.playlistList}>
            {playlists.map((playlist) => (
                <PlaylistItem key={playlist._id} playlist={playlist} />
            ))}
        </div>
    );
};

export default PlaylistList;