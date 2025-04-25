import { Grid, IconButton, Typography } from "@material-ui/core";
import React from "react";
import { getTranslate } from "../../localization";

export default function EditorToolbar({ setInprogress }) {
  const translate = getTranslate();
  const toolbarItems = [
    // {
    //   id: 1,
    //   title: translate.editor.title,
    //   value: "Title",
    // },
    {
      id: 2,
      title: translate.editor.paragraph,
      value: "Paragraph",
    },
    // {
    //   id: 3,
    //   title: translate.editor.image,
    //   value: "Image",
    // },
    {
      id: 4,
      title: translate.editor.audio,
      value: "Audio",
    },
    {
      id: 5,
      title: translate.editor.video,
      value: "Video",
    },
    // {
    //   id: 6,
    //   title: translate.editor.quote,
    //   value: "Quote",
    // },
    // {
    //   id: 7,
    //   title: translate.editor.seoarator,
    //   value: "Seperator",
    // },
  ];
  return (
    <Grid
      style={{
        position: "absolute",
        top: 0,
        width: "100%",
      }}
    >
      {toolbarItems?.map((item) => (
        <IconButton
          style={{
            borderRadius: 4,
            padding: "0px 15px 0 15px",
            margin: "0px 10px 0 10px",
          }}
          onClick={() => setInprogress(item.value)}
        >
          <Typography style={{ fontWeight: "bold" }}>{item.title}</Typography>
        </IconButton>
      ))}
      <hr />
    </Grid>
  );
}
