import MainLayout from '@/layouts/MainLayout'
import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { ITrack } from '@/types/track'
import TrackList from '@/components/tracks/TrackList'
import styles from '../../styles/albums/AlbumPage.module.scss'

interface Album {
    _id: string;
    picture: string;
    name: string;
    author: string;
    tracks: ITrack[];
}

interface AlbumPageProps {
    album: Album;
}

const AlbumPage: React.FC<AlbumPageProps> = ({ album }) => {
    return (
        <MainLayout title={`Альбом - ${album.name}`} keywords={`Альбом, ${album.name}, ${album.author}`}>
            <div className={styles.albumPage}>
                <div className={styles.albumHeader}>
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${album.picture}`}
                        alt={album.name}
                        className={styles.albumImage}
                    />
                    <div className={styles.albumInfo}>
                        <h1>{album.name}</h1>
                        <h2>Исполнитель: {album.author}</h2>
                        <p>Треков: {album.tracks.length}</p>
                    </div>
                </div>
                <div className={styles.trackList}>
                    <h2>Треки из альбома</h2>
                    <TrackList tracks={album.tracks} />
                </div>
            </div>
        </MainLayout>
    )
}

export default AlbumPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/albums/${params?.id}`)
    return {
        props: {
            album: response.data
        }
    }
}