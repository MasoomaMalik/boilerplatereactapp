import { Box, TextField } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";

const Form = ({ todoItem, setTodoItem, todoList, setTodoList }) => {
  const onFormSubmit = (e) => {
    e.preventDefault();
    // setTodoList([...todoList, todoItem]);
     



  };
  return (
    <>
      <form onSubmit={onFormSubmit}>
        <Box>
          <TextField
            label="todoItem"
            onChange={(e) => {
              setTodoItem(e.target.value);
            //   console.log(todoItem);
            }}
            variant="standard"
          />
        </Box>

        <button className="button-add m-1" type="submit">
          {<i class="fa-solid fa-check"></i>}
        </button>

        <button className="button-delete-all task-button">
          <i className="fa fa-trash"></i>
        </button>
      </form>
    </>
  );
};

export default Form;
