import { ITrack } from "../types/track";

interface PlayerState {
  active: ITrack | null;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  playlist: ITrack[];
  isShuffle: boolean;
  isRepeatTrack: boolean;
}

export default PlayerState