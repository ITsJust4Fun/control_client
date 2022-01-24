import React from 'react'


import Typography from '@mui/material/Typography'
import {gql, useQuery} from "@apollo/client"
import {styled} from "@mui/material/styles";
import CircularProgress from "@mui/material/CircularProgress";

const Progress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%'
})

interface ProcessorInfo {
    manufacturer: string,
    version: string,
    coreCount: string,
    coreEnabled: string,
    threadCount: string,
    socketDesignation: string,
    processorFamily: string,
    processorFamily2: string,
    processorID: string,
}

interface ProcessorsQuery {
    processors: ProcessorInfo[]
}

const PROCESSORS_QUERY = gql`
query Processor($id: ID!) {
  processors(id: $id) {
    manufacturer
    version
    coreCount
    coreEnabled
    threadCount
    socketDesignation
    processorFamily
    processorFamily2
    processorID
  }
}
`

const InfoRow = {
    marginLeft: '15px',
    display: 'block'
}

interface ProcessorProps {
    id: string,
}

export default function Processor(props: ProcessorProps) {
    const { id } = props

    const { loading, data } = useQuery<ProcessorsQuery>(PROCESSORS_QUERY, {
        variables: { id },
    })

    return (
        <React.Fragment>
            { loading ? (
                <Progress />
            ) : data && data.processors.map((processor, index) => (
                <Typography key={"processorInfo" + index} variant="body1" color="textSecondary" align="left">
                    <span>
                        {'Index: ' + index}
                    </span>
                        <span style={InfoRow}>
                        {'Manufacturer: ' + processor.manufacturer}
                    </span>
                        <span style={InfoRow}>
                        {'Version: ' + processor.version}
                    </span>
                        <span style={InfoRow}>
                        {'Core count: ' + processor.coreCount}
                    </span>
                        <span style={InfoRow}>
                        {'Core enabled: ' + processor.coreEnabled}
                    </span>
                        <span style={InfoRow}>
                        {'Thread count: ' + processor.threadCount}
                    </span>
                        <span style={InfoRow}>
                        {'Socket designation: ' + processor.socketDesignation}
                    </span>
                        <span style={InfoRow}>
                        {'Processor family: ' + processor.processorFamily}
                    </span>
                        <span style={InfoRow}>
                        {'Processor family v2: ' + processor.processorFamily2}
                    </span>
                        <span style={InfoRow}>
                        {'processorID: ' + processor.processorID}
                    </span>
                    <br/>
                </Typography>
                )
            )}
        </React.Fragment>
    )
}
