/* eslint-disable array-callback-return */
import React, { useState, useContext } from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import useStyles from "./styles/index.styles";
import { lang, getTranslate } from "../../localization";
import { FetchContext } from "../../contexts/FetchContext";
import { LoginContext } from "../../contexts/LoginContext";
import { API } from "../../constants/api";

export default function Index() {
  const translate = getTranslate();
  let { fetchPost } = useContext(FetchContext);
  let { setToken, setName, setRole } = useContext(LoginContext);
  const [mobileOrEmail, setMobileOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileOrEmailError, setMobileOrEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const location = useLocation();
  const path = location.pathname;
  let changeLangPath = lang === "en" ? path.substring(3) : "/fa" + path;
  const classes = useStyles();
  const loginProccess = () => {
    fetchPost(API.Authentication.Login, {
      email: mobileOrEmail,
      password: password,
    }).then(({ status, data }) => {
      if (status === 400) {
        data.errors.map((d) => {
          if (d.key === "mobileOrEmail") {
            setMobileOrEmailError(d.msg);
          }
          if (d.key === "password") {
            setPasswordError(d.msg);
          }
        });
      } else if (status === 200) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        localStorage.setItem("name", data.name);
        setName(data.name);
        localStorage.setItem("role", data.role);
        setRole(data.role);
      }
    });
  };
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      className={classes.root}
    >
      <Grid container className={classes.loginGrid} direction="column">
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          label={translate.Login.mobile}
          className={classes.input}
          value={mobileOrEmail}
          onChange={(e) => setMobileOrEmail(e.target.value)}
          error={mobileOrEmailError.length > 0}
          helperText={mobileOrEmailError}
        />
        <TextField
          variant="outlined"
          fullWidth
          size="small"
          label={translate.Login.password}
          className={classes.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={passwordError.length > 0}
          helperText={passwordError}
          type="password"
        />
        <Button
          onClick={loginProccess}
          variant="outlined"
          color="primary"
          fullWidth
        >
          {translate.Login.btn}
        </Button>
        <Button
          component="a"
          href={changeLangPath}
          variant="text"
          color="secondary"
          className={classes.changeLangBtn}
          fullWidth
        >
          {lang === "fa" ? "Change Language to English" : "تغییر زبان به فارسی"}
        </Button>
      </Grid>
    </Grid>
  );
}
