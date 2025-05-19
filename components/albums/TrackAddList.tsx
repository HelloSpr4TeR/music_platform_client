import React from 'react'
import { List, AutoSizer } from 'react-virtualized'
import TrackAddItem from './TrackAddItem'

const TrackAddList = ({ tracks, selectedTracks, onSelect }) => {
    const rowHeight = 40

    const rowRenderer = ({ index, key, style }) => {
        const track = tracks[index]
        return (
            <div key={key} style={style}>
                <TrackAddItem
                    track={track}
                    selected={selectedTracks.includes(track._id)}
                    onSelect={() => onSelect(track._id)}
                />
            </div>
        )
    }

    return (
        <div style={{ height: '320px' }}>
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        width={width}
                        height={height}
                        rowCount={tracks.length}
                        rowHeight={rowHeight}
                        rowRenderer={rowRenderer}
                    />
                )}
            </AutoSizer>
        </div>
    )
}

export default TrackAddList