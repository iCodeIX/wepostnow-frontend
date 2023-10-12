import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "./Signup";
import Main from "./Main";
import Profile from "./Profile";
import Message from "./Message";
import PageNotFound from "./PageNotFound";
import Convo from "./Convo";
import ForgotPassword from "./ForgotPassword";
import ResetPassword from "./ResetPassword";
import "./styles/App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/main' element={<Main />}></Route>
        <Route path='/profile/:id' element={<Profile />}></Route>
        <Route path="/message" element={<Message />}></Route>
        <Route path="/convo/:convo_id" element={<Convo />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/reset-password/:id/:token" element={<ResetPassword />}></Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div >
  );
}

export default App;
