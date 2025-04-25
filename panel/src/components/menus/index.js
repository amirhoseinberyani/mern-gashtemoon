/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from "react";
import { Hidden } from "@material-ui/core";
import { SwipeableDrawer, Drawer } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import useStyles from "./styles/index.styles";
import menuIcon from "../../assets/vector/logo.png";
import MenuItems from "./MenuItems";

export default function DashboardMenu() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [path]);

  const toggleOpenMenu = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Hidden smUp>
        <div className={classes.rightMenu} onClick={toggleOpenMenu}>
          <img
            src={menuIcon}
            alt="persian-locals"
            className={classes.menuIcon}
          />
        </div>
      </Hidden>
      <Hidden smUp>
        <SwipeableDrawer
          onOpen={toggleOpenMenu}
          onClose={toggleOpenMenu}
          open={open}
        >
          <MenuItems />
        </SwipeableDrawer>
      </Hidden>
      <Hidden xsDown>
        <Drawer classes={{ paper: classes.paper }} variant="permanent">
          <MenuItems />
        </Drawer>
      </Hidden>
    </div>
  );
}
