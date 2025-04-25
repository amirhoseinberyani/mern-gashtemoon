import { Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";

export default function Paragraph({ item, changeItemStatus, RemoveItem }) {
  return (
    <Grid style={{ display: "flex", alignItems: "center", margin: "20px 0 20px 0"  }}>
      <Typography variant="body">{item.value}</Typography>
      <IconButton
        onClick={() => {
          changeItemStatus(item);
        }}
        
        style={{ borderRadius: 10, padding: 5, marginRight: 30 }}
      >
        <EditIcon style={{width:18, height:18, opacity:0.5}} color="secondary" />
      </IconButton>
      <IconButton
        onClick={() => {
          RemoveItem(item.id);
        }}
        
        style={{ borderRadius: 10, padding: 5 }}
      >
        <DeleteIcon style={{width:18, height:18, opacity:0.5}} color="secondary" />
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
