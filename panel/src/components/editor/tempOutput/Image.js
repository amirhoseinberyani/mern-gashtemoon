import { Box, Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { base_api } from "../../../constants/api";
import uploadPlaceHoclder from "../../../assets/images/upload.png";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";

export default function Image({ item, changeItemStatus, RemoveItem }) {
  return (
    <Grid
      style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "50px 0 50px 0" }}
    >
      <Grid
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <img alt=""
          src={
            // item.value.cover !== "" ? base_api + item.value.cover + "_md.png" : uploadPlaceHoclder
            item.value.cover !== "" ? base_api + item.value.cover + "_org.png" : uploadPlaceHoclder
          }
          width={400}
          height={400}
        />
        <Box mt={3}>
          <Typography variant="caption">{item.value.caption}</Typography>
        </Box>
      </Grid>
      <IconButton
        onClick={() => {
          changeItemStatus(item);
        }}
        style={{ borderRadius: 10, padding: 5, marginLeft: 30 }}
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
