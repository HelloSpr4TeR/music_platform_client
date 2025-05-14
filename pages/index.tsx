import MainLayout from '@/layouts/MainLayout';
import React from 'react';
import styles from '../styles/index.module.scss'


const Index = () => {
  return (
    <MainLayout>
      <div className={styles.hero}>
        <img src="/images/obl2.jpg" alt="SoundNest Cover" className={styles.heroImg} />
        <h1>Добро пожаловать в <span>SoundNest</span>!</h1>
        <h3>Исследуйте, создавайте и наслаждайтесь лучшей музыкой со всего мира.</h3>
        <p>SoundNest — это место, где музыка оживает. Открывайте новые треки, делитесь своими плейлистами и находите вдохновение в ритме.</p>
      </div>
    </MainLayout>
  );
};

export default Index;