import AlbumList from '@/components/album/AlbumList'
import MainLayout from '@/layouts/MainLayout'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { NextThunkDispatch } from '@/store/store'
import { fetchAlbums, searchAlbums } from '@/store/slices/albumSlice'
import { useRouter } from 'next/router'
import React, { useEffect, useRef } from 'react'
import { wrapper } from '../../store/store'
import { useDispatch } from 'react-redux'
import styles from '../../styles/album/AlbumList.module.scss'
import {
    setQuery,
    setTimer,
    setHasMore,
    setLoading,
    setOffset,
    incrementOffset,
} from '../../store/slices/albumPageUISlice'

const AlbumsPage = () => {
    const router = useRouter()
    const { albums, error } = useTypedSelector(state => state.album)
    const { query, timer, offset, loading, hasMore } = useTypedSelector(state => state.albumUI)
    const dispatch = useDispatch() as NextThunkDispatch
    const observerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        if (loading || !hasMore) return

        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                dispatch(setLoading(true))
                dispatch(fetchAlbums({ offset, count: 10 }))
                    .unwrap()
                    .then((newAlbums) => {
                        if (newAlbums.length < 10) {
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

        if (timer) clearTimeout(timer)

        const newTimer = setTimeout(async () => {
            dispatch(setOffset(0))
            await dispatch(await searchAlbums(value))
            dispatch(setHasMore(false))
        }, 500)

        dispatch(setTimer(newTimer))
    }

    if (error) {
        return (
            <MainLayout>
                <h1 className={styles.error}>{error}</h1>
            </MainLayout>
        )
    }

    return (
        <MainLayout title="Список альбомов - музыкальная площадка">
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Список альбомов</h1>
                    <button
                        className={styles.createButton}
                        onClick={() => router.push('/albums/create')}
                    >
                        Создать альбом
                    </button>
                </header>
                <input
                    type="text"
                    value={query}
                    onChange={search}
                    placeholder="Поиск альбомов..."
                    className={styles.searchInput}
                />

                <AlbumList albums={albums} className={styles.albumList} />

                <div ref={observerRef} style={{ height: 1 }} />

                {loading && <p className={styles.loading}>Загрузка...</p>}
            </div>
        </MainLayout>
    )
}

export default AlbumsPage

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchAlbums({ offset: 0, count: 10 }))
})