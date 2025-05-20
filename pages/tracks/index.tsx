import TrackList from '@/components/tracks/TrackList'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import MainLayout from '@/layouts/MainLayout'
import { NextThunkDispatch } from '@/store/store'
import { fetchTracks, searchTracks } from '@/store/slices/trackSlice'
import { Box, Card, Grid2 } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { wrapper } from '../../store/store'
import { useDispatch } from 'react-redux'
import styles from '../../styles/tracks/TrackList.module.scss'
import {
  setQuery,
  setTimer,
  setOffset,
  incrementOffset,
  setLoading,
  setHasMore,
} from '@/store/slices/trackPageUISlice'

const Index = () => {
  const router = useRouter()
  const { tracks, error } = useTypedSelector(state => state.track)
  const { query, timer, offset, loading, hasMore } = useTypedSelector(state => state.trackUI)
  const dispatch = useDispatch() as NextThunkDispatch
  const observerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (loading || !hasMore) return

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        dispatch(setLoading(true))
        dispatch(fetchTracks({ offset, count: 10 }))
          .unwrap()
          .then(newTracks => {
            if (newTracks.length < 10) {
              dispatch(setHasMore(false))
            }
            dispatch(incrementOffset(10))
          })
          .finally(() => {
            dispatch(setLoading(false))
          })
      }
    }, {
      rootMargin: '100px',
    })

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [offset, loading, hasMore, dispatch])

  const search = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    dispatch(setQuery(value))

    if (timer) {
      clearTimeout(timer)
    }

    const newTimer = setTimeout(async () => {
      await dispatch(searchTracks(value))
      dispatch(setHasMore(false))
      dispatch(setOffset(10))
    }, 500)

    dispatch(setTimer(newTimer))
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
                Загрузить трек
              </button>
            </Grid2>
          </Box>
          <input
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

export default Index

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  const dispatch = store.dispatch as NextThunkDispatch
  await dispatch(await fetchTracks({ offset: 0, count: 10 }))
})