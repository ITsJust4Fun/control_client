import React, {useState} from 'react'

import { styled } from '@mui/material/styles'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import CardActions from '@mui/material/CardActions'
import CardMedia from '@mui/material/CardMedia'
import ControlCameraIcon from '@mui/icons-material/ControlCamera'
import InfoIcon from '@mui/icons-material/Info'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { gql, useQuery } from '@apollo/client'
import CircularProgress from '@mui/material/CircularProgress'

import OnlineIndicator from './OnlineIndicator'
import DetailsDialog from "./DetailsDialog"
import ControlDialog from "./ControlDialog"

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
    maxWidth: 310,
})

const DeviceCardContent = styled(CardContent)({
    paddingBottom: 0,
})

const DeviceCardActions = styled(CardActions)({
    display: 'flex',
})

const DevicesProgress = styled(CircularProgress)({
    marginTop: '3%',
})

const DeviceControlAction = styled(Button)({
    margin: 'auto',
    marginRight: 0,
    width: 110
})

const DeviceDetailsAction = styled(Button)({
    margin: 'auto',
    marginLeft: 0,
    width: 110
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
        width="310"
        image="/image/win7.png"
        alt="Windows 7"
    />
)

const Windows8Icon = (
    <CardMedia
        component="img"
        height="250"
        width="310"
        image="/image/win8.png"
        alt="Windows 8"
    />
)

const Windows81Icon = (
    <CardMedia
        component="img"
        height="250"
        width="310"
        image="/image/win8_1.png"
        alt="Windows 8.1"
    />
)

const Windows10Icon = (
    <CardMedia
        component="img"
        height="250"
        width="310"
        image="/image/win10.png"
        alt="Windows 10"
    />
)

interface OsLogoProps {
    osString: string
}

function OsLogo(props: OsLogoProps) {
    const { osString } = props

    if (osString.toLowerCase().includes("windows 7")) {
        return Windows7Icon
    } else if (osString.toLowerCase().includes("windows 8.1")) {
        return Windows81Icon
    } else if (osString.toLowerCase().includes("windows 8")) {
        return Windows8Icon
    } else if (osString.toLowerCase().includes("windows 10")) {
        return Windows10Icon
    }

    return null
}

export default function Devices() {
    const { loading, error, data } = useQuery<DevicesQuery>(DEVICES_QUERY)
    const [openDetails, setOpenDetails] = useState<boolean>(false)
    const [openControl, setOpenControl] = useState<boolean>(false)
    const [detailsId, setDetailsId] = useState<string>("")

    const handleDetailsOpen = () => {
        setOpenDetails(true)
    }
    const handleDetailsClose = () => {
        setOpenDetails(false)
    }

    const handleControlOpen = () => {
        setOpenControl(true)
    }
    const handleControlClose = () => {
        setOpenControl(false)
    }


    if (error) {
        alert("Fetch devices error")
    }

    return (
        <React.Fragment>
            <DevicesGrid container justifyContent="center" alignItems="center" spacing={3}>
                { loading ? (
                    <DevicesProgress />
                ) : data && data.devices.map(device => (
                    <Grid key={device.id} item>
                        <DeviceCard>
                            <CardActionArea>
                                <OsLogo osString={device.os} />
                            </CardActionArea>
                            <DeviceCardContent>
                                <Typography variant="body1" color="textSecondary" align="left">
                                    {'OS: ' + device.os}
                                    <br />
                                    {'VM: ' + (device.isVM ? 'Yes' : 'No')}
                                    <br/>
                                    {'Volumes: ' + device.volumes}
                                </Typography>
                                <OnlineIndicator isOnline={device.isOnline} />
                            </DeviceCardContent>
                            <DeviceCardActions>
                                <DeviceDetailsAction
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    startIcon={<InfoIcon />}
                                    onClick={() => {
                                        setDetailsId(device.id)
                                        handleDetailsOpen()
                                    }}
                                >
                                    {'details'}
                                </DeviceDetailsAction>
                                <DeviceControlAction
                                    variant='contained'
                                    color='primary'
                                    size='small'
                                    startIcon={<ControlCameraIcon />}
                                    onClick={() => {
                                        setDetailsId(device.id)
                                        handleControlOpen()
                                    }}
                                >
                                    {'control'}
                                </DeviceControlAction>
                            </DeviceCardActions>
                        </DeviceCard>
                    </Grid>
                ))}
            </DevicesGrid>
            <DetailsDialog isOpen={openDetails} handleClose={handleDetailsClose} id={detailsId} />
            <ControlDialog isOpen={openControl} handleClose={handleControlClose} id={detailsId} />
        </React.Fragment>
    )
}
