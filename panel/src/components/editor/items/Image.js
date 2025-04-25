import {
  Box,
  Grid,
  IconButton,
  TextField,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import { getTranslate } from "../../../localization";
import ClearIcon from "@material-ui/icons/Clear";
import uploadPlaceHoclder from "../../../assets/images/upload.png";
import { API, base_api } from "../../../constants/api";
import { FetchContext } from "../../../contexts/FetchContext";

export default function Image({
  setInprogress,
  addItem,
  item,
  cancelChangeItemStatus,
  saveChangeItemStatus,
  state,
}) {
  const [value, setValue] = useState({
    cover: "",
    caption: "",
  });
  const body = [
    {
      title: "location",
      value: 'content',
    },
  ];
  let { fetchUpload } = useContext(FetchContext);
  const translate = getTranslate();
  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0 20px 0",
      }}
    >
      {/* <Button
        onClick={() => document.getElementById(`attractionfileAd`).click()}
        variant="outlined"
        size="medium"
        color="secondary"
      >
        {translate.SiteInfo.uploadFile}
      </Button> */}
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img alt=""
          onClick={() => document.getElementById(`editorimageAd`).click()}
          // src={value.cover !== "" ? base_api + value.cover + "_md.png" : uploadPlaceHoclder}
          src={value.cover !== "" ? base_api + value.cover + "_org.png" : uploadPlaceHoclder}
          width={400}
          height={400}
        />
        <Box mb={10} />
        <TextField
          value={value.caption}
          onChange={(e) => setValue({ ...value, caption: e.target.value })}
          label={translate.editor.caption}
          placeholder="Enter The Caption"
          variant="outlined"
          size="small"
        />
      </Grid>
      <input
        type="file"
        id={`editorimageAd`}
        style={{ display: "none" }}
        onChange={(e) => {
          fetchUpload(
            API.Upload.UploadPost,
            "post",
            e.target.files[0],
            body
          ).then(
            ({ status, data }) => {
              if (status === 200) {
                setValue({ ...value, cover: data.path });
              }
            }
          );
        }}
      />
      <IconButton
        onClick={() => {
          setInprogress("");
          cancelChangeItemStatus({ id: item.id });
        }}
        style={{ borderRadius: 2, padding: 7, marginLeft: 30 }}
      >
        <ClearIcon color="primary" />
      </IconButton>
      <IconButton
        onClick={() => {
          state === "revise"
            ? saveChangeItemStatus({
              id: item.id,
              type: item.type,
              value: value,
              mode: "view",
            })
            : addItem("Image", value, "view");
          setInprogress("");
        }}
        style={{ borderRadius: 2, padding: 7, marginLeft: 30 }}
      >
        <CheckIcon color="primary" />
      </IconButton>
    </Grid>
  );
}
