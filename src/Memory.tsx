import React from 'react'

import Typography from '@mui/material/Typography'
import {gql, useQuery} from "@apollo/client"
import {styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%'
})

interface MemoryInfo {
    deviceLocator: string,
    bankLocator: string,
    speed: string,
    manufacturer: string,
    serialNumber: string,
    assetTagNumber: string,
    partNumber: string,
    size: string,
    extendedSize: string,
    configuredClockSpeed: string,
}

interface MemoryQuery {
    memory: MemoryInfo[]
}

const MEMORY_QUERY = gql`
query Memory($id: ID!) {
  memory(id: $id) {
    deviceLocator
    bankLocator
    speed
    manufacturer
    serialNumber
    assetTagNumber
    partNumber
    size
    extendedSize
    configuredClockSpeed
  }
}
`

const InfoRow = {
    marginLeft: '15px',
    display: 'block'
}

interface MemoryProps {
    id: string,
}

export default function Memory(props: MemoryProps) {
    const { id } = props

    const { loading, data } = useQuery<MemoryQuery>(MEMORY_QUERY, {
        variables: { id },
    })

    return (
        <React.Fragment>
            { loading ? (
                <Progress />
            ) : data && data.memory.map((memory, index) => (
                <Typography key={"memory" + index} variant="body1" color="textSecondary" align="left">
                    <span>
                        {'Index: ' + index}
                    </span>
                    <span style={InfoRow}>
                        {'Device locator: ' + memory.deviceLocator}
                    </span>
                    <span style={InfoRow}>
                        {'Bank locator: ' + memory.bankLocator}
                    </span>
                    <span style={InfoRow}>
                        {'Speed: ' + memory.speed}
                    </span>
                    <span style={InfoRow}>
                        {'Manufacturer: ' + memory.manufacturer}
                    </span>
                    <span style={InfoRow}>
                        {'Serial number: ' + memory.serialNumber}
                    </span>
                    <span style={InfoRow}>
                        {'Asset tag number: ' + memory.assetTagNumber}
                    </span>
                    <span style={InfoRow}>
                        {'Part number: ' + memory.partNumber}
                    </span>
                    <span style={InfoRow}>
                        {'Size: ' + memory.size}
                    </span>
                    <span style={InfoRow}>
                        {'Extended size: ' + memory.extendedSize}
                    </span>
                    <span style={InfoRow}>
                        {'Configured clock speed: ' + memory.configuredClockSpeed}
                    </span>
                    <br/>
                </Typography>
                )
            )}
        </React.Fragment>
    )
}
