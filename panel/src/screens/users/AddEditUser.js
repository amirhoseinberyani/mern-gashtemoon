/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext, useEffect } from "react";
import { Button, Grid, TextField, Box, Paper } from "@material-ui/core";
import useStyles from "./styles/discounts.styles";
import { FetchContext } from "../../contexts/FetchContext";
import { API } from "../../constants/api";
import { useHistory, useParams } from "react-router-dom";
import { getTranslate, lang } from "../../localization";

const basePath = lang === "en" ? "/en" : "";
const translate = getTranslate();

export default function AddEditUser({ mode }) {
  let history = useHistory();
  let { id } = useParams();
  let { fetchPost, fetchPut, fetchGet } = useContext(FetchContext);
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [onQuoteDescription, setOnQuoteDescription] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (id && id.length > 0) {
      fetchGet(API.User.UsersList + "?id=" + id).then(({ status, data }) => {
        if (status === 200) {
          if (data && data.lists[0]) {
            setFirstName(data.lists[0].firstName);
            setLastName(data.lists[0].lastName);
            setEmail(data.lists[0].email);
            setOnQuoteDescription(data.lists[0].onQuoteDescription);
          }
        }
      });
    }
  }, []);

  const AddEditProcces = () => {
    if (id) {
      fetchPut(API.Admin.Edit, {
        email,
        firstName,
        lastName,
        password,
        onQuoteDescription,
        _id: id,
      }).then(({ status, data }) => {
        if (status === 200) {
          history.push(`${basePath}/users`);
        }
      });
    } else {
      fetchPost(API.User.Register, {
        email,
        password,
        firstName,
        lastName,
        onQuoteDescription,
      }).then(({ status, data }) => {
        if (status === 200) {
          history.push(`${basePath}/users`);
        }
      });
    }
  };

  return (
    <Grid container direction="column" className={classes.root}>
      <Paper className={classes.paper} >
        <Grid
          container
          direction="column"
          alignItems="center"
          className={classes.gridContainer}
        >
          <Box m={10} width="80%">
            <TextField
              value={firstName}
              fullWidth
              onChange={(e) => setFirstName(e.target.value)}
              className={classes.description}
              label={translate.User.firstName}
              variant="outlined"
              size="small"
            />
          </Box>
          <Box m={10} width="80%">
            <TextField
              value={lastName}
              fullWidth
              onChange={(e) => setLastName(e.target.value)}
              className={classes.description}
              label={translate.User.lastName}
              variant="outlined"
              size="small"
            />
          </Box>
          <Box m={10} width="80%">
            <TextField
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              className={classes.description}
              label={translate.User.email}
              variant="outlined"
              size="small"
            />
          </Box>
          <Box m={10} width="80%">
            <TextField
              value={password}
              fullWidth
              onChange={(e) => setPassword(e.target.value)}
              className={classes.description}
              label={translate.User.password}
              variant="outlined"
              size="small"
            />
          </Box>
          <Box m={10} width="80%">
            <TextField
              value={onQuoteDescription}
              onChange={(e) => setOnQuoteDescription(e.target.value)}
              fullWidth
              className={classes.description}
              label={translate.User.onQuoteDescription}
              variant="outlined"
              size="small"
            />
          </Box>
        </Grid>
        <Grid
          container
          direction="row"
          alignItems="center"
          className={classes.gridContainer}
        >
          <Button
            onClick={AddEditProcces}
            variant="contained"
            color="primary"
            fullWidth
          >
            {translate.blog.addOrEdit}
          </Button>
        </Grid>
      </Paper>
    </Grid>
  );
}
