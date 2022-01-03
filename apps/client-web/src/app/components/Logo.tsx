import { Typography, Box  } from "@mui/material";
import SvgLogo from "./SvgLogo";

const Logo = (props: { sx: any; }) => {
    return (
        <Box sx={Object.assign({ flexGrow: 1, alignItems: 'center' }, props.sx)}>
            <SvgLogo style={{marginRight: '10px', fill: "blue"}} />
            <Typography variant="h5" noWrap>Behind The Screen</Typography>
        </Box>
  );
};

export default Logo;