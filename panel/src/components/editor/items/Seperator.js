/* eslint-disable no-unused-vars */
import { Grid, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import seprator from "../../../assets/vector/seperator.svg";

export default function Seperator({
  setInprogress,
  addItem,
  item,
  defaultValue,
  saveChangeItemStatus,
  cancelChangeItemStatus,
  state,
}) {
  const [title, setTitle] = useState(defaultValue);
  return (
    <Grid
      style={{ display: "flex",justifyContent:'center', alignItems: "center", margin: "20px 0 20px 0" }}
    >
      <img src={seprator} alt="seprator" width={"30%"} />
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
                value: title,
                mode: "view",
              })
            : addItem("Seperator", title, "view");
          setInprogress("");
        }}
        style={{ borderRadius: 2, padding: 7, marginLeft: 30 }}
      >
        <CheckIcon color="primary" />
      </IconButton>
    </Grid>
  );
}
