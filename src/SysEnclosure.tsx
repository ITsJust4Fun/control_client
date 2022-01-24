import React from 'react'


import Typography from '@mui/material/Typography'
import {gql, useQuery} from "@apollo/client"
import {styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%'
})

interface SysEnclosureInfo {
    manufacturer: string,
    version: string,
    serialNumber: string,
    assetTag: string,
    containedCount: string,
    containedLength: string,
    skuNumber: string,
}

interface SysEnclosureQuery {
    sysEnclosure: SysEnclosureInfo[]
}

const SYS_ENCLOSURE_QUERY = gql`
query SysEnclosure($id: ID!) {
  sysEnclosure(id: $id) {
    manufacturer
    version
    serialNumber
    assetTag
    containedCount
    containedLength
    skuNumber
  }
}
`

const InfoRow = {
    marginLeft: '15px',
    display: 'block'
}

interface SysEnclosureProps {
    id: string,
}

export default function SysEnclosure(props: SysEnclosureProps) {
    const { id } = props

    const { loading, data } = useQuery<SysEnclosureQuery>(SYS_ENCLOSURE_QUERY, {
        variables: { id },
    })

    return (
        <React.Fragment>
            { loading ? (
                <Progress />
            ) : data && data.sysEnclosure.map((sysEnclosure, index) => (
                <Typography key={"sysEnclosure" + index} variant="body1" color="textSecondary" align="left">
                    <span>
                        {'Index: ' + index}
                    </span>
                    <span style={InfoRow}>
                        {'Manufacturer: ' + sysEnclosure.manufacturer}
                    </span>
                    <span style={InfoRow}>
                        {'Version: ' + sysEnclosure.version}
                    </span>
                    <span style={InfoRow}>
                        {'Serial number: ' + sysEnclosure.serialNumber}
                    </span>
                    <span style={InfoRow}>
                        {'Asset tag: ' + sysEnclosure.assetTag}
                    </span>
                    <span style={InfoRow}>
                        {'Contained count: ' + sysEnclosure.containedCount}
                    </span>
                    <span style={InfoRow}>
                        {'Contained length: ' + sysEnclosure.containedLength}
                    </span>
                    <span style={InfoRow}>
                        {'SKU number: ' + sysEnclosure.skuNumber}
                    </span>
                    <br/>
                </Typography>
                )
            )}
        </React.Fragment>
    )
}
