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
                background: 'linear-gradient(70deg, rgba(62,66,255,1) 0%, rgba(62,66,255,0.65) 24%, rgba(62,66,255,0.15) 100%)',
                borderRadius: '0 10px 57px 0',
                zIndex: -1,
                left: 0
            }}>
            </div>
        </Slide>
    )
}