import MainLayout from '@/layouts/MainLayout'
import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { ITrack } from '@/types/track'
import TrackList from '@/components/tracks/TrackList'
import styles from '../../styles/playlists/PlaylistPage.module.scss'
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay'
import { useRouter } from 'next/router'


interface IPlaylist {
    _id: string;
    name: string;
    tracks: ITrack[];
}

interface PlaylistPageProps {
    playlist: IPlaylist;
}

const PlaylistPage: React.FC<PlaylistPageProps> = ({ playlist }) => {
    const router = useRouter();

    return (
        <MainLayout
            title={`Музыкальная площадка - ${playlist.name}`}
            keywords={`Музыка, артисты, ${playlist.name}`}
        >
            <button
                className={styles.button}
                onClick={() => router.push('/playlists')}
            >
                В список плейлистов
            </button>
            <div className={styles.playlistPage}>
                <div className={styles.playlistHeader}>
                    <div className={styles.iconWrapper}>
                        <PlaylistPlayIcon className={styles.icon} />
                    </div>
                    <div className={styles.playlistInfo}>
                        <h1>{playlist.name}</h1>
                        <p>Треков: {playlist.tracks.length}</p>
                    </div>
                </div>
                <div className={styles.trackList}>
                    <h2>Треки из плейлиста</h2>
                    <TrackList tracks={playlist.tracks} />
                </div>
            </div>
        </MainLayout>
    )
}

export default PlaylistPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/playlists/${params?.id}`)
    return {
        props: {
            playlist: response.data
        }
    }
}