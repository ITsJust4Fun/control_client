import React from 'react'

import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import ControlCameraIcon from '@mui/icons-material/ControlCamera'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { gql, useQuery } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress'

interface Device {
    id: string
    os: string
    volumes: string[]
    isVM: boolean
    isOnline: boolean
}

interface DevicesQuery {
    devices: Device[]
}

const DevicesGrid = styled(Grid)({
    flexGrow: 1,
    margin: 0,
    width: "100%",
    justify: "center",
})

const DeviceCard = styled(Card)({
    maxWidth: 360,
})

const DeviceCardContent = styled(CardContent)({
    paddingBottom: 0,
})

const DevicesProgress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%',
})

const DeviceControls = styled(Button)({
    marginLeft: 'auto',
})

const DEVICES_QUERY = gql`
query {
  devices {
    id
    os
    volumes
    isVM
    isOnline
  }
}
`

const Windows7Icon = (
    <CardMedia
        component="img"
        height="250"
        width="250"
        image="/image/win7.png"
        alt="Windows 7"
    />
)

const Windows8Icon = (
    <CardMedia
        component="img"
        height="250"
        width="250"
        image="/image/win8.png"
        alt="Windows 8"
    />
)

export default function Devices() {
    const { loading, error, data, refetch } = useQuery<DevicesQuery>(DEVICES_QUERY)

    if (error) {
        alert("Fetch devices error")
    }

    return (
        <DevicesGrid container spacing={3}>
            { loading ? (
                <DevicesProgress />
            ) : data && data.devices.map(device => (
                <Grid key={device.id} item>
                    <DeviceCard>
                        <CardActionArea>
                            {device.os.toLowerCase().includes("windows 7") ? Windows7Icon : null}
                            {device.os.toLowerCase().includes("windows 8") ? Windows8Icon : null}
                        </CardActionArea>
                        <DeviceCardContent>
                            <Typography variant="body1" color="textSecondary" align="left">
                                {'OS: ' + device.os}
                                <br />
                                {'is VM: ' + device.isVM}
                                <br/>
                                {'volumes: ' + device.volumes}
                                <br/>
                                {'is online: ' + device.isOnline}
                            </Typography>
                        </DeviceCardContent>
                        <CardActions>
                            <DeviceControls
                                variant='contained'
                                color='primary'
                                size='small'
                                startIcon={<ControlCameraIcon />}
                                onClick={() => {
                                    alert('test')
                                    refetch()
                                }}
                            >
                                {'control'}
                            </DeviceControls>
                        </CardActions>
                    </DeviceCard>
                </Grid>
            ))}
        </DevicesGrid>
    )
}
