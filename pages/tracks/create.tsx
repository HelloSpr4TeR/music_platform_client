import FileUpload from '@/components/FileUpload'
import StepWrapper from '@/components/StepWrapper'
import { useInput } from '@/hooks/useInput'
import MainLayout from '@/layouts/MainLayout'
import { TextField, Box } from '@mui/material'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import styles from '../../styles/tracks/CreatePage.module.scss'

const Create = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [picture, setPicture] = useState<File | null>(null)
  const [audio, setAudio] = useState<File | null>(null)
  const name = useInput('')
  const artist = useInput('')
  const text = useInput('')
  const router = useRouter()

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep(prev => prev + 1)
    } else {
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('text', text.value)
      formData.append('artist', artist.value)
      formData.append('picture', picture!)
      formData.append('audio', audio!)
      axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tracks`, formData)
        .then(resp => router.push('/tracks'))
        .catch(e => console.log(e))
    }
  }

  const back = () => {
    if (activeStep === 0) {
      router.push('/tracks')
    } else {
      setActiveStep(prev => prev - 1)
    }
  }

  const trackSteps = ['Введите информацию о треке', 'Загрузите обложку трека', 'Загрузите трек']

  return (
    <MainLayout>
      <div className={styles.createPage}>
        <StepWrapper activeStep={activeStep} className={styles.stepWrapper} steps={trackSteps}>
          {activeStep === 0 && (
            <Box display="flex" flexDirection="column" gap={2} position="relative" sx={{ mt: 1, width: '95%', mx: 'auto' }}>
              <TextField {...name} label="Название трека" fullWidth />
              <TextField {...artist} label="Имя исполнителя" fullWidth />
              <TextField {...text} label="Слова к треку" multiline rows={3} fullWidth />
            </Box>
          )}
          {activeStep === 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <FileUpload setFile={setPicture} accept="image/*">
                <button className={styles.buttonLoad}>
                  Загрузить изображение
                </button>
              </FileUpload>
              {picture && (
                <div style={{ marginTop: '20px' }}>
                  <img
                    src={URL.createObjectURL(picture)}
                    alt="uploaded"
                    style={{ width: '200px', height: '200px', objectFit: 'cover' }}
                  />
                </div>
              )}
              <div style={{ marginTop: '10px', fontSize: '16px', color: 'gray', marginBottom: '5px' }}>
                Название: {name.value}
              </div>
              <div style={{ marginTop: '0px', fontSize: '16px', color: 'gray', marginBottom: '10px' }}>
                Исполнитель: {artist.value}
              </div>
            </div>
          )}
          {activeStep === 2 && (
            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              <FileUpload setFile={setAudio} accept="audio/*">
                <button className={styles.buttonLoad}>
                  Загрузить аудио
                </button>
              </FileUpload>
              {audio && (
                <div style={{ marginTop: '10px' }}>
                  <audio controls>
                    <source src={URL.createObjectURL(audio)} />
                  </audio>
                </div>
              )}
              <div style={{ marginTop: '10px' }}>
                <img
                  src={URL.createObjectURL(picture)}
                  alt="uploaded"
                  style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                />
              </div>
              <div style={{ marginTop: '5px', fontSize: '16px', color: 'gray', marginBottom: '5px' }}>
                Название: {name.value}
              </div>
              <div style={{ marginTop: '0px', fontSize: '16px', color: 'gray', marginBottom: '10px' }}>
                Исполнитель: {artist.value}
              </div>
            </div>
          )}
        </StepWrapper>
        <div className={styles.stepsNavigation}>
          <button
            className={styles.button}
            onClick={back}
          >
            Назад
          </button>
          <button
            className={styles.button}
            onClick={next}
            disabled={
              (activeStep === 0 && (!name.value.trim() || !artist.value.trim())) ||
              (activeStep === 1 && !picture) ||
              (activeStep === 2 && !audio)
            }
            style={{
              opacity:
                (activeStep === 0 && (!name.value.trim() || !artist.value.trim())) ||
                  (activeStep === 1 && !picture) ||
                  (activeStep === 2 && !audio)
                  ? 0.5
                  : 1,
              cursor:
                (activeStep === 0 && (!name.value.trim() || !artist.value.trim())) ||
                  (activeStep === 1 && !picture) ||
                  (activeStep === 2 && !audio)
                  ? 'not-allowed'
                  : 'pointer',
            }}
          >
            Далее
          </button>
        </div>
      </div>
    </MainLayout>
  )
}

export default Create