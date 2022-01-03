import { Button, SxProps, Theme } from '@mui/material';

const LoginButton = (props: { sx: SxProps<Theme>;  }) => {
    return (
        <Button color="inherit" sx={Object.assign({}, props.sx)}>Login</Button>
    );
};

export default LoginButton;