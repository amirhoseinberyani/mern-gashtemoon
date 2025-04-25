import DialogActions from "@material-ui/core/DialogActions";
import React from "react";
import { getTranslate } from "../../localization";
import { Button, Dialog, DialogContent, DialogTitle } from "@material-ui/core";

export default function ConfirmDialog({
  title,
  content,
  cancelHandler,
  confirmHandler,
  open,
}) {
  const translate = getTranslate();

  return (
    <>
      <Dialog
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
        maxWidth="xs"
        open={open}
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>{content}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={cancelHandler}>
            {translate.blog.no}
          </Button>
          <Button onClick={confirmHandler}>{translate.blog.yes}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
