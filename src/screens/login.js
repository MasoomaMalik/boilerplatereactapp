import { Box, Button, CircularProgress, TextField } from "@mui/material";
import { useState, useEffect } from "react";
import { loginUser } from "../config/firebaseMethods";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setLoader] = useState(false);

  const navigate = useNavigate();
  let login = () => {
    setLoader(true);

    loginUser({
      email,
      password,
    })
      .then((success) => {
        // console.log(success);
        navigate("/TodoItems", { state: { email: email, password: password } });
        setLoader(false);
      })
      .catch((err) => {
        setLoader(false);

        console.log(err);
      });
  };

  let movetoTodo = () => {
    navigate("/TodoItems", {
      state: { email: "a@abc.com", password: "azazazaz" },
    });
  };
  return (
    <>
      <h1>Login</h1>
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
            <Button
              variant="contained"
              disabled={isLoading}
              onClick={login}
              sx={{ width: 20, margin: 1, height: 35 }}
            >
              {isLoading ? <CircularProgress /> : <p>Login</p>}
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
export default Login;
