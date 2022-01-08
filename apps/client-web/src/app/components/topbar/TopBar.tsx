import { useSelector } from "react-redux";
import { AppBar, Button, Toolbar } from "@mui/material";
import LoginButton from "./LoginButton";
import Logo from "../Logo";
import DropdownMenu from "./DropdownMenu";
import InlineMenu from "./InlineMenu";
import { RootState } from "../../store";
import LogoutButton from "./LogoutButton";


export function Menu() {
  const isLoggedIn : boolean = useSelector((state : RootState) => state.auth.isLoggedIn);

  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Logo sx={{ml:2, display: {xs: "none", md: "flex"}}} />
          <DropdownMenu sx={{ml:2, display: {xs: "flex", md: "none"}}} />
          
          {isLoggedIn && <InlineMenu sx={{display: {xs: "none", md: "flex"}}} />}
          <Logo sx={{display: {xs: "flex", md: "none"}}} />
          

          {isLoggedIn ?
            <LogoutButton sx={{mr : 2}}/>
            :
            <LoginButton sx={{mr : 2}}/>
          }

        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Menu;