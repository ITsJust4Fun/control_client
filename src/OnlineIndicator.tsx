import React from "react"
import Typography from "@mui/material/Typography"


interface OnlineIndicatorProps {
    isOnline: boolean
}

export default function OnlineIndicator(props: OnlineIndicatorProps) {
    const { isOnline } = props

    const wrapperStyle = {
        display: 'flex'
    }

    const textStyle = {
        position: 'relative'
    } as React.CSSProperties

    const OnlineIndicatorStyle = {
        margin: 'auto',
        marginLeft: '5px',
        width: '12px',
        height: '12px',
        backgroundColor: '#33cc38',
        borderRadius: '50%'
    }

    const OfflineIndicatorStyle = {
        margin: 'auto',
        marginLeft: '5px',
        width: '12px',
        height: '12px',
        backgroundColor: '#ed2828',
        borderRadius: '50%',
    }

    return (
        <div style={wrapperStyle}>
            <Typography variant="body1" color="textSecondary" align="left" style={textStyle}>
                Online status:
            </Typography>
            {isOnline ? <div style={OnlineIndicatorStyle}></div> : <div style={OfflineIndicatorStyle}></div>}
        </div>
    )
}
