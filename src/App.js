// import { Routes, Route } from "react-router-dom";
// import Page from "./pages/Page";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Home from "./pages/Home";
// import ProtectedRoute from "./components/ProtectedRoute";
// import { Layout } from "antd";
// import AppHeader from "./Header";
// import Sidebar from "./components/Sidebar";
// function App() {
//   return (
//     <>
// <Layout style={{ height: "100vh" }}>
// <AppHeader />
// <div style={{ display: "flex" }}>
// user ? <Sidebar />
    
//     <div style={{ flex: 1, padding: 24 }}>
//     <Routes>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
      
//       <Route
//         path="/"
//         element={
//           <ProtectedRoute>
//             <Home />
//           </ProtectedRoute>
//         }
//       />
//       <Route
//         path="/page/:id"
//         element={
//           <ProtectedRoute>
//             <Page />
//           </ProtectedRoute>
//         }
//       />
//     </Routes>
//     </div>
//           </div>
//         </Layout>
//         </>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";
import Page from "./pages/Page";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import { Layout } from "antd";
import AppHeader from "./Header";
import Sidebar from "./components/Sidebar";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Welcome from "./pages/Welcome";

function App() {
  const [user, loading] = useAuthState(auth);

  if (loading) return <div>Загрузка...</div>; // показываем загрузку, пока не знаем, авторизован ли

  return (
    <Layout style={{ height: "100vh" }}>
      <AppHeader />
      <div style={{ display: "flex" }}>
        {user && <Sidebar />} {/* Показываем только если есть пользователь */}

        <div style={{ flex: 1, padding: 24 }}>
          <Routes>
          <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
<Welcome />

                </ProtectedRoute>
              }
            />
            <Route
              path="/page/:id"
              element={
                <ProtectedRoute>
                  <Page />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </Layout>
  );
}

export default App;
