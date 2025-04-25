import React from "react";
import { Button, Grid, Paper } from "@material-ui/core";
import useStyles from "./styles/index.styles";
import { Link } from "react-router-dom";
import { getTranslate, lang } from "../../localization";
import UsersList from "./UsersList";

const basePath = lang === "en" ? "/en" : "";

export default function Users() {
  const translate = getTranslate();
  const classes = useStyles();
  return (
    <Grid container direction="column" className={classes.root}>
      <Button
        component={Link}
        to={`${basePath}/users/add-edit`}
        variant="contained"
        color="primary"
        fullWidth
      >
        {translate.User.addUser}
      </Button>
      <Paper className={classes.paper}>
        <UsersList />
      </Paper>
    </Grid>
  );
}
