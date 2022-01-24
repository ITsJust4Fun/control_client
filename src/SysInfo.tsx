import React from 'react'


import Typography from '@mui/material/Typography'
import {gql, useQuery} from "@apollo/client"
import {styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%'
})

interface System {
    manufacturer: string,
    productName: string,
    version: string,
    serialNumber: string,
    uuid: string,
    skuNumber: string,
    family: string,
}

interface SysInfoQuery {
    sysInfo: System[]
}

const SYS_INFO_QUERY = gql`
query SysInfo($id: ID!) {
  sysInfo(id: $id) {
    manufacturer
    productName
    version
    serialNumber
    uuid
    skuNumber
    family
  }
}
`

const InfoRow = {
    marginLeft: '15px',
    display: 'block'
}

interface SysInfoProps {
    id: string,
}

export default function SysInfo(props: SysInfoProps) {
    const { id } = props

    const { loading, data } = useQuery<SysInfoQuery>(SYS_INFO_QUERY, {
        variables: { id },
    })

    return (
        <React.Fragment>
            { loading ? (
                <Progress />
            ) : data && data.sysInfo.map((sysInfo, index) => (
                <Typography key={"sysInfo" + index} variant="body1" color="textSecondary" align="left">
                    <span>
                        {'Index: ' + index}
                    </span>
                    <span style={InfoRow}>
                        {'Manufacturer: ' + sysInfo.manufacturer}
                    </span>
                    <span style={InfoRow}>
                        {'Product name: ' + sysInfo.productName}
                    </span>
                    <span style={InfoRow}>
                        {'Version: ' + sysInfo.version}
                    </span>
                    <span style={InfoRow}>
                        {'Serial number: ' + sysInfo.serialNumber}
                    </span>
                    <span style={InfoRow}>
                        {'UUID: ' + sysInfo.uuid}
                    </span>
                    <span style={InfoRow}>
                        {'SKUNumber: ' + sysInfo.skuNumber}
                    </span>
                    <span style={InfoRow}>
                        {'family: ' + sysInfo.family}
                    </span>
                    <br/>
                </Typography>
                )
            )}
        </React.Fragment>
    )
}
