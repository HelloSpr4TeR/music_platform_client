import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITrack } from "@/types/track";
import PlayerState from "@/types/player";


const initialState: PlayerState = {
  currentTime: 0,
  duration: 0,
  active: null,
  volume: 50,
  pause: true,
  playlist: [],
  isShuffle: false,
  isRepeatTrack: false,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    play(state) {
      state.pause = false;
    },
    pause(state) {
      state.pause = true;
    },
    setCurrentTime(state, action: PayloadAction<number>) {
      state.currentTime = action.payload;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload;
    },
    setDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload;
    },
    setShuffleMode(state, action: PayloadAction<boolean>) {
      state.isShuffle = action.payload;
    },
    setRepeatTrackMode(state, action: PayloadAction<boolean>) {
      state.isRepeatTrack = action.payload;
    },
    setActive(state, action: PayloadAction<ITrack>) {
      state.active = action.payload;
      state.duration = 0;
      state.currentTime = 0;
    },
    clearActive(state) {
      state.active = null;
      state.pause = true;
      state.currentTime = 0;
      state.duration = 0;
    },
    setPlaylist(state, action: PayloadAction<ITrack[]>) {
      state.playlist = action.payload;
    },
    playNext(state) {
      if (!state.active || !state.playlist.length) return;
      const currentIndex = state.playlist.findIndex(
        (track) => track._id === state.active!._id
      );
      const nextTrack = state.playlist[currentIndex + 1];
      if (nextTrack) {
        state.active = nextTrack;
        state.currentTime = 0;
        state.duration = 0;
        state.pause = false;
      } else {
        state.pause = true;
      }
    },
    playPrevious(state) {
      if (!state.active || !state.playlist.length) return;
      const currentIndex = state.playlist.findIndex(
        (track) => track._id === state.active!._id
      );
      const prevTrack = state.playlist[currentIndex - 1];
      if (prevTrack) {
        state.active = prevTrack;
        state.currentTime = 0;
        state.duration = 0;
        state.pause = false;
      } else {
        state.pause = true;
      }
    },
    playNextRandom(state) {
      if (!state.active || state.playlist.length < 2) return;
      const currentId = state.active._id;
      const otherTracks = state.playlist.filter((t) => t._id !== currentId);
      const randomIndex = Math.floor(Math.random() * otherTracks.length);
      const randomTrack = otherTracks[randomIndex];
      state.active = randomTrack;
      state.currentTime = 0;
      state.duration = 0;
      state.pause = false;
    },
  },
});

export const {
  play,
  pause,
  setCurrentTime,
  setVolume,
  setDuration,
  setShuffleMode,
  setRepeatTrackMode,
  setActive,
  clearActive,
  setPlaylist,
  playNext,
  playPrevious,
  playNextRandom,
} = playerSlice.actions;

export default playerSlice.reducer;