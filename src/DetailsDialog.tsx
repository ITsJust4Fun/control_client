import React from 'react'

import Button from '@mui/material/Button'
import { styled } from '@mui/material/styles'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import TabPanel from '@mui/lab/TabPanel'
import TabContext from '@mui/lab/TabContext'

import BiosInfo from "./BiosInfo"
import Processor from "./Processor"
import SysInfo from "./SysInfo"
import BaseBoard from "./BaseBoard"
import SysEnclosure from "./SysEnclosure"
import SysSlot from "./SysSlot"
import PhysMem from "./PhysMem"
import Memory from "./Memory"
import OemStrings from "./OemStrings"

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

interface DetailsProps {
    isOpen: boolean,
    handleClose: any,
    id: string,
}

export default function DetailsDialog(props: DetailsProps) {
    const { isOpen, handleClose, id } = props
    const [value, setValue] = React.useState('1')

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    return (
        <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
        >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Details
            </BootstrapDialogTitle>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs value={value}
                      onChange={handleChange}
                      variant="scrollable"
                      scrollButtons="auto"
                >
                    <Tab label="Processor" value="1" />
                    <Tab label="BIOS" value="2" />
                    <Tab label="System" value="3" />
                    <Tab label="Base board" value="4" />
                    <Tab label="System enclosure" value="5" />
                    <Tab label="System slot" value="6" />
                    <Tab label="Physical memory" value="7" />
                    <Tab label="Memory" value="8" />
                    <Tab label="Oem strings" value="9" />
                </Tabs>
            </Box>
            <DialogContent dividers>
                <TabContext value={value}>
                    <TabPanel value="1"><Processor id={id} /></TabPanel>
                    <TabPanel value="2"><BiosInfo id={id} /></TabPanel>
                    <TabPanel value="3"><SysInfo id={id} /></TabPanel>
                    <TabPanel value="4"><BaseBoard id={id} /></TabPanel>
                    <TabPanel value="5"><SysEnclosure id={id} /></TabPanel>
                    <TabPanel value="6"><SysSlot id={id} /></TabPanel>
                    <TabPanel value="7"><PhysMem id={id} /></TabPanel>
                    <TabPanel value="8"><Memory id={id} /></TabPanel>
                    <TabPanel value="9"><OemStrings id={id} /></TabPanel>
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
