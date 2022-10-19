import { Box, Button, TextField } from "@mui/material";
import { useState ,useEffect} from "react";
import { loginUser } from "../config/firebaseMethods";
import {useNavigate} from 'react-router-dom'
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate();
  let login = () => {
    loginUser({
      email,
      password,
    })
      .then((success) => {
        // console.log(success);
        navigate('/TodoItems',{state:{email:email,password:password}})

      })
      .catch((err) => {
        console.log(err);
      });
  };
  let movetoTodo = ()=>{
    navigate('/TodoItems',{state:{email:'a@abc.com',password:"azazazaz"}})

  }
  return (
    <>
      <h1>Login</h1>
      <Box>
        <Box>
          <TextField
            label="Email"
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Box>
        <Box>
          <TextField
            label="Password"
            type="password"
            variant="standard"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Box>
        <Box>
          <Button onClick={login} variant="contained">
            Login
          </Button>
          <Button onClick={  movetoTodo   

} variant="contained">
            move to todoItem
          </Button>
        </Box>
      </Box>
    </>
  );
}
export default Login;