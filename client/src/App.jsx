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
import Ranking from "./pages/Ranking";
import Messages from "./pages/Messages";
import CreateQuiz from "./pages/CreateQuiz";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";

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
          <Route path="/apps/quiz-app-new/ranking" element={<Ranking />} />
          <Route path="/apps/quiz-app-new/messages" element={<Messages />} />
          <Route
            path="/apps/quiz-app-new/create-quiz"
            element={<CreateQuiz />}
          />
          <Route
            path="/apps/quiz-app-new/notifications"
            element={<Notifications />}
          />
          <Route path="/apps/quiz-app-new/settings" element={<Settings />} />
        </Route>
      </Routes>
      <NavbarBottom />
    </BrowserRouter>
  );
}
