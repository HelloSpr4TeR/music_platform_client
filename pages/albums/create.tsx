import MainLayout from '@/layouts/MainLayout'
import { TextField, Box } from '@mui/material'
import { useInput } from '@/hooks/useInput'
import React, { useEffect, useState } from 'react'
import FileUpload from '@/components/FileUpload'
import StepWrapper from '@/components/StepWrapper'
import TrackAddList from '@/components/album/TrackAddList'
import axios from 'axios'
import { useRouter } from 'next/router'
import styles from '../../styles/CreatePage.module.scss'

const CreateAlbumPage = () => {
    const [activeStep, setActiveStep] = useState(0)
    const [picture, setPicture] = useState<File | null>(null)
    const [tracks, setTracks] = useState([])
    const [selectedTracks, setSelectedTracks] = useState<string[]>([])

    const name = useInput('')
    const author = useInput('')
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
        if (activeStep !== 2) {
            setActiveStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('author', author.value)
            formData.append('picture', picture!)
            formData.append('tracks', JSON.stringify(selectedTracks))

            axios.post(`${process.env.NEXT_PUBLIC_API_URL}/albums`, formData)
                .then(() => router.push('/albums'))
                .catch(console.error)
        }
    }

    const back = () => {
        if (activeStep === 0) {
            router.push('/albums')
        } else {
            setActiveStep(prev => prev - 1)
        }
    }

    return (
        <MainLayout>
            <div className={styles.createPage}>
                <StepWrapper activeStep={activeStep}>
                    {activeStep === 0 && (
                        <Box display="flex" flexDirection="column" gap={2} sx={{ mt: 1, width: '95%', mx: 'auto' }}>
                            <TextField {...name} label="Название альбома" fullWidth />
                            <TextField {...author} label="Автор альбома" fullWidth />
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <FileUpload setFile={setPicture} accept="image/*">
                                <button className={styles.buttonLoad}>Загрузить обложку</button>
                            </FileUpload>
                            {picture && (
                                <img
                                    src={URL.createObjectURL(picture)}
                                    alt="Album cover"
                                    style={{ marginTop: 20, width: 200, height: 200, objectFit: 'cover' }}
                                />
                            )}
                        </div>
                    )}

                    {activeStep === 2 && (
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
                            (activeStep === 0 && (!name.value.trim() || !author.value.trim())) ||
                            (activeStep === 1 && !picture) ||
                            (activeStep === 2 && selectedTracks.length === 0)
                        }
                        style={{
                            opacity:
                                (activeStep === 0 && (!name.value.trim() || !author.value.trim())) ||
                                    (activeStep === 1 && !picture) ||
                                    (activeStep === 2 && selectedTracks.length === 0)
                                    ? 0.5
                                    : 1,
                            cursor:
                                (activeStep === 0 && (!name.value.trim() || !author.value.trim())) ||
                                    (activeStep === 1 && !picture) ||
                                    (activeStep === 2 && selectedTracks.length === 0)
                                    ? 'not-allowed'
                                    : 'pointer',
                        }}
                    >
                        {activeStep === 2 ? 'Создать альбом' : 'Далее'}
                    </button>
                </div>
            </div>
        </MainLayout>
    )
}

export default CreateAlbumPage