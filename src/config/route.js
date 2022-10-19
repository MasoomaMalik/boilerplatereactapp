import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "../screens/home";
import Login from "../screens/login";
import Signup from "../screens/signup";
import TodoItems from "../screens/todoItems";
function AppRouter() {
  return (
    <>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="login" element={<Login />} />
          <Route path="/" element={<Signup />} />
          <Route path="todoItems" element={<TodoItems />} />
        </Routes>
      </Router>
    </>
  );
}
export default AppRouter;