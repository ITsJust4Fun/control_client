import React from 'react'


import Typography from '@mui/material/Typography'
import {gql, useQuery} from "@apollo/client"
import {styled} from "@mui/material/styles"
import CircularProgress from "@mui/material/CircularProgress"

const Progress = styled(CircularProgress)({
    marginTop: '3%',
    marginLeft: '50%'
})

interface OemString {
    count: string,
    values: string,
}

interface OemStringsQuery {
    oemStrings: OemString[]
}

const OEM_STRINGS_QUERY = gql`
query OemStrings($id: ID!) {
  oemStrings(id: $id) {
    count
    values
  }
}
`

const InfoRow = {
    marginLeft: '15px',
    display: 'block'
}

interface OemStringsProps {
    id: string,
}

export default function OemStrings(props: OemStringsProps) {
    const { id } = props

    const { loading, data } = useQuery<OemStringsQuery>(OEM_STRINGS_QUERY, {
        variables: { id },
    })

    return (
        <React.Fragment>
            { loading ? (
                <Progress />
            ) : data && data.oemStrings.map((oemString, index) => (
                <Typography key={"sysSlot" + index} variant="body1" color="textSecondary" align="left">
                    <span>
                        {'Index: ' + index}
                    </span>
                    <span style={InfoRow}>
                        {'Count: ' + oemString.count}
                    </span>
                    <span style={InfoRow}>
                        {'Value: ' + oemString.values}
                    </span>
                        <br/>
                </Typography>
                )
            )}
        </React.Fragment>
    )
}
