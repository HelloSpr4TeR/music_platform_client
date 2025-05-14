import { ITrack } from "@/types/track"
import { Box, Grid2 } from "@mui/material"
import TrackItem from "./TrackItem"
import { useTypedSelector } from '@/hooks/useTypedSelector'
import { useEffect } from 'react'
import { useActions } from '@/hooks/useActions'

interface TrackListProps {
    tracks: ITrack[];
    className?: string;
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
    const { active: activeTrack } = useTypedSelector(state => state.player);
    const { setPlaylist } = useActions();

    useEffect(() => {
        setPlaylist(tracks);
    }, [tracks]);

    return (
        <Grid2 container direction='column'>
            <Box p={2}>
                {tracks.map(track =>
                    <TrackItem
                        key={track._id}
                        track={track}
                        active={track._id === activeTrack?._id}
                    />
                )}
            </Box>
        </Grid2>
    )
}

export default TrackList;