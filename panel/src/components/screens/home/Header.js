/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useContext, useEffect, useState } from "react";
import { API, base_api } from "../../../constants/api";
import { FetchContext } from "../../../contexts/FetchContext";
import useStyles from "./styles/index.styles";

import uploadPlaceHolder from "../../../assets/images/upload.png";
import { getTranslate } from "../../../localization";
import ConfirmDialog from "../../confirmDialog/ConfirmDialog";

const translate = getTranslate();

function HeaderItem({ deleteSlided, ad, updateSlide }) {
  let { fetchUpload } = useContext(FetchContext);
  const classes = useStyles();
  const [title, settitle] = useState("");
  const [image, setimage] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    settitle(ad.title);
    setimage(ad.image);
    setDescription(ad.description);
  }, [ad]);

  useEffect(() => {
    updateSlide(ad.index, title, image, description);
  }, [image, title, description]);

  return (
    <Grid
      container
      direction="row"
      wrap="wrap"
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
        <IconButton onClick={deleteSlided}>
          <DeleteIcon color="primary" />
        </IconButton>
        <img
          src={image === "" ? uploadPlaceHolder : base_api + image}
          className={classes.icon}
          alt="header"
        />
        <input
          type="file"
          id={`fileAd${ad.index}`}
          style={{ display: "none" }}
          onChange={(e) => {
            fetchUpload(
              API.Upload.UploadStatics,
              "website-statics",
              e.target.files[0]
            ).then(({ status, data }) => {
              if (status === 200) {
                setimage(data.path);
              }
            });
          }}
        />
        <Button
          onClick={() => document.getElementById(`fileAd${ad.index}`).click()}
          className={classes.uploadBtn}
          variant="outlined"
          size="medium"
          color="secondary"
        >
          {translate.SiteInfo.uploadFile}
        </Button>
      </Grid>
      <Grid item md={3}>
        <TextField
          value={title}
          onChange={(e) => settitle(e.target.value)}
          className={classes.title}
          label={translate.SiteInfo.title}
          variant="outlined"
          size="small"
        />
      </Grid>
      <Grid
        item
        md={6}
        container
        direction="row"
        wrap="wrap"
        alignItems="center"
      >
        <Grid item lg={11}>
          <TextField
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={classes.title}
            label={translate.SiteInfo.description}
            variant="outlined"
            size="small"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function Header({ headers, setHeaders }) {
  const classes = useStyles();
  const addSlide = () => {
    setHeaders((oldSlides) => [
      ...oldSlides,
      {
        index: oldSlides[oldSlides.length - 1].index + 1,
        title: "",
        image: "",
        description: "",
      },
    ]);
  };
  const deleteSlide = (index) => {
    if (headers.length === 1) return;
    setHeaders(
      headers.filter((s) => {
        return s.index != index;
      })
    );
  };
  const updateSlide = (index, title, image, description) => {
    var oldslides = headers;
    oldslides.map((os) => {
      if (os.index === index) {
        os.title = title;
        os.image = image;
        os.description = description;
      }
    });
    setHeaders([...oldslides]);
  };
  const [selectedRow, setSelectedRow] = useState();
  const [deleteDialog, setDeleteDialog] = useState();

  return (
    <>
      <Typography variant="h4" className={classes.servicesTitle}>
        {translate.SiteInfo.headers}
      </Typography>
      <Divider />
      <hr className={classes.divder} />
      {headers.map((s, index) => {
        return (
          <HeaderItem
            key={index}
            addSlide={addSlide}
            deleteSlided={() => {
              setSelectedRow(s);
              setDeleteDialog(true);
            }}
            last={index + 1 === headers.length}
            ad={s}
            updateSlide={updateSlide}
          />
        );
      })}

      <ConfirmDialog
        open={deleteDialog}
        title={translate.blog.delete_slide}
        content={`آیا از حذف این اسلاید اطمینان دارید؟`}
        confirmHandler={() => {
          deleteSlide(selectedRow?.id);
        }}
        cancelHandler={() => setDeleteDialog(false)}
      />
    </>
  );
}
