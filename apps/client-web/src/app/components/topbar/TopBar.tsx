import { AppBar, Toolbar } from "@mui/material";
import LoginButton from "./LoginButton";
import Logo from "../Logo";
import DropdownMenu from "./DropdownMenu";
import InlineMenu from "./InlineMenu";


export function Menu() {
  return (
    <div style={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <Logo sx={{ml:2, display: {xs: "none", md: "flex"}}} />
          <DropdownMenu sx={{ml:2, display: {xs: "flex", md: "none"}}} />
          
          <InlineMenu sx={{display: {xs: "none", md: "flex"}}} />
          <Logo sx={{display: {xs: "flex", md: "none"}}} />
          <LoginButton sx={{mr : 2}}/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Menu;