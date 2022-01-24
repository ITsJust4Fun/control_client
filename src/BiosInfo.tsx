import React from 'react'


import Typography from '@mui/material/Typography'
import {gql, useQuery} from "@apollo/client"
import {styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%'
})

interface Bios {
    vendor: string
    version: string
    startingSegment: string
    releaseDate: string
    romSize: string
    systemBIOSMajorRelease: string
    systemBIOSMinorRelease: string
    embeddedFirmwareMajorRelease: string
    embeddedFirmwareMinorRelease: string
}

interface BiosQuery {
    bios: Bios[]
}

interface BiosInfoProps {
    id: string,
}

const BIOS_QUERY = gql`
query Bios($id: ID!) {
  bios(id: $id) {
    vendor
    version
    startingSegment
    releaseDate
    romSize
    systemBIOSMajorRelease
    systemBIOSMinorRelease
    embeddedFirmwareMajorRelease
    embeddedFirmwareMinorRelease
  }
}
`

const InfoRow = {
    marginLeft: '15px',
    display: 'block'
}

export default function BiosInfo(props: BiosInfoProps) {
    const { id } = props

    const { loading, data } = useQuery<BiosQuery>(BIOS_QUERY, {
        variables: { id },
    })

    return (
        <React.Fragment>
            { loading ? (
                <Progress />
            ) : data && data.bios.map((biosInfo, index) => (
                <Typography key={"biosInfo" + index} variant="body1" color="textSecondary" align="left">
                    <span>
                        {'Index: ' + index}
                    </span>
                    <span style={InfoRow}>
                        {'Vendor: ' + biosInfo.vendor}
                    </span>
                    <span style={InfoRow}>
                        {'Version: ' + biosInfo.version}
                    </span>
                    <span style={InfoRow}>
                        {'Starting segment: ' + biosInfo.startingSegment}
                    </span>
                    <span style={InfoRow}>
                        {'Release date: ' + biosInfo.releaseDate}
                    </span>
                    <span style={InfoRow}>
                        {'ROM size: ' + biosInfo.romSize}
                    </span>
                    <span style={InfoRow}>
                        {'System BIOS major release: ' + biosInfo.systemBIOSMajorRelease}
                    </span>
                    <span style={InfoRow}>
                        {'System BIOS minor release: ' + biosInfo.systemBIOSMinorRelease}
                    </span>
                    <span style={InfoRow}>
                        {'Embedded firmware major release: ' + biosInfo.embeddedFirmwareMajorRelease}
                    </span>
                    <span style={InfoRow}>
                        {'Embedded firmware minor release: ' + biosInfo.embeddedFirmwareMinorRelease}
                    </span>
                    <br/>
                </Typography>
                )
            )}
        </React.Fragment>
    )
}
