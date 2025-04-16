import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import { Navigate } from "react-router-dom";
import React from "react";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Загрузка...</div>; // пока не знаем, авторизован ли

  if (!user) return <Navigate to="/" />; // не авторизован — отправить на вход

  return children; // всё ок — отрендерить страницу
};

export default ProtectedRoute;
