import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import pages
import Home from "./pages/Home";
import Start from "./pages/Start";
import StartGame from "./pages/StartGame";
import Profile from "./pages/Profile";
//import components
import Header from "./components/Header";
import NavbarBottom from "./components/NavbarBottom";
import PrivateRoute from "./components/PrivateRoute";
import Ranking from "./pages/Ranking";
import Messages from "./pages/Messages";
import CreateQuiz from "./pages/CreateQuiz";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import QuizPage from "./pages/QuizPage";
import CategoryPage from "./pages/CategoryPage";

export default function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <Header />
      <ToastContainer
        className={"z-100"}
        autoClose={3000}
        stacked
        draggablePercent={60}
        position="top-right"
      />
      <Routes>
        <Route path="/*" element={<Start />} />
        <Route path="/apps/quiz-app-new/start" element={<Start />} />
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
          <Route path="/quiz/:quizSlug" element={<QuizPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
        </Route>
      </Routes>
      {currentUser ? <NavbarBottom /> : <div />}
    </BrowserRouter>
  );
}
