import TrackList from '@/components/TrackList'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import MainLayout from '@/layouts/MainLayout'
import { NextThunkDispatch } from '@/store/store'
import { fetchTracks, searchTracks } from '@/store/slices/trackSlice'
import { Box, Card, Grid2, TextField } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState, useEffect, useRef } from 'react'
import { wrapper } from '../../store/store'
import { useDispatch } from 'react-redux'
import styles from '../../styles/TrackList.module.scss'

const index = () => {
  const router = useRouter()
  const { tracks, error } = useTypedSelector(state => state.track)
  const [query, setQuery] = useState<string>('')
  const dispatch = useDispatch() as NextThunkDispatch
  const [timer, setTimer] = useState(null)

  const [offset, setOffset] = useState(10)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observerRef = useRef(null)

  useEffect(() => {
    if (loading || !hasMore) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setLoading(true)
        dispatch(fetchTracks({ offset, count: 10 }))
          .unwrap()
          .then((newTracks) => {
            if (newTracks.length < 10) {
              setHasMore(false)
            }
            setOffset((prev) => prev + 10)
          })
          .finally(() => {
            setLoading(false)
          })
      }
    }, {
      rootMargin: '100px',
    })

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [offset, loading, hasMore])

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    if (timer) {
      clearTimeout(timer)
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value))
      }, 500)
    )
    await dispatch(await searchTracks(e.target.value))
  }

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    )
  }

  return (
    <MainLayout title={'Список треков - музыкальная площадка'}>
      <Grid2 container justifyContent="center" className={styles.container}>
        <Card className={styles.card}>
          <Box p={3}>
            <Grid2 container justifyContent="space-between" className={styles.header}>
              <h1>Список треков</h1>
              <button
                onClick={() => router.push('/tracks/create')}
                className={styles.button}
              >
                Загрузить
              </button>
            </Grid2>
          </Box>
          <TextField
            fullWidth
            value={query}
            onChange={search}
            className={styles.searchField}
            placeholder="Поиск треков..."
          />
          <TrackList tracks={tracks} className={styles.trackList} />
          <div ref={observerRef} style={{ height: 1 }} />
          {loading && <p style={{ textAlign: 'center' }}>Загрузка...</p>}
        </Card>
      </Grid2>
    </MainLayout>
  )
}

export default index

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  const dispatch = store.dispatch as NextThunkDispatch
  await dispatch(await fetchTracks({ offset: 0, count: 10 }))
})