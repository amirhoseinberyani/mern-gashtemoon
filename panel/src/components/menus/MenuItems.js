import React, { useContext } from "react";
import {
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { useLocation } from "react-router-dom";
import useStyles from "./styles/menuItems.styles";
import drawerLogo from "../../assets/vector/logo.png";
import languagesIcon from "../../assets/images/languages.png";
import { lang, getTranslate } from "../../localization";
import MenuItem from "./MenuItem";
import { LoginContext } from "../../contexts/LoginContext";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";

export default function MenuItems() {
  let { role, setToken } = useContext(LoginContext);
  const classes = useStyles();
  const location = useLocation();
  const path = location.pathname;
  let changeLangPath = lang === "en" ? path.substring(3) : "/en" + path;

  const translate = getTranslate();
  console.log("role", role);

  const logout = () => {
    localStorage.clear();
    setToken("");
  };

  return (
    <div className={classes.root}>
      <div className={classes.topDrawer}>
        <img
          src={drawerLogo}
          alt="persian-locals"
          className={classes.drawerLogo}
        />
      </div>
      <div className={classes.menuList}>
        <List>
          
    

          {role < 1 && (
            <MenuItem title={translate.top_menu.users} to="/users" />
          )}
        

          <ListItem button component="a" href={changeLangPath}>
            <ListItemIcon>
              <img
                src={languagesIcon}
                alt=""
                className={classes.inActiveMenuIcon}
              />
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="body2"
                className={classes.menuText}
                style={{ fontFamily: lang === "en" ? "IRANSans" : "Muli" }}
              >
                {lang === "fa" ? "English" : "فارسی"}
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem button onClick={logout}>
            <ListItemIcon>
              <IconButton>
                <PowerSettingsNewIcon color="primary" />
              </IconButton>
            </ListItemIcon>
            <ListItemText>
              <Typography
                variant="body2"
                className={classes.menuText}
                style={{ fontFamily: lang === "fa" ? "IRANSans" : "Muli" }}
              >
                {lang === "en" ? "Logout" : "خروج"}
              </Typography>
            </ListItemText>
          </ListItem>
        </List>
      </div>
    </div>
  );
}
