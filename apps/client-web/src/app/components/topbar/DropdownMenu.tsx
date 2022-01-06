import { Box, IconButton, Menu, MenuItem, SxProps, Theme, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { menuLinks } from './menuLinks';
import {
    usePopupState,
    bindTrigger,
    bindMenu,
  } from 'material-ui-popup-state/hooks'


const DropdownMenu = (props: { sx: SxProps<Theme>; }) => {
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'navMenuPopover',
      })
  
    return (
        <Box sx={Object.assign({ flexGrow: 1, alignItems: 'center' }, props.sx)}>
            <IconButton
            id="button-appbar"
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            color="inherit"
            {...bindTrigger(popupState)}
            >
                <MenuIcon />
            </IconButton>
            <Menu
            {...bindMenu(popupState)}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            sx={{
                display: { xs: 'block', md: 'none' },
            }}
            >
            {menuLinks.map((page) => (
                <NavLink exact to={page.path} key={page.name} style={{textDecoration:"none"}}>
                    <MenuItem onClick={popupState.close}>
                        <Typography textAlign="center">{page.name}</Typography>
                    </MenuItem>
                </NavLink>
            ))}
            </Menu>
        </Box>
    );
};

DropdownMenu.defaultProps = {sx : {display: "flex"}}


export default DropdownMenu;

