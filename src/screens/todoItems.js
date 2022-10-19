import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {   readFromDB } from "../config/firebaseMethods";
import Form from "./form";
import List from "./List";
import app from "../config/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set, push, onValue, get } from "firebase/database";
//  import Form from

const auth = getAuth(app);
const database = getDatabase(app);

const TodoItems = () => {
  const [todoItem, setTodoItem] = useState("");
  const [todoList, setTodoList] = useState([]);

  const location = useLocation();
  let userData = location.state;
  const { email, password } = userData;

  let addTodoDB = (email,password) => {
 
  
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          const postListRef = ref(database, `users/${user.uid}/newtodoList`);
  
          const newPostRef = push(postListRef);
          // console.log(newPostRef);
         if(todoItem!="")
{          set(newPostRef, todoItem);
resolve("todo added")

}
        })
  
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage);
          reject(errorMessage);
        });
    });
  };
  function readFromDB (setTodoList,email, password, todoItem) {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const postListRef = ref(database, `users/${user.uid}/newtodoList`);
        onValue(postListRef, (snapshot) => {
          let todoFromDB = snapshot.val();
  
          // console.log(todoFromDB);
          setTodoList( todoFromDB);
        });
      })
  
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // reject(errorMessage);
      });
  };
  useEffect(() => {
    addTodoDB(email,password);
    
    readFromDB(setTodoList,email, password, todoItem);


    // setTodoList(todoList)
    // {console.log("todoList")}
    // {console.log(todoList)}
  }, [todoList]);

  return (
    <>
      <Form
        todoItem={todoItem}
        setTodoItem={setTodoItem}
        todoList={todoList}
        setTodoList={setTodoList}
      />
{/* {console.log(todoList)} */}
      <List todoList={todoList} />

      <h1>todotiem</h1>
    </>
  );
};

export default TodoItems;
