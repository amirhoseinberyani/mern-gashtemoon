import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";

export default function Video({ item, changeItemStatus, RemoveItem }) {
  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "50px 0 50px 0",
      }}
    >

      <iframe title='video' src={item?.value?.videoFile} allowFullScreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
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
          // RemoveItem(item.id);
        }}
        style={{ borderRadius: 10, padding: 5 }}
      >
        <SubdirectoryArrowLeftIcon
          style={{ width: 18, height: 18, opacity: 0.5, rotate: "90deg" }}
          color="secondary"
        />
      </IconButton>
    </Grid>
  );
}
