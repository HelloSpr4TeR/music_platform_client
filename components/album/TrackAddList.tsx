import React from 'react'
import TrackAddItem from './TrackAddItem'

const TrackAddList = ({ tracks, selectedTracks, onSelect }) => {
    return (
        <div>
            {tracks.map(track => (
                <TrackAddItem
                    key={track._id}
                    track={track}
                    selected={selectedTracks.includes(track._id)}
                    onSelect={() => onSelect(track._id)}
                />
            ))}
        </div>
    )
}

export default TrackAddList