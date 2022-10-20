import React, { useEffect, useState } from "react";
// import { database, readFromDB } from "../config/firebaseMethods";
import {uid} from 'uid'
import {auth,database} from "../config/firebaseMethods";
import {  ref, set, remove, update  } from "firebase/database";
const List = ({ todoList , setTodoItem,isEdit,setIsEdit,setTempUidd,tempUidd }) => {
// console.log(setIsEdit)
  const handleUpdate = (e,setIsEdit,setTodoItem,setTempUidd) => {
    setIsEdit(true);
    setTodoItem(e.todoItem);
    setTempUidd(e.uidd);
  };

 
  const handleDelete = (e) => {
    remove(ref(database, `users/${auth.currentUser.uid}/${e}`));
  };
  
  useEffect(() => {
    

  }, [todoList]);

  return (
    <>
    {/* {console.log(showTime)} */}
      {console.log(" todolist in list.js")}
{console.log(todoList)}
      {/* {console.log("listDB")}
{console.log(listDb)} */}

      {todoList.map((e, i) => (
            <div className="d-flex li-div">
              <li key={e.ID} 
              className="todo-list"
              >
                <input
                  type="text"
                  value={e.todoItem}
                  onChange={(event) => event.preventDefault()}
                />
                <button
                    onClick={() =>{ handleUpdate(e,setIsEdit,setTodoItem,setTempUidd)}}
                >
                  <i className="fa fa-edit"></i>
                </button>
                <button
                 onClick={()=>{handleDelete(e.uidd)}}>
                  <i className="fa fa-trash"></i>
                </button>
                <button
                 >
                  {e.time}
                </button>
              </li>
            </div>
          ))
       }
    </>
  );
};

export default List;
