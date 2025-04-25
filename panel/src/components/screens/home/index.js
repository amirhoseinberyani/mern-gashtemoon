/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import { Button, Grid } from "@material-ui/core";
import useStyles from "./styles/index.styles";
import { FetchContext } from "../../../contexts/FetchContext";
import { API } from "../../../constants/api";
import { getTranslate } from "../../../localization";

import Header from "./Header";
import Footer from "./Footer";
import NavBar from "./NavBar";

export default function MainSiteInfo() {
  const translate = getTranslate();
  let { fetchPost, fetchGet } = useContext(FetchContext);
  const classes = useStyles();

  //states
  const [navbarIcon, setNavbarIcon] = useState("");
  const [headers, setHeaders] = useState([
    { index: 0, title: "", description: "", image: "" },
  ]);
  const [statistics, setStatistics] = useState([
    { index: 0, title: "", description: "", image: "" },
  ]);
  const [footer, setFooter] = useState({
    description: "",
    url: "",
    instagram: "",
    telegram: "",
    whatsapp: "",
    youtube: "",
  });

  useEffect(() => {
    fetchGet(API.Site.SiteInfo).then(({ status, data }) => {
      if (status === 200) {
        if (data && data.site.navbarIcon && data.site.navbarIcon.length > 0)
          setNavbarIcon(data.site.navbarIcon);
        if (data && data.site.headers && data.site.headers.length > 0)
          setHeaders(data.site.headers);
        if (data && data.site.footer && data.site.footer.length > 0)
          setFooter(data.site.footer);
        if (data && data.site.statistics && data.site.statistics.length > 0)
          setStatistics(data.site.statistics);
        if (data && data.site.footer) setFooter(data.site.footer);
      }
    });
  }, []);

  const SaveProccess = () => {
    fetchPost(API.Site.SaveSite, {
      navbarIcon,
      headers,
      statistics,
      footer,
    }).then(({ status, data }) => { });
  };

  return (
    <Grid container direction="column">
      <Grid container direction="column" className={classes.gridContainer}>
        <NavBar navbarIcon={navbarIcon} setNavbarIcon={setNavbarIcon} />
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Header headers={headers} setHeaders={setHeaders} />
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Footer footer={footer} setFooter={setFooter} />
      </Grid>
      <Grid container direction="column" className={classes.gridContainer}>
        <Button
          onClick={SaveProccess}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
        >
          {translate.SiteInfo.confirm}
        </Button>
      </Grid>
    </Grid>
  );
}
