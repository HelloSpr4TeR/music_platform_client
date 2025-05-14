import { useDispatch } from "react-redux";
import { ITrack } from "../types/track";
import {
  play,
  pause,
  setVolume,
  setCurrentTime,
  setDuration,
  setActive,
  clearActive,
  playNext,
  playPrevious,
  playNextRandom,
  setShuffleMode,
  setRepeatTrackMode,
  setPlaylist,
} from "../store/slices/playerSlice";

export const useActions = () => {
  const dispatch = useDispatch();

  return {
    playTrack: () => dispatch(play()),
    pauseTrack: () => dispatch(pause()),
    setVolume: (volume: number) => dispatch(setVolume(volume)),
    setCurrentTime: (currentTime: number) => dispatch(setCurrentTime(currentTime)),
    setDuration: (duration: number) => dispatch(setDuration(duration)),
    setActiveTrack: (track: ITrack) => dispatch(setActive(track)),
    clearActiveTrack: () => dispatch(clearActive()),
    playNextTrack: () => dispatch(playNext()),
    playPreviousTrack: () => dispatch(playPrevious()),
    playNextRandomTrack: () => dispatch(playNextRandom()),
    setShuffleMode: (shuffle: boolean) => dispatch(setShuffleMode(shuffle)),
    setRepeatTrackMode: (repeat: boolean) => dispatch(setRepeatTrackMode(repeat)),
    setPlaylist: (playlist: ITrack[]) => dispatch(setPlaylist(playlist)),
  };
};