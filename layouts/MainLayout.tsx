import Navbar from '@/components/Navbar';
import { Container } from '@mui/material';
import Head from 'next/head';
import React, { ReactNode, lazy, Suspense } from 'react';
import { useRouter } from 'next/router';

const Player = lazy(() => import('@/components/player/Player'));

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, title, description, keywords }) => {
  const router = useRouter();

  const isTracksPage = router.pathname === '/tracks';
  const isAlbumPage = router.pathname === '/albums/[id]';
  const isPlaylistPage = router.pathname === '/playlists/[id]';

  return (
    <>
      <Head>
        <title>{title || 'Музыкальная площадка'}</title>
        <meta name="description" content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.`} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "Музыка, треки, артисты"} />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container style={{ marginTop: '90px' }}>
        {children}
      </Container>
      {(isTracksPage || isAlbumPage || isPlaylistPage) && (
        <Suspense fallback={<div>Загрузка плеера...</div>}>
          <Player />
        </Suspense>
      )}
    </>
  );
}

export default MainLayout;