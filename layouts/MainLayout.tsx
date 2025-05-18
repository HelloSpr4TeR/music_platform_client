import Navbar from '@/components/Navbar';
import Player from '@/components/Player';
import { Container } from '@mui/material';
import Head from 'next/head';
import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';

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

  return (
    <>
      <Head>
        <title>{title || 'Музыкальная площадка'}</title>
        <meta name="description" content={`Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.` + description} />
        <meta name="robots" content="index, follow" />
        <meta name="keywords" content={keywords || "Музыка, треки, артисты"} />
        <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Container style={{ marginTop: '90px' }}>
        {children}
      </Container>
      {(isTracksPage || isAlbumPage) && <Player />}
    </>
  );
}

export default MainLayout;