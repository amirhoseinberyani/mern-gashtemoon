import {
  Box,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import addVideoFile from "../../../assets/icons/add-video-file.svg";
import { base_api } from "../../../constants/api";
import { FetchContext } from "../../../contexts/FetchContext";

export default function Video({
  setInprogress,
  addItem,
  item,
  defaultValue,
  saveChangeItemStatus,
  cancelChangeItemStatus,
  state,
}) {
  const [value, setValue] = useState({
    videoFile: "",
    caption: "",
  });
  return (
    <Grid
      style={{ display: "flex", alignItems: "center", margin: "20px 0 20px 0" }}
    >
      <input
        value={value.videoFile}
        onChange={(e) => {
          setValue({ ...value, videoFile: e.target.value });
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
            : addItem("Video", value, "view");
          //   saveChangeItemStatus() && saveChangeItemStatus();
          setInprogress("");
        }}
        style={{ borderRadius: 2, padding: 7, marginLeft: 30 }}
      >
        <CheckIcon color="primary" />
      </IconButton>
    </Grid>
  );
}
