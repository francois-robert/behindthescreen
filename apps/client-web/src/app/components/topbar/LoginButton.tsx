import { Box, Button, Popover, SxProps, Theme, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { usePopupState, bindTrigger, bindPopover, } from 'material-ui-popup-state/hooks'
import LoginForm from './LoginForm';
  

const LoginButton = (props: { sx: SxProps<Theme>;  }) => {
    const popupState = usePopupState({
        variant: 'popover',
        popupId: 'loginPopover',
      })

    const handleClick = async () => {
        await axios.post("/api/testData/seed");
    }

    return (
        <Box sx={Object.assign({ }, props.sx)}>
            <Button color="inherit"
                    data-cy="login-button"
                    sx={Object.assign({}, props.sx)}
                    {...bindTrigger(popupState)}>
                Login
            </Button>
            <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
            }}
            transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
            }}
        >
            <LoginForm />
        </Popover>
      </Box>
    );
};

export default LoginButton;