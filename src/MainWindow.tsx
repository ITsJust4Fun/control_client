import React, { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import CssBaseline from '@mui/material/CssBaseline'
import useScrollTrigger from '@mui/material/useScrollTrigger'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import DashboardIcon from '@mui/icons-material/Dashboard'
import DevicesIcon from '@mui/icons-material/Devices'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ConnectedTvIcon from '@mui/icons-material/ConnectedTv'
import SettingsIcon from '@mui/icons-material/Settings'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { styled, useTheme } from '@mui/material/styles'

import MenuMarker from "./MenuMarker"

const drawerWidth = 240

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}))

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}))

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))

interface Props {
    children: React.ReactElement;
}

function HideOnScroll(props: Props) {
    const { children } = props;
    const trigger = useScrollTrigger()

    return (
        <Slide appear={true} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

enum windowType {
    Dashboard,
    Devices,
    Start,
    Companies,
    Settings
}

export default function MainWindow() {
    const theme = useTheme()
    const [open, setOpen] = useState(false)
    const [openedMenu, setOpenedMenu] = useState(windowType.Dashboard)

    const menuListItemStyle = {
        borderRadius: '0px 10px 57px 0px'
    }

    let headerTitle = ''

    switch (openedMenu) {
        case windowType.Dashboard:
            headerTitle = 'Dashboard'
            break
        case windowType.Devices:
            headerTitle = 'Remote devices'
            break
        case windowType.Start:
            headerTitle = 'Start company'
            break
        case windowType.Companies:
            headerTitle = 'Companies'
            break
        case windowType.Settings:
            headerTitle = 'Settings'
            break
    }

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <HideOnScroll>
                <AppBar
                    position="fixed" open={open}
                    sx={{
                        boxShadow: 'none',
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        backdropFilter: 'blur(8px)',
                        borderStyle: 'solid',
                        borderColor: 'rgba(0, 0, 0, 0.12)',
                        borderWidth: '0px 0px thin'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" style={{ color: 'black' }}>
                            {headerTitle}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ minHeight: '66px' }}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem
                        style={menuListItemStyle}
                        button
                        onClick={ () => { setOpenedMenu(windowType.Dashboard) }}
                        key='dashboard'
                    >
                        <MenuMarker marked={openedMenu === windowType.Dashboard} />
                        <ListItemIcon>
                            <DashboardIcon />
                        </ListItemIcon>
                        <ListItemText primary='Dashboard' />
                    </ListItem>
                    <ListItem
                        style={menuListItemStyle}
                        button
                        onClick={ () => { setOpenedMenu(windowType.Devices) }}
                        key='remote'
                    >
                        <MenuMarker marked={openedMenu === windowType.Devices} />
                        <ListItemIcon>
                            <DevicesIcon />
                        </ListItemIcon>
                        <ListItemText primary='Remote devices' />
                    </ListItem>
                    <ListItem
                        style={menuListItemStyle}
                        button
                        onClick={ () => { setOpenedMenu(windowType.Start) }}
                        key='start'
                    >
                        <MenuMarker marked={openedMenu === windowType.Start} />
                        <ListItemIcon>
                            <PlayArrowIcon />
                        </ListItemIcon>
                        <ListItemText primary='Start company' />
                    </ListItem>
                    <ListItem
                        style={menuListItemStyle}
                        button
                        onClick={ () => { setOpenedMenu(windowType.Companies) }}
                        key='companies'
                    >
                        <MenuMarker marked={openedMenu === windowType.Companies} />
                        <ListItemIcon>
                            <ConnectedTvIcon />
                        </ListItemIcon>
                        <ListItemText primary='Companies' />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem
                        style={menuListItemStyle}
                        button
                        onClick={ () => { setOpenedMenu(windowType.Settings) }}
                        key='settings'
                    >
                        <MenuMarker marked={openedMenu === windowType.Settings} />
                        <ListItemIcon>
                            <SettingsIcon />
                        </ListItemIcon>
                        <ListItemText primary='Settings' />
                    </ListItem>
                </List>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                <Typography paragraph>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                    enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                    imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                    Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                    Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                    adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                    nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                    leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                    feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                    consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                    sapien faucibus et molestie ac.
                </Typography>
                <Typography paragraph>
                    Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                    eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                    neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                    tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                    sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                    tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                    gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                    et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                    tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                    eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                    posuere sollicitudin aliquam ultrices sagittis orci a.
                </Typography>
            </Main>
        </Box>
    )
}
