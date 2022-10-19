import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState , useEffect} from "react";
import { signUpUser } from "../config/firebaseMethods";
import {useNavigate,Link} from 'react-router-dom';
function Signup() {
  const navigate= useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let signUp = () => {
    signUpUser({
      email,
      password,


      // userName: "Abdul Basit Ahmed",
      // contact: "31234632",
    })
      .then((success) => {
        console.log(success);
        move();
      })
      .catch((error) => {
        console.log(error);
      });
  };
let move = ()=>{
  navigate('/Login')
}
  useEffect(() => {

  }, []);
 

  return (
    <>
      <h1>Signup</h1>
      <Box>
        <Box>
          <TextField
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
            variant="standard"
          />
        </Box>
        <Box>
          <TextField
            label="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
          />
        </Box>
      </Box>
      <button onClick={signUp}>Sign Up</button>
      {/* <button onClick={    
}>navigate</button> */}
<p>Already have account?</p>
<Link to='login'>Login Here</Link>
    

    </>
  );
}
export default Signup;