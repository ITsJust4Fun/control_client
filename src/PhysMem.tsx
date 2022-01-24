import React from 'react'


import Typography from '@mui/material/Typography'
import {gql, useQuery} from "@apollo/client"
import {styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%'
})

interface PhysMemInfo {
    use: string,
    numberDevices: string,
    maximumCapacity: string,
    extMaximumCapacity: string,
}

interface PhysMemQuery {
    physMem: PhysMemInfo[]
}

const PHYS_MEM_QUERY = gql`
query PhysMem($id: ID!) {
  physMem(id: $id) {
    use
    numberDevices
    maximumCapacity
    extMaximumCapacity
  }
}
`

const InfoRow = {
    marginLeft: '15px',
    display: 'block'
}

interface PhysMemProps {
    id: string,
}

export default function PhysMem(props: PhysMemProps) {
    const { id } = props

    const { loading, data } = useQuery<PhysMemQuery>(PHYS_MEM_QUERY, {
        variables: { id },
    })

    return (
        <React.Fragment>
            { loading ? (
                <Progress />
            ) : data && data.physMem.map((physMem, index) => (
                <Typography key={"physMem" + index} variant="body1" color="textSecondary" align="left">
                    <span>
                        {'Index: ' + index}
                    </span>
                    <span style={InfoRow}>
                        {'Use: ' + physMem.use}
                    </span>
                    <span style={InfoRow}>
                        {'Number devices: ' + physMem.numberDevices}
                    </span>
                    <span style={InfoRow}>
                        {'Maximum capacity: ' + physMem.maximumCapacity}
                    </span>
                    <span style={InfoRow}>
                        {'External maximum capacity: ' + physMem.extMaximumCapacity}
                    </span>
                    <br/>
                </Typography>
                )
            )}
        </React.Fragment>
    )
}
