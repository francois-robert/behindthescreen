import { Box, Button, FormControl, FormHelperText, Input, InputLabel, TextField, Typography  } from "@mui/material";
import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { loginSuccess, loginFailed } from "../../store/authSlice";
import { login } from "../../actions/auth.service";
import { useHistory } from "react-router-dom";


const LoginForm = (props : { closePopup : () => void; }) => {
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

    const setEmailError = (isError : boolean, message: string) : void => {
        setEmailInputError(isError)
        setEmailErrorMessage(message)
    }

    const setPasswordError = (isError : boolean, message: string) : void => {
        setPasswordInputError(isError)
        setPasswordErrorMessage(message)
    }

    const handleSubmit = (event : React.SyntheticEvent) => {
        event.preventDefault()

        setEmailError(false, "")
        setPasswordError(false, "")
        

        if (email.length === 0)  {
            setEmailError(true, "Vous devez saisir un email")
        } 
        if (password.length === 0) {
            setPasswordError(true, "Vous devez saisir un mot de passe")
        }
        
        if (email.length !== 0 && password.length !== 0) {
            login(email, password).then((res) => {
                dispatch(loginSuccess(res))
                history.push("/");
                window.location.reload();
            }).catch((errors) => {
                dispatch(loginFailed())
                displayErrors(errors.response.data.errors)
            })
        }
    }

    const displayErrors = (errors : {[prop: string]: string}) => {
        Object.keys(errors).forEach((e) => {
            switch (e) {
                case "email":
                    setEmailError(true, errors[e])
                    break;
                case "password":
                    setPasswordError(true, errors[e])
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