import React from 'react'


import Typography from '@mui/material/Typography'
import {gql, useQuery} from "@apollo/client"
import {styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%'
})

interface BaseBoardInfo {
    manufacturer: string,
    product: string,
    version: string,
    serialNumber: string,
    assetTag: string,
    locationInChassis: string,
    chassisHandle: string,
    boardType: string,
}

interface BaseBoardQuery {
    baseBoards: BaseBoardInfo[]
}

const BASEBOARD_QUERY = gql`
query BaseBoard($id: ID!) {
  baseBoards(id: $id) {
    manufacturer
    product
    version
    serialNumber
    assetTag
    locationInChassis
    chassisHandle
    boardType
  }
}
`

const InfoRow = {
    marginLeft: '15px',
    display: 'block'
}

interface BaseBoardProps {
    id: string,
}

export default function SysInfo(props: BaseBoardProps) {
    const { id } = props

    const { loading, data } = useQuery<BaseBoardQuery>(BASEBOARD_QUERY, {
        variables: { id },
    })

    return (
        <React.Fragment>
            { loading ? (
                <Progress />
            ) : data && data.baseBoards.map((baseBoard, index) => (
                <Typography key={"baseBoard" + index} variant="body1" color="textSecondary" align="left">
                    <span>
                        {'Index: ' + index}
                    </span>
                    <span style={InfoRow}>
                        {'Manufacturer: ' + baseBoard.manufacturer}
                    </span>
                    <span style={InfoRow}>
                        {'Product: ' + baseBoard.product}
                    </span>
                    <span style={InfoRow}>
                        {'Version: ' + baseBoard.version}
                    </span>
                    <span style={InfoRow}>
                        {'Serial number: ' + baseBoard.serialNumber}
                    </span>
                    <span style={InfoRow}>
                        {'Asset tag: ' + baseBoard.assetTag}
                    </span>
                    <span style={InfoRow}>
                        {'Location in chassis: ' + baseBoard.locationInChassis}
                    </span>
                    <span style={InfoRow}>
                        {'Chassis handle: ' + baseBoard.chassisHandle}
                    </span>
                    <span style={InfoRow}>
                        {'Board type: ' + baseBoard.boardType}
                    </span>
                    <br/>
                </Typography>
                )
            )}
        </React.Fragment>
    )
}
