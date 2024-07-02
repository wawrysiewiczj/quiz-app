import { BrowserRouter, Routes, Route } from "react-router-dom";
//import pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Start from "./pages/Start";
import SignUp from "./pages/SignUp";
import StartGame from "./pages/StartGame";
import Profile from "./pages/Profile";
//import components
import Header from "./components/Header";
import NavbarBottom from "./components/NavbarBottom";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/apps/quiz-app-new/start" element={<Start />} />
        <Route path="/apps/quiz-app-new/login" element={<Login />} />
        <Route path="/apps/quiz-app-new/sign-up" element={<SignUp />} />
        <Route element={<PrivateRoute />}>
          <Route path="/apps/quiz-app-new/" element={<Home />} />
          <Route path="/apps/quiz-app-new/profile" element={<Profile />} />
          <Route path="/apps/quiz-app-new/start-game" element={<StartGame />} />
        </Route>
      </Routes>
      <NavbarBottom />
    </BrowserRouter>
  );
}
