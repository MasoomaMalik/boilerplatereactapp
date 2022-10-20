import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Form from "./form";
import List from "./List";
import { auth, database } from "../config/firebaseMethods";
import { uid } from "uid";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, push, onValue, get } from "firebase/database";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

const TodoItems = () => {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  let userData = location.state;
  const { email, password } = userData;

  const readFromDB = (setTodoList, todoItem, navigate) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(database, `/users/${auth.currentUser.uid}`), (snapshot) => {
          setTodoList([]);
          const data = snapshot.val();
          console.log("data")
          console.log(data)
          if (data !== null) {
            Object.values(data).map((e) => {
              console.log("e")
          console.log(e)
          if(e.todoItem)
              {setTodoList((oldArray) => [...oldArray, e]);}
              // setTodoList([e]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  };

  useEffect(() => {
    readFromDB(setTodoList, email, password, todoItem, navigate);
  }, []);
const handleSignOut=(navigate)=>{
  signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
}
  return (
    <>
      {console.log(todoItem)}
      <Box sx={{margin:1, padding:2, display:'flex', flexDirection:'column', backgroundColor:'salmon'}}>
    <Typography variant= 'h4'>My TodoApp</Typography>

      <Form
        todoItem={todoItem}
        setTodoItem={setTodoItem}
        todoList={todoList}
        setTodoList={setTodoList}
        isEdit= {isEdit} 
        setIsEdit= {setIsEdit}
        tempUidd={tempUidd}
        setTempUidd={setTempUidd}
        />
      {console.log(todoList)}
      <List todoList={todoList}
        setTodoItem={setTodoItem}
        
        isEdit= {isEdit} 
        setIsEdit= {setIsEdit}
        tempUidd={tempUidd}
        setTempUidd={setTempUidd}
        />

      <Button onClick={()=>{handleSignOut( navigate)}}>Sign Out</Button>
        </Box>
    </>
  );
};

export default TodoItems;
