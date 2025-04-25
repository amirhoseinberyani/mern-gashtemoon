/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import {
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Switch,
} from "@material-ui/core";
import { TableContainer, Table } from "@material-ui/core";
import { IconButton, TableHead } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { API } from "../../constants/api";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import { FetchContext } from "../../contexts/FetchContext";
import { Link } from "react-router-dom";
import { getTranslate, lang } from "../../localization";
import ConfirmDialog from "../../components/confirmDialog/ConfirmDialog";

const basePath = lang === "en" ? "/en" : "";
const translate = getTranslate();

export default function UsersList() {
  let { fetchDelete, fetchPost, fetchGet } = useContext(FetchContext);
  const [data, setData] = useState([]);
  const [reload, setReload] = useState(false);

  const handleChange = (event, userId, cardNumber) => {
    fetchPost(API.User.ChangeRole, {
      userId: userId,
      cardNumber: cardNumber,
      role: event.target.value,
    }).then(({ status, data }) => {
      if (status === 200) {
        setReload(!reload);
      }
    });
  };

  useEffect(() => {
    getAllUsers();
  }, [reload]);

  const getAllUsers = () => {
    fetchGet(API.User.UsersList).then(({ status, data }) => {
      if (status === 200) {
        setData(data.lists);
      }
    });
  };

  const changeUserActivity = (userId, isActive) => {
    fetchPost(API.User.ToggleActivity, {
      userId,
      isActive,
    }).then(({ status, data }) => {
      if (status === 200) {
        setReload(!reload);
      }
    });
  };

  const DeleteUser = (_id) => {
    fetchDelete(API.User.DeleteUser + "?id=" + _id).then(({ status, data }) => {
      if (status === 200) {
        setDeleteDialog(false);
        getAllUsers();
      }
    });
  };
  const [selectedRow, setSelectedRow] = useState();
  const [deleteDialog, setDeleteDialog] = useState();
  return (
    <>
      <TableContainer component={Grid}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">#</TableCell>
              <TableCell align="center">{translate.User.name}</TableCell>
              <TableCell align="center">
                {translate.User.active_inactive}
              </TableCell>
              <TableCell align="center">{translate.User.role}</TableCell>
              <TableCell align="center">{translate.blog.edit}</TableCell>
              <TableCell align="center">{translate.blog.delete}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((item, index) => (
              <TableRow key={item._id}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">
                  {item.firstName + " " + item.lastName}
                </TableCell>
                <TableCell align="center">
                  <Switch
                    checked={item.isActive}
                    onChange={() => changeUserActivity(item._id, item.isActive)}
                  />
                </TableCell>
                <TableCell align="center">
                  <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                      value={item.role}
                      onChange={(event) => handleChange(event, item._id, item.cardNumber)}
                    >
                      <MenuItem value={0}>{translate.User.admin_role}</MenuItem>
                      <MenuItem value={2}>
                        {translate.User.culture_guide_role}
                      </MenuItem>
                      <MenuItem value={3}>
                        {translate.User.nature_guide_role}
                      </MenuItem>
                      <MenuItem value={1}>{translate.User.user_role}</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    component={Link}
                    to={`${basePath}/users/add-edit/${item._id}`}
                    size="small"
                  >
                    <EditIcon color="primary" />
                  </IconButton>
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
        title={translate.User.delete_user}
        content={`آیا از حذف کاربر ${selectedRow?.firstName + " " + selectedRow?.lastName
          } اطمینان دارید؟`}
        confirmHandler={() => {
          DeleteUser(selectedRow?._id);
        }}
        cancelHandler={() => setDeleteDialog(false)}
      />
    </>
  );
}
