import { Box, Button, FormControl, FormHelperText, Input, InputLabel, TextField  } from "@mui/material";
import React from "react";

const LoginForm = () => {
    const [login, setLogin] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLogin(event.target.value);
    };
  
    const handleChangePassword= (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
        >
            <form data-cy="login-form">
                <TextField data-cy="username-input" label="Login" variant="filled" value={login} onChange={handleChangeLogin} />
                <TextField data-cy="password-input" label="Mot de passe" type="password" autoComplete="current-password"variant="filled" value={password} onChange={handleChangePassword} />
                <Button data-cy="signin-button">Se connecter</Button>
            </form>
        </Box>
  );
};

export default LoginForm;