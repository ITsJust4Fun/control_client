import React from 'react'
import Slide from '@mui/material/Slide'

interface Props {
    marked: boolean
}

export default function MenuMarker(props: Props) {
    const { marked } = props

    return (
        <Slide direction="right" in={marked} mountOnEnter unmountOnExit>
            <div style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 255, 0.2)',
                borderRadius: '10px 10px 10px 10px',
                zIndex: -1,
                left: 0
            }}>
            </div>
        </Slide>
    )
}