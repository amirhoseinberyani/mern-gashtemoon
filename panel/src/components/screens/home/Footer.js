/* eslint-disable jsx-a11y/alt-text */
import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useContext } from "react";
import instagram from "../../../assets/vector/instagram.svg";
import telegram from "../../../assets/vector/telegram.svg";
import whatsapp from "../../../assets/vector/whatsapp.svg";
import youtube from "../../../assets/vector/youtube.svg";
import { FetchContext } from "../../../contexts/FetchContext";
import useStyles from "./styles/index.styles";

import uploadPlaceHolder from "../../../assets/images/upload.png";
import { API, base_api } from "../../../constants/api";
import { getTranslate } from "../../../localization";

const translate = getTranslate();

export default function Footer({ footer, setFooter }) {
  const { fetchUpload } = useContext(FetchContext);
  const classes = useStyles();
  const { url } = footer;
  return (
    <>
      <Typography variant="h4" className={classes.servicesTitle}>
        {translate.SiteInfo.footer}
      </Typography>
      <Divider />
      <hr className={classes.divder} />
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
          <img
            src={
              url === "" ? uploadPlaceHolder : base_api + url
            }
            className={classes.icon}
          />
          <input
            type="file"
            id={`fileFooter`}
            style={{ display: "none" }}
            onChange={(e) => {
              fetchUpload(API.Upload.UploadStatics, "website-statics", e.target.files[0]).then(({ status, data }) => {
                if (status === 200) {
                  setFooter({ ...footer, url: data.path });
                }
              });
            }}
          />
          <Button
            onClick={() => document.getElementById(`fileFooter`).click()}
            className={classes.uploadBtn}
            variant="outlined"
            size="medium"
            color="secondary"
          >
            {translate.SiteInfo.uploadFile}
          </Button>
        </Grid>
        <Grid
          item
          md={9}
          container
          direction="row"
          wrap="wrap"
          alignItems="center"
        >
          <TextField
            multiline
            rows={4}
            value={footer.description}
            onChange={(e) =>
              setFooter({ ...footer, description: e.target.value })
            }
            className={classes.description}
            label={translate.SiteInfo.description}
            variant="outlined"
            size="small"
          />
        </Grid>
        <Grid>
          <Grid
            container
            direction="row"
            alignItems="center"
            className={classes.gridContainer}
          >
            <IconButton
              style={{
                marginRight: 10,
                borderRadius: 0,
                border: "1px solid #eaeff4",
              }}
            >
              <img src={instagram} width={22} height={22} alt="logo" />
            </IconButton>

            <Box m={5}>
              <TextField
                value={footer.instagram}
                onChange={(e) =>
                  setFooter({ ...footer, instagram: e.target.value })
                }
                className={classes.title}
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
            <IconButton
              style={{
                marginRight: 10,
                borderRadius: 0,
                border: "1px solid #eaeff4",
              }}
            >
              <img src={telegram} width={22} height={22} alt="logo" />
            </IconButton>

            <Box m={5}>
              <TextField
                value={footer.telegram}
                onChange={(e) =>
                  setFooter({ ...footer, telegram: e.target.value })
                }
                className={classes.title}
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
            <IconButton
              style={{
                marginRight: 10,
                borderRadius: 0,
                border: "1px solid #eaeff4",
              }}
            >
              <img src={whatsapp} width={22} height={22} alt="logo" />
            </IconButton>

            <Box m={5}>
              <TextField
                value={footer.whatsapp}
                onChange={(e) =>
                  setFooter({ ...footer, whatsapp: e.target.value })
                }
                className={classes.title}
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
            <IconButton
              style={{
                marginRight: 10,
                borderRadius: 0,
                border: "1px solid #eaeff4",
              }}
            >
              <img src={youtube} width={22} height={22} alt="logo" />
            </IconButton>

            <Box m={5}>
              <TextField
                value={footer.youtube}
                onChange={(e) =>
                  setFooter({ ...footer, youtube: e.target.value })
                }
                className={classes.title}
                variant="outlined"
                size="small"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
