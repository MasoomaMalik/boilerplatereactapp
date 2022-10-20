import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useState, useEffect } from "react";
import { signUpUser } from "../config/firebaseMethods";
import { useNavigate, Link } from "react-router-dom";

import CircularProgress from "@mui/material/CircularProgress";

function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoader] = useState(false);

  let signUp = () => {
    setLoader(true);
    signUpUser({
      email,
      password,

      // userName: "Abdul Basit Ahmed",
      // contact: "31234632",
    })
      .then((success) => {
        console.log(success);
        setLoader(false);
      })
      .catch((error) => {
        console.log(error);

        setLoader(false);
      });
  };

  return (
    <>
      <h1>Signup</h1>
      <Box
        sx={{
          alignItems: "center",
          backgroundColor: "salmon",
          margin: 1,
          padding: 1,
          border: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
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
        <Button
          sx={{ width: 20, margin: 1, height: 35 }}
          variant="contained"
          disabled={isLoading}
          onClick={signUp}
        >
          {isLoading ? <CircularProgress /> : <p>SignUp</p>}
        </Button>
        {/* <button onClick={    
}>navigate</button> */}
        <p>Already have account?</p>
        <Link to="login">Login Here</Link>
      </Box>
    </>
  );
}
export default Signup;
