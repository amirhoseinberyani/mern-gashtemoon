import {
  Box,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import React, { useContext, useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import addAudioFile from "../../../assets/icons/add-audio-file.svg";
import { FetchContext } from "../../../contexts/FetchContext";
import { base_api } from "../../../constants/api";

export default function Audio({
  setInprogress,
  addItem,
  item,
  defaultValue,
  saveChangeItemStatus,
  cancelChangeItemStatus,
  state,
}) {
  const [value, setValue] = useState({
    audioFile: "",
    caption: "",
  });
  return (
    <Grid
      style={{ display: "flex", alignItems: "center", margin: "20px 0 20px 0" }}
    >
      <input
        value={value.audioFile}
        onChange={(e) => {
          setValue({ ...value, audioFile: e.target.value })
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
            : addItem("Audio", value, "view");
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
