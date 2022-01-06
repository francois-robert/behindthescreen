import { Box, Button, FormControl, FormHelperText, Input, InputLabel, TextField  } from "@mui/material";
import axios from "axios";
import React from "react";

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event : any) => {
        event.preventDefault()
        
        axios.post('/api/users/login', {email: email, password: password})
            .then((res) => console.log(res))
            .catch((err) => console.log(err.response.data.message))
    }

    return (
        <Box
            component="form"
            sx={{
                '& > :not(style)': { m: 1 },
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            data-cy="login-form"
        >
            <TextField data-cy="email-input" label="Email" variant="filled" value={email} onChange={handleChangeEmail} />
            <TextField data-cy="password-input" label="Mot de passe" type="password" autoComplete="current-password"variant="filled" value={password} onChange={handleChangePassword} />
            <Button data-cy="signin-button" type="submit">Se connecter</Button>
        </Box>
    );
};

export default LoginForm;