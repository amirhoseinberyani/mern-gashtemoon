import {
  IconButton,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Button,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { getTranslate } from "../../localization";
import ConfirmDialog from "../confirmDialog/ConfirmDialog";
import { useState } from "react";

const translate = getTranslate();

const getRole = (role) => {
  const roles = {
    2: translate.leaders.culture,
    3: translate.leaders.nature,
  };
  return roles[role] || "Key not found";
};

export default function RequestList({ comments, ActivateItem, DeleteItem }) {
  const [selectedRow, setSelectedRow] = useState();
  const [deleteDialog, setDeleteDialog] = useState();

  return (
    <>
      <TableContainer component={Grid}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">{translate.Comments.name}</TableCell>
              <TableCell align="center">{translate.requests.mobile}</TableCell>
              <TableCell align="center">
                {translate.requests.userType}
              </TableCell>
              <TableCell align="center">
                {translate.requests.nationalCode}
              </TableCell>
              <TableCell align="center">{translate.requests.reqType}</TableCell>
              <TableCell align="center">
                {translate.Comments.activeDeactive}
              </TableCell>
              <TableCell align="center">{translate.Comments.delete}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {comments?.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {item.userId.firstName + " " + item.userId.lastName}
                </TableCell>
                <TableCell align="center">{item.phoneNumber}</TableCell>
                <TableCell align="center">
                  {getRole(item.userId.role)}
                </TableCell>
                <TableCell align="center">{item.nationalCode}</TableCell>
                <TableCell align="center">
                  {item.role === 2
                    ? translate.User.culture_guide_role
                    : translate.User.nature_guide_role}
                </TableCell>
                <TableCell align="center">
                  {item.isActive ? (
                    <Typography variant="subtitle2">
                      {translate.Comments.active}
                    </Typography>
                  ) : (
                    <Button
                      onClick={() => {
                        ActivateItem(
                          item._id,
                          item.userId,
                          item.role,
                          item.type,
                          item.cardNumber,
                        );
                      }}
                      variant="text"
                      color="primary"
                    >
                      {translate.Comments.submit}
                    </Button>
                  )}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => {
                      setSelectedRow(item);
                      setDeleteDialog(true);
                    }}
                    size="small"
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <ConfirmDialog
        open={deleteDialog}
        title={translate.blog.delete_request}
        content={`آیا از حذف این درخواست اطمینان دارید؟`}
        confirmHandler={() => {
          DeleteItem(selectedRow?._id);
        }}
        cancelHandler={() => setDeleteDialog(false)}
      />
    </>
  );
}
