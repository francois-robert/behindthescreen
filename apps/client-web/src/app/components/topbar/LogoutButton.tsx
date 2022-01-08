import { Button, SxProps, Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth.service";

const LogoutButton = (props: { sx: SxProps<Theme>;  }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    const handleLogout = () => {
        logout();
        history.push("/");
        window.location.reload();
    }

    return (
        <Button color="inherit"
                data-cy="logout-button"
                sx={Object.assign({}, props.sx)}
                onClick={handleLogout}>
            Logout
        </Button>
    );
 };
                    
export default LogoutButton;