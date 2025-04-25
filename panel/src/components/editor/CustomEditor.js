/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import EditorToolbar from "./EditorToolbar";
import EditorContent from "./EditorContent";
import ViewTitle from "./tempOutput/Title";
import EditTitle from "./items/Title";
import ViewParagraph from "./tempOutput/Paragraph";
import EditParagraph from "./items/Paragraph";
import ViewImage from "./tempOutput/Image";
import EditImage from "./items/Image";
import ViewSeperator from "./tempOutput/Seperator";
import EditSeperator from "./items/Seperator";
import ViewQuote from "./tempOutput/Quote";
import EditQuote from "./items/Quote";
import ViewAudio from "./tempOutput/Audio";
import EditAudio from "./items/Audio";
import ViewVideo from "./tempOutput/Video";
import EditVideo from "./items/Video";

export default function CustomEditor({ value, setValue }) {
  const [inprogress, setInprogress] = useState("");
  const [editorValue, setEditorValue] = useState([]);

  const addItem = (type, value, mode) => {
    let tempValue = {
      id: editorValue.length,
      type,
      value,
      mode,
    };
    setEditorValue([...editorValue, tempValue]);
    setValue([...editorValue, tempValue]);
  };

  const changeItemStatus = (Item) => {
    var tempValue = editorValue;
    tempValue.forEach((item) => {
      if (Item.id === item.id) {
        item.mode = "edit";
      }
    });
    setEditorValue([...tempValue]);
    setValue([...tempValue]);
  };

  const saveChangeItemStatus = ({ id, type, value, mode }) => {
    let tempValue = editorValue;
    tempValue.forEach((item) => {
      if (id === item.id) {
        item.mode = "view";
        item.type = type;
        item.value = value;
        item.mode = mode;
      }
    });
    setEditorValue([...tempValue]);
    setValue([...tempValue]);
  };

  const RemoveItem = (id) => {
    let tempValue = editorValue;
    let filteredValue = tempValue.filter((item) => {
      return item.id !== id;
    });
    setEditorValue([...filteredValue]);
    setValue([...filteredValue]);
  };

  const cancelChangeItemStatus = ({ id, type, value, mode }) => {
    let tempValue = editorValue;
    tempValue.forEach((item) => {
      if (id === item.id) {
        item.mode = "view";
      }
    });
    setEditorValue([...tempValue]);
    setValue([...tempValue]);
  };

  useEffect(() => {
    if (value) {
      setEditorValue(value);
    }
    console.log("editorValue", editorValue);
  }, [editorValue]);

  return (
    <Grid
      style={{
        position: "relative",
        width: "100%",
        display: "grid",
      }}
    >
      <EditorToolbar setInprogress={setInprogress} />
      <Box pt={15} />
      <Grid
        style={{
          maxHeight: "500px",
          marginTop: 30,
          overflowY: "scroll",
        }}
      >
        {editorValue &&
          editorValue.length > 0 &&
          editorValue.map((item, index) => {
            if (item.type === "Title") {
              if (item.mode === "edit") {
                return (
                  <EditTitle
                    key={index}
                    item={item}
                    changeItemStatus={changeItemStatus}
                    defaultValue={item.value}
                    cancelChangeItemStatus={cancelChangeItemStatus}
                    addItem={addItem}
                    state="revise"
                    saveChangeItemStatus={saveChangeItemStatus}
                    setInprogress={setInprogress}
                  />
                );
              } else {
                return (
                  <ViewTitle
                    key={index}
                    item={item}
                    RemoveItem={RemoveItem}
                    changeItemStatus={changeItemStatus}
                  />
                );
              }
            } else if (item.type === "Paragraph") {
              if (item.mode === "edit") {
                return (
                  <EditParagraph
                    key={index}
                    item={item}
                    changeItemStatus={changeItemStatus}
                    defaultValue={item.value}
                    addItem={addItem}
                    state="revise"
                    cancelChangeItemStatus={cancelChangeItemStatus}
                    saveChangeItemStatus={saveChangeItemStatus}
                    setInprogress={setInprogress}
                  />
                );
              } else {
                return (
                  <ViewParagraph
                    key={index}
                    item={item}
                    RemoveItem={RemoveItem}
                    changeItemStatus={changeItemStatus}
                  />
                );
              }
            } else if (item.type === "Image") {
              if (item.mode === "edit") {
                return (
                  <EditImage
                    key={index}
                    item={item}
                    changeItemStatus={changeItemStatus}
                    defaultValue={item.value}
                    addItem={addItem}
                    state="revise"
                    cancelChangeItemStatus={cancelChangeItemStatus}
                    saveChangeItemStatus={saveChangeItemStatus}
                    setInprogress={setInprogress}
                  />
                );
              } else {
                return (
                  <ViewImage
                    key={index}
                    item={item}
                    RemoveItem={RemoveItem}
                    changeItemStatus={changeItemStatus}
                  />
                );
              }
            } else if (item.type === "Seperator") {
              if (item.mode === "edit") {
                return (
                  <EditSeperator
                    key={index}
                    item={item}
                    changeItemStatus={changeItemStatus}
                    defaultValue={item.value}
                    addItem={addItem}
                    state="revise"
                    cancelChangeItemStatus={cancelChangeItemStatus}
                    saveChangeItemStatus={saveChangeItemStatus}
                    setInprogress={setInprogress}
                  />
                );
              } else {
                return (
                  <ViewSeperator
                    key={index}
                    item={item}
                    RemoveItem={RemoveItem}
                    changeItemStatus={changeItemStatus}
                  />
                );
              }
            } else if (item.type === "Quote") {
              if (item.mode === "edit") {
                return (
                  <EditQuote
                    key={index}
                    item={item}
                    changeItemStatus={changeItemStatus}
                    defaultValue={item.value}
                    addItem={addItem}
                    state="revise"
                    cancelChangeItemStatus={cancelChangeItemStatus}
                    saveChangeItemStatus={saveChangeItemStatus}
                    setInprogress={setInprogress}
                  />
                );
              } else {
                return (
                  <ViewQuote
                    key={index}
                    item={item}
                    RemoveItem={RemoveItem}
                    changeItemStatus={changeItemStatus}
                  />
                );
              }
            } else if (item.type === "Audio") {
              if (item.mode === "edit") {
                return (
                  <EditAudio
                    key={index}
                    item={item}
                    changeItemStatus={changeItemStatus}
                    defaultValue={item.value}
                    addItem={addItem}
                    state="revise"
                    cancelChangeItemStatus={cancelChangeItemStatus}
                    saveChangeItemStatus={saveChangeItemStatus}
                    setInprogress={setInprogress}
                  />
                );
              } else {
                return (
                  <ViewAudio
                    key={index}
                    item={item}
                    RemoveItem={RemoveItem}
                    changeItemStatus={changeItemStatus}
                  />
                );
              }
            } else if (item.type === "Video") {
              if (item.mode === "edit") {
                return (
                  <EditVideo
                    key={index}
                    item={item}
                    changeItemStatus={changeItemStatus}
                    defaultValue={item.value}
                    addItem={addItem}
                    state="revise"
                    cancelChangeItemStatus={cancelChangeItemStatus}
                    saveChangeItemStatus={saveChangeItemStatus}
                    setInprogress={setInprogress}
                  />
                );
              } else {
                return (
                  <ViewVideo
                    key={index}
                    item={item}
                    RemoveItem={RemoveItem}
                    changeItemStatus={changeItemStatus}
                  />
                );
              }
            } else {
              return null;
            }
          })}
      </Grid>
      <Box pt={10} />
      <EditorContent
        inprogress={inprogress}
        setInprogress={setInprogress}
        addItem={addItem}
      />
    </Grid>
  );
}
