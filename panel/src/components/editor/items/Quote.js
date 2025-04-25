import { Grid, IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import { getTranslate } from "../../../localization";
import ClearIcon from "@material-ui/icons/Clear";

export default function Quote({
  setInprogress,
  addItem,
  item,
  defaultValue,
  saveChangeItemStatus,
  cancelChangeItemStatus,
  state,
}) {
  const [title, setTitle] = useState(defaultValue);
  const translate = getTranslate()
  return (
    <Grid
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "20px 0 20px 0",
      }}
    >
      <TextField
        value={title}
        multiline
        maxRows={20}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label={translate.editor.title}
        placeholder="Enter The Title"
        variant="outlined"
        size="small"
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
                value: title,
                mode: "view",
              })
            : addItem("Quote", title, "view");
          setInprogress("");
        }}
        style={{ borderRadius: 2, padding: 7, marginLeft: 30 }}
      >
        <CheckIcon color="primary" />
      </IconButton>
    </Grid>
  );
}
