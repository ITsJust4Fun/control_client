import React from 'react'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import {gql, useMutation} from "@apollo/client"
import Box from "@mui/material/Box"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import TabContext from "@mui/lab/TabContext"
import TabPanel from "@mui/lab/TabPanel"
import TextField from "@mui/material/TextField"

const RUN_COMMAND = gql`
mutation RunCommand($id: ID!, $command: String!) {
  runCommand(input: {deviceId: $id, command: $command}) {
    code
    output
  }
}
`

const ENCODE = gql`
mutation Encode($id: ID!) {
  encode(input: {deviceId: $id}) {
    code
    output
  }
}
`

const DECODE = gql`
mutation Decode($id: ID!) {
  decode(input: {deviceId: $id}) {
    code
    output
  }
}
`

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
    '& .MuiDialog-paper': {
        maxWidth: "900px",
    }
}))

export interface DialogTitleProps {
    id: string
    children?: React.ReactNode
    onClose: () => void
}

const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    )
}

interface ControlProps {
    isOpen: boolean,
    handleClose: any,
    id: string,
}

export default function ControlDialog(props: ControlProps) {
    const { isOpen, handleClose, id } = props

    const [value, setValue] = React.useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const [runCommandHandler] = useMutation(RUN_COMMAND, {
        onCompleted: (data) => {
            if (!data || !data['runCommand'] || !data['runCommand']['output']) {
                return
            }

            alert(data['runCommand']['output'])
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [encodeHandler] = useMutation(ENCODE, {
        onCompleted: (data) => {
            if (!data || !data['encode'] || !data['encode']['output']) {
                return
            }

            alert(data['encode']['output'])
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [decodeHandler] = useMutation(DECODE, {
        onCompleted: (data) => {
            if (!data || !data['decode'] || !data['decode']['output']) {
                return
            }

            alert(data['decode']['output'])
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const [command, setCommand] = React.useState("")

    const handleCommandEdit = (value: string) => {
        setCommand(value)
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Control
            </BootstrapDialogTitle>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                >
                    <Tab label="Encode" value="1" />
                    <Tab label="Decode" value="2" />
                    <Tab label="Run" value="3" />
                </Tabs>
            </Box>
            <DialogContent dividers>
                <TabContext value={value}>
                    <TabPanel value="1">
                        <Button
                            style={{marginLeft: '25%'}}
                            variant="contained"
                            onClick={() => {
                                encodeHandler({ variables: { id: id } })
                            }}
                        >
                            Encode
                        </Button>
                    </TabPanel>
                    <TabPanel value="2">
                        <Button
                            style={{marginLeft: '25%'}}
                            variant="contained"
                            onClick={() => {
                                decodeHandler({ variables: { id: id } })
                            }}
                        >
                            Decode
                        </Button>
                    </TabPanel>
                    <TabPanel value="3">
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="command"
                            type="text"
                            autoComplete="current-password"
                            onChange={(event) =>
                                handleCommandEdit(event.target.value)}
                        />
                        <Button
                            style={{marginLeft: '38%'}}
                            variant="contained"
                            onClick={() => {
                                runCommandHandler({ variables: { id: id, command:command } })
                            }}
                        >
                            Run
                        </Button>
                    </TabPanel>
                </TabContext>
            </DialogContent>
            <DialogActions>
                <Button autoFocus onClick={handleClose}>
                    OK
                </Button>
            </DialogActions>
        </BootstrapDialog>
    )
}
