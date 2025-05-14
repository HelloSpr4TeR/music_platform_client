import { Close, Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid2, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import styles from '../styles/Player.module.scss'
import TrackProgress from './TrackProgress'
import { useActions } from '@/hooks/useActions'
import { useTypedSelector } from '@/hooks/useTypedSelector'
import VolumeProgress from './VolumeProgress'
import { useMediaQuery } from '@mui/material';


let audio;

const Player = () => {
  const { pause, volume, active, duration, currentTime, isShuffle, isRepeatTrack } = useTypedSelector(state => state.player)
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration,
    setActiveTrack, clearActiveTrack, playNextTrack, playNextRandomTrack } = useActions()

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }

    setAudio();

    return () => {
      if (audio) {
        audio.pause();
        pauseTrack();
      }
    };
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = `${process.env.NEXT_PUBLIC_API_URL}/${active.audio}`;
      audio.volume = volume / 100;

      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
        audio.play().then(() => {
          playTrack();
        }).catch((err) => {
          console.error("Playback error:", err);
        });
      };

      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };

      audio.onended = () => {
        if (isShuffle) {
          playNextRandomTrack();
        } else if (isRepeatTrack) {
          audio.play().catch((err) => {
            console.error("Playback error:", err);
          });
        } else {
          playNextTrack();
        }
      }
    }
  };

  const play = () => {
    if (pause) {
      playTrack()
      audio.play()
    } else {
      pauseTrack()
      audio.pause()
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100
    setVolume(Number(e.target.value))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value)
    setCurrentTime(Number(e.target.value))
  }

  const handleClose = () => {
    if (audio) {
      audio.pause()
      pauseTrack();
    }

    setActiveTrack(null);
    clearActiveTrack();
  }

  if (!active) {
    return null
  }

  const truncate = (text: string, maxLength: number): string => {
    return text.length > maxLength ? text.slice(0, maxLength) + "…" : text;
  };

  const formatDuration = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? '0' : ''}${sec}`;
  };

  return (
    <div className={styles.player}>
      <div className={styles.controls}>
        <IconButton onClick={play}>
          {pause ? <PlayArrow /> : <Pause />}
        </IconButton>
        <img
          className={styles.img}
          src={`${process.env.NEXT_PUBLIC_API_URL}/${active.picture}`}
          alt={active.name}
        />
        <Grid2 container direction='column' style={{ width: 200, margin: '0 20px' }} className={styles.trackInfo}>
          <div className={styles.truncatedText}>
            {active?.name || ""}
          </div>
          <div className={styles.artistText}>
            {active?.artist || ""}
          </div>
        </Grid2>
        <div className={styles.volumeWrapper}>
          <VolumeUp style={{ marginLeft: 'auto' }} />
          <VolumeProgress left={volume} right={100} onChange={changeVolume} className={styles.volumeProgress} />
        </div>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>

      <div className={styles.progressWrapper}>
        <div className={styles.timer1}
        >
          {duration !== null ? formatDuration(currentTime) : '...'}
        </div>
        <TrackProgress
          left={currentTime}
          right={duration}
          onChange={changeCurrentTime}
          className={styles.trackProgress}
        />
        <div className={styles.timer2}
        >
          {'-'}{duration !== null ? formatDuration(duration - currentTime) : '...'}
        </div>
      </div>
    </div>
  )
}

export default Player;