import { useInput } from '@/hooks/useInput'
import MainLayout from '@/layouts/MainLayout'
import { ITrack } from '@/types/track'
import { Grid2, TextField } from '@mui/material'
import axios from 'axios'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '../../styles/TrackPage.module.scss'

const TrackPage = ({ serverTrack }) => {
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tracks/comment`, {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            setTrack({ ...track, comments: [...track.comments, response.data] })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <MainLayout
            title={`Музыкальна площадка - ${track.name} - ${track.artist}`}
            keywords={`Музыка, артисты, ${track.name}, ${track.artist}`}
        >
            <button
                className={styles.buttonList}
                onClick={() => router.push('/tracks')}
            >
                К списку
            </button>
            <div className={styles.trackPage}>
                <Grid2 container className={styles.trackInfo}>
                    <img
                        src={`${process.env.NEXT_PUBLIC_API_URL}/${track.picture}`}
                        className={styles.trackImage}
                    />
                    <div className={styles.trackDetails}>
                        <h1>Название трека - {track.name}</h1>
                        <h1>Исполнитель - {track.artist}</h1>
                        <h1>Прослушиваний - {track.listens}</h1>
                    </div>
                </Grid2>
                <h1>Слова в треке</h1>
                <p>{track.text}</p>
                <h1>Комментарии</h1>
                <div className={styles.commentList}>
                    {track.comments.map(comment =>
                        <div key={comment._id} className={styles.commentItem}>
                            <div>Автор - {comment.username}</div>
                            <div>Комментарий - {comment.text}</div>
                        </div>
                    )}
                </div>
                <div className={styles.commentSection}>
                    <Grid2 container>
                        <TextField
                            label="Ваше имя"
                            {...username}
                            fullWidth
                            className={styles.commentInput}
                        />
                        <TextField
                            label="Комментарий"
                            {...text}
                            fullWidth
                            multiline
                            rows={4}
                            className={styles.commentInput}
                        />
                        <button className={styles.button} onClick={addComment}>Отправить</button>
                    </Grid2>
                </div>
            </div>
        </MainLayout>
    )
}

export default TrackPage

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tracks/${params.id}`)
    return {
        props: {
            serverTrack: response.data
        }
    }
}