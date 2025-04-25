import { Grid, IconButton, TextField } from "@material-ui/core";
import React, { useState } from "react";
import CheckIcon from "@material-ui/icons/Check";
import { getTranslate } from "../../../localization";
import ClearIcon from "@material-ui/icons/Clear";
import CustomTinyMceEditor from "../CustomTinyMceEditor";

export default function Paragraph({
  setInprogress,
  addItem,
  item,
  defaultValue,
  cancelChangeItemStatus,
  saveChangeItemStatus,
  state,
}) {
  const [title, setTitle] = useState(defaultValue);
  const translate = getTranslate();
  return (
    <Grid
      style={{ alignItems: "center", margin: "20px 0 20px 0" }}
    >
      {/* <TextField
        value={title}
        multiline
        maxRows={20}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
        label={translate.editor.title}
        placeholder="Enter The Title"
        variant="outlined"
        size="small"
      /> */}

      <CustomTinyMceEditor value={title} setValue={setTitle}
        onChange={(e) => setTitle(e.target.value)}
      // onUploadImage={}
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
            : addItem("Paragraph", title, "view");
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
