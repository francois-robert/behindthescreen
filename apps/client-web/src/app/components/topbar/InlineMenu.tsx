import { Box, Button, ButtonGroup, SxProps, Theme } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { menuLinks } from './menuLinks';

const InlineMenu = (props: { sx: SxProps<Theme>;  }) => {
    const activeLink : React.CSSProperties | undefined = {textDecoration: 'underline white', textUnderlineOffset: "0.3em", textDecorationThickness: "0.15em" }

    return (
      <Box sx={Object.assign({ flexGrow: 10, alignItems: 'center'}, props.sx)}>
        <ButtonGroup variant="text" aria-label="text button group">
        {menuLinks.map((page) => (
          <NavLink exact to={page.path} key={page.name} data-cy={page.name+"-link"} style={{textDecoration:"none"}} activeStyle={activeLink}>
            <Button variant="text" sx={{color:"white"}} >
              {page.name}
            </Button>
          </NavLink>
        ))}
        </ButtonGroup>
      </Box>
    );
};

InlineMenu.defaultProps = {sx : {display: "flex"}}

export default InlineMenu;