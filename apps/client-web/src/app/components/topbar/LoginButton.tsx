import { Button } from '@mui/material';

const LoginButton = (props: { sx: any; }) => {
    return (
        <Button color="inherit" sx={Object.assign({}, props.sx)}>Login</Button>
    );
};

export default LoginButton;