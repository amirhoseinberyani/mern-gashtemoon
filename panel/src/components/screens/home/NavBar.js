import React, { useContext } from "react";
import { Button, Divider, Grid, Typography } from "@material-ui/core";
import useStyles from "./styles/index.styles";
import { FetchContext } from "../../../contexts/FetchContext";
import { API, base_api } from "../../../constants/api";

import uploadPlaceHoclder from "../../../assets/images/upload.png";
import { getTranslate } from "../../../localization";

const translate = getTranslate();

export default function NavBar({ navbarIcon, setNavbarIcon }) {
  const { fetchUpload } = useContext(FetchContext);
  const classes = useStyles();

  return (
    <>
      <Typography variant="h4" className={classes.servicesTitle}>
        {translate.SiteInfo.navbar}
      </Typography>
      <Divider />
      <Grid
        container
        direction="row"
        alignItems="center"
        className={classes.gridContainer}
      >
        <Grid
          item
          md={3}
          container
          direction="row"
          wrap="wrap"
          alignItems="center"
        >
          <img alt=""
            src={navbarIcon === "" ? uploadPlaceHoclder : base_api + navbarIcon}
            className={classes.icon}
          />
          <input
            type="file"
            name="profile"
            id={`fileAbout`}
            style={{ display: "none" }}
            onChange={(e) => {
              fetchUpload(
                API.Upload.UploadStatics,
                "website-statics",
                e.target.files[0]
              ).then(({ status, data }) => {
                if (status === 200) {
                  setNavbarIcon(data.path);
                  console.log(data.path);
                }
              });
            }}
          />
          <Button
            onClick={() => document.getElementById(`fileAbout`).click()}
            className={classes.uploadBtn}
            variant="outlined"
            size="medium"
            color="secondary"
          >
            {translate.SiteInfo.uploadFile}
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
