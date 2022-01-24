import React from 'react'


import Typography from '@mui/material/Typography'
import {gql, useQuery} from "@apollo/client"
import {styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%'
})

interface SysSlotInfo {
    slotDesignation: string,
    slotType: string,
    slotDataBusWidth: string,
    slotID: string,
    segmentGroupNumber: string,
    busNumber: string,
}

interface SysSlotQuery {
    sysSlots: SysSlotInfo[]
}

const SYS_SLOT_QUERY = gql`
query SysSlot($id: ID!) {
  sysSlots(id: $id) {
    slotDesignation
    slotType
    slotDataBusWidth
    slotID
    segmentGroupNumber
    busNumber
  }
}
`

const InfoRow = {
    marginLeft: '15px',
    display: 'block'
}

interface SysSlotProps {
    id: string,
}

export default function SysSlot(props: SysSlotProps) {
    const { id } = props

    const { loading, data } = useQuery<SysSlotQuery>(SYS_SLOT_QUERY, {
        variables: { id },
    })

    return (
        <React.Fragment>
            { loading ? (
                <Progress />
            ) : data && data.sysSlots.map((sysSlot, index) => (
                <Typography key={"sysSlot" + index} variant="body1" color="textSecondary" align="left">
                    <span>
                        {'Index: ' + index}
                    </span>
                    <span style={InfoRow}>
                        {'Slot designation: ' + sysSlot.slotDesignation}
                    </span>
                    <span style={InfoRow}>
                        {'Slot type: ' + sysSlot.slotType}
                    </span>
                    <span style={InfoRow}>
                        {'Slot data bus width: ' + sysSlot.slotDataBusWidth}
                    </span>
                    <span style={InfoRow}>
                        {'Slot ID: ' + sysSlot.slotID}
                    </span>
                    <span style={InfoRow}>
                        {'Segment group number: ' + sysSlot.segmentGroupNumber}
                    </span>
                    <span style={InfoRow}>
                        {'Bus number: ' + sysSlot.busNumber}
                    </span>
                    <br/>
                 </Typography>
                )
            )}
        </React.Fragment>
    )
}
