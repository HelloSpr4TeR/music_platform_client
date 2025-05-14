import React, { useEffect, useState, useRef } from 'react';
import { AppBar, Box, CssBaseline, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router';
import SidebarDrawer from './SidebarDrawer';
import { menuItems } from './menuItems';
import RepeatIcon from '@mui/icons-material/Repeat';
import ShuffleIcon from '@mui/icons-material/Shuffle';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import RepeatOneIcon from '@mui/icons-material/RepeatOne';
import { useActions } from '../hooks/useActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import styles from '../styles/Navbar.module.scss'


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'shuffle' | 'repeat' | 'repeatTrack'>('repeat');
  const router = useRouter();
  const drawerRef = useRef<HTMLDivElement>(null);

  const { setShuffleMode, setRepeatTrackMode, playNextTrack, playPreviousTrack, playNextRandomTrack } = useActions();
  const isShuffle = useTypedSelector(state => state.player.isShuffle);

  useEffect(() => {
    setShuffleMode(false);
    setRepeatTrackMode(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target as Node) && open) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleModeToggle = () => {
    if (mode === 'repeat') {
      setMode('repeatTrack');
      setRepeatTrackMode(true);
    } else if (mode === 'repeatTrack') {
      setMode('shuffle');
      setRepeatTrackMode(false);
      setShuffleMode(true);
    } else {
      setMode('repeat');
      setShuffleMode(false);
    }
  };

  const getIcon = () => {
    if (mode === 'shuffle') return <ShuffleIcon />;
    if (mode === 'repeat') return <RepeatIcon />;
    return <RepeatOneIcon />;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar className={styles.toolbar}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={[{ mr: 2 }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            onClick={() => router.push('/tracks')}
            sx={{
              cursor: 'pointer',
              userSelect: 'none',
              transition: 'color 0.3s',
              '&:hover': { color: '#90caf9' },
            }}
          >
            SoundNest 🎧
          </Typography>
          <div className={styles.shuffle}>
            <IconButton
              onClick={isShuffle ? playNextRandomTrack : playPreviousTrack}
              disabled={mode === 'repeatTrack'}
            >
              <SkipPreviousIcon />
            </IconButton>
            <IconButton
              onClick={isShuffle ? playNextRandomTrack : playNextTrack}
              disabled={mode === 'repeatTrack'}
            >
              <SkipNextIcon />
            </IconButton>
            <IconButton onClick={handleModeToggle}>
              {getIcon()}
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <SidebarDrawer
        open={open}
        onClose={() => setOpen(false)}
        menuItems={menuItems}
        ref={drawerRef}
      />
    </Box>
  );
}