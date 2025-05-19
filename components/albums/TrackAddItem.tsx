import React from 'react'
import styles from '../../styles/albums/TrackAddItem.module.scss'
import Checkbox from '@mui/material/Checkbox'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const TrackAddItem = ({ track, selected, onSelect }) => {
    return (
        <div className={styles.trackAddItem}>
            <div className={styles.trackInfo}>
                <div className={styles.name}>{track.name}</div>
                <div className={styles.artist}>{track.artist}</div>
            </div>
            <Checkbox
                checked={selected}
                onChange={onSelect}
                icon={<CheckBoxOutlineBlankIcon />}
                checkedIcon={<CheckBoxIcon />}
                sx={{ padding: 0 }}
            />
        </div>
    )
}

export default TrackAddItem