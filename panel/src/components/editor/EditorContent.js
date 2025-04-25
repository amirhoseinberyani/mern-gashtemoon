import { Grid, Typography } from "@material-ui/core";
import React from "react";
import Paragraph from "./items/Paragraph";
import Title from "./items/Title";
import Image from "./items/Image";
import Seperator from "./items/Seperator";
import Quote from "./items/Quote";
import Audio from "./items/Audio";
import Video from "./items/Video";

export default function EditorContent({ inprogress, setInprogress, addItem }) {
  return (
    <Grid>
      {inprogress === "Title" ? (
        <Title setInprogress={setInprogress} addItem={addItem} />
      ) : inprogress === "Paragraph" ? (
        <Paragraph setInprogress={setInprogress} addItem={addItem} />
      ) : inprogress === "Image" ? (
        <Image setInprogress={setInprogress} addItem={addItem} />
      ) : inprogress === "Seperator" ? (
        <Seperator setInprogress={setInprogress} addItem={addItem} />
      ) : inprogress === "Quote" ? (
        <Quote setInprogress={setInprogress} addItem={addItem} />
      ) : inprogress === "Audio" ? (
        <Audio setInprogress={setInprogress} addItem={addItem} />
      ) : inprogress === "Video" ? (
        <Video setInprogress={setInprogress} addItem={addItem} />
      ) : (
        <Typography />
      )}
    </Grid>
  );
}
