import { Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";

export default function Quote({ item, changeItemStatus, RemoveItem  }) {
  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "100px auto 100px auto",
      }}
    >
      <Grid
        style={{
          width: "60%",
          padding: 20,
          backgroundColor: "#8585851a",
          borderRight: "5px solid #858585",
        }}
      >
        <Typography variant="body">{item.value}</Typography>
      </Grid>
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
      </IconButton><IconButton
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
