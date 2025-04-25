import React from "react";
import { Grid, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { base_api } from "../../../constants/api";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";

export default function Audio({ item, changeItemStatus, RemoveItem }) {
  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px 0 50px 0",
      }}
    >
      <iframe title="audio" src={item.value.audioFile} frameborder="0" width="100%" height="500" />
      <IconButton
        onClick={() => {
          changeItemStatus(item);
        }}
        style={{ borderRadius: 10, padding: 5, marginRight: 30 }}
      >
        <EditIcon
          style={{ width: 18, height: 18, opacity: 0.5 }}
          color="secondary"
        />
      </IconButton>
      <IconButton
        onClick={() => {
          RemoveItem(item.id);
        }}
        style={{ borderRadius: 10, padding: 5 }}
      >
        <DeleteIcon
          style={{ width: 18, height: 18, opacity: 0.5 }}
          color="secondary"
        />
      </IconButton>
      <IconButton
        onClick={() => {
          RemoveItem(item.id);
        }}
        style={{ borderRadius: 10, padding: 5 }}
      >
        <SubdirectoryArrowLeftIcon
          style={{ width: 18, height: 18, opacity: 0.5 }}
          color="secondary"
        />
      </IconButton>
    </Grid>
  );
}
