import { Box, Button, TextField } from "@mui/material";
import React from "react";
import { uid } from "uid";
import { auth, database } from "../config/firebaseMethods";
import { ref, set, update, remove } from "firebase/database";
import TodoItems from "./todoItems";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import CheckIcon from "@mui/icons-material/Check";
const Form = ({
  todoItem,
  setTodoItem,
  todoList,
  setTodoList,
  isEdit,
  setIsEdit,
  setTempUidd,
  tempUidd,
}) => {
  //add todoitem

  let addTodoDB = (todoItem, setTodoItem, setTodoList) => {
    const uidd = uid();
    const date = new Date();
    const time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    console.log(todoItem);
    if (todoItem != "" && todoItem != " ") {
      set(ref(database, `users/${auth.currentUser.uid}/${uidd}`), {
        todoItem: todoItem,
        uidd: uidd,
        time: time,
      });
    }
    // setTodoList(todoItem)
    setTodoItem("");
  };
  const handleDeleteAll = () => {
    remove(ref(database, `users/${auth.currentUser.uid}`));
  };
  const handleEditConfirm = () => {
    update(ref(database, `users/${auth.currentUser.uid}/${tempUidd}`), {
      todoItem: todoItem,
      tempUidd: tempUidd,
    });

    setTodoItem("");
    setIsEdit(false);
  };
  const onFormSubmit = (e) => {
    e.preventDefault();
    addTodoDB(todoItem, setTodoItem, setTodoList);
    // console.log(todoItem)
  };

  return (
    <>
      {/* {console.log(todoItem)} */}
      <form onSubmit={onFormSubmit}>
        <Box sx={{ display: "flex" }}>
          
            <TextField
              label="todoItem"
              onChange={(e) => {
                setTodoItem(e.target.value);
              }}
              variant="standard"
              value={todoItem}
              className="task-input"
            />
           

          {isEdit ? (
            <CheckIcon onClick={handleEditConfirm} />
          ) : (
            <Button type="submit">
              <AddIcon />
            </Button>
          )}
          <Button onClick={handleDeleteAll}>
            <i className="fa fa-trash"></i>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Form;
