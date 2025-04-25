import { Grid, IconButton } from "@material-ui/core";
import React from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import seprator from "../../../assets/vector/seperator.svg";
import SubdirectoryArrowLeftIcon from "@material-ui/icons/SubdirectoryArrowLeft";

export default function Seperator({ item, changeItemStatus, RemoveItem  }) {
  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0 20px 0",
      }}
    >
        <img src={seprator} alt="seprator" width={"30%"} />
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
