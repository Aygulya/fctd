import { Routes, Route, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";

import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./components/MainLayout";


function AppWrapper() {
  const [user, setUser] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setAuthChecked(true);
      if (!firebaseUser) navigate("/");
    });

    return () => unsub();
  }, [navigate]);

  if (!authChecked) return <p>Загрузка...</p>;

  return (
    <Routes>
      {/* Публичные */}
      {!user && <Route path="/" element={<Welcome />} />}
      {!user && <Route path="/login" element={<Login />} />}
      {!user && <Route path="/register" element={<Register />} />}

      {/* Приватный доступ */}
      {user && (
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        />
      )}
    </Routes>
  );
}

export default AppWrapper;
