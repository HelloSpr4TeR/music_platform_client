import React from 'react'

const TrackAddItem = ({ track, selected, onSelect }) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '10px',
            margin: '10px 0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: selected ? '#e0ffe0' : 'white'
        }}>
            <div>
                <div><strong>{track.name}</strong></div>
                <div style={{ color: 'gray' }}>{track.artist}</div>
            </div>
            <button onClick={onSelect}>
                {selected ? 'Убрать' : 'Добавить'}
            </button>
        </div>
    )
}

export default TrackAddItem