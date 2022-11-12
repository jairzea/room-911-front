/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
import { useEffect, useState } from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AppRegistrationRounded, DisabledByDefault, Edit } from "@mui/icons-material";
import { ListItemIcon } from "@mui/material";

const MenuActionTable = ({ menu = {} }) => {
  const [isOpen, setIsOpen] = useState();

  const closeMenu = () => setIsOpen(false);

  useEffect(() => {
    setIsOpen(menu?.openTime);
  }, [menu?.openTime]);

  return (
    <Menu
      id="simple-menu"
      anchorEl={menu?.currentTarget}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(isOpen)}
      onClose={closeMenu}
    >
      <MenuItem onClick={closeMenu}>
        <ListItemIcon>
          <Edit />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem onClick={closeMenu}>
        <ListItemIcon>
          <DisabledByDefault />
        </ListItemIcon>
        Disabled
      </MenuItem>
      <MenuItem onClick={closeMenu}>
        <ListItemIcon>
          <AppRegistrationRounded />
        </ListItemIcon>
        Income record
      </MenuItem>
    </Menu>
  );
};

export default MenuActionTable;
