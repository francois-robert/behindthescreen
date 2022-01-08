import { Box, Button, FormControl, FormHelperText, Input, InputLabel, TextField, Typography  } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { tokenAdded } from "../../store/userSlice";
import { useHistory } from "react-router-dom";


const LoginForm = (props : any) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [emailInputError, setEmailInputError] = React.useState(false);
    const [passwordInputError, setPasswordInputError] = React.useState(false);

    const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");


    const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event : React.SyntheticEvent) => {
        event.preventDefault()

        setEmailInputError(false)
        setPasswordInputError(false)

        setEmailErrorMessage("")
        setPasswordErrorMessage("")
        
        axios.post('/api/users/login', {email: email, password: password})
            .then((res) => loginSuccess(res.data))
            .catch((err) => loginError(err.response.data.errors))
    }

    const loginSuccess = (res : any) => {
        dispatch(tokenAdded(res.token))
        props.closePopup()
    }

    const loginError = (errors : any) => {
        Object.keys(errors).forEach((e) => {
            switch (e) {
                case "email":
                    setEmailInputError(true)
                    setEmailErrorMessage(errors[e])
                    break;
                case "password":
                    setPasswordInputError(true)
                    setPasswordErrorMessage(errors[e])
                    break;
            }
        })
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
            <TextField data-cy="email-input" label="Email" variant="filled" error={emailInputError} value={email} onChange={handleChangeEmail} />
            <Typography>{emailErrorMessage}</Typography>
            <TextField data-cy="password-input" label="Mot de passe" type="password" autoComplete="current-password" variant="filled" error={passwordInputError} value={password} onChange={handleChangePassword} />
            <Typography>{passwordErrorMessage}</Typography>
            <Button data-cy="signin-button" type="submit">Se connecter</Button>
        </Box>
    );
};

export default LoginForm;