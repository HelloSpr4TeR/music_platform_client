import MainLayout from '@/layouts/MainLayout'
import { TextField, Box } from '@mui/material'
import { useInput } from '@/hooks/useInput'
import React, { useEffect, useState } from 'react'
import TrackAddList from '@/components/albums/TrackAddList'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from '../../styles/tracks/CreatePage.module.scss'
import StepWrapper from '@/components/StepWrapper'
import { ITrack } from '@/types/track'

const CreatePlaylistPage = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [tracks, setTracks] = useState<ITrack[]>([])
    const [selectedTracks, setSelectedTracks] = useState<string[]>([])

    const name = useInput('')
    const router = useRouter()

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tracks`)
            .then(res => setTracks(res.data))
            .catch(console.error)
    }, [])

    const handleSelectTrack = (trackId: string) => {
        setSelectedTracks(prev =>
            prev.includes(trackId)
                ? prev.filter(id => id !== trackId)
                : [...prev, trackId]
        )
    }

    const next = () => {
        if (activeStep !== 1) {
            setActiveStep(prev => prev + 1);
        } else {
            const payload = {
                name: name.value,
                tracks: selectedTracks,
            };

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/playlists`, payload)
                .then(() => router.push('/playlists'))
                .catch(console.error);
        }
    };

    const back = () => {
        if (activeStep === 0) {
            router.push('/playlists')
        } else {
            setActiveStep(prev => prev - 1)
        }
    }

    const playlistSteps = [
        'Введите название плейлиста',
        'Выберите треки'
    ]

    return (
        <MainLayout>
            <div className={styles.createPage}>
                <StepWrapper activeStep={activeStep} steps={playlistSteps}>
                    {activeStep === 0 && (
                        <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 1, width: '95%', mx: 'auto' }}>
                            <TextField {...name} label="Название плейлиста" fullWidth />
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <TrackAddList
                            tracks={tracks}
                            selectedTracks={selectedTracks}
                            onSelect={handleSelectTrack}
                        />
                    )}
                </StepWrapper>

                <div className={styles.stepsNavigation}>
                    <button onClick={back} className={styles.button}>Назад</button>
                    <button
                        onClick={next}
                        className={styles.button}
                        disabled={
                            (activeStep === 0 && !name.value.trim()) ||
                            (activeStep === 1 && selectedTracks.length === 0)
                        }
                        style={{
                            opacity:
                                (activeStep === 0 && !name.value.trim()) ||
                                    (activeStep === 1 && selectedTracks.length === 0)
                                    ? 0.5
                                    : 1,
                            cursor:
                                (activeStep === 0 && !name.value.trim()) ||
                                    (activeStep === 1 && selectedTracks.length === 0)
                                    ? 'not-allowed'
                                    : 'pointer',
                        }}
                    >
                        {activeStep === 1 ? 'Создать' : 'Далее'}
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}

export default CreatePlaylistPage