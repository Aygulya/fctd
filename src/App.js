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
import { Drawer, Button } from "antd";
import { useEffect, useState } from 'react';
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
  const [visible, setVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <Layout style={{ height: "100vh" }}>
      <AppHeader onMenuClick={showDrawer} isMobile={isMobile} />
      <div style={{ display: "flex" }}>
        {/* Показываем Sidebar ТОЛЬКО на десктопе и если есть пользователь */}
        {user && !isMobile && <Sidebar />}

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

        {/* Показываем Drawer только если мобильный и пользователь есть */}
        {user && isMobile && (
          <Drawer
            title="Меню"
            placement="left"
            onClose={closeDrawer}
            open={visible}
            bodyStyle={{ padding: 0 }}
          >
            <Sidebar isMobile={true} onClose={closeDrawer} />
          </Drawer>
        )}
      </div>
    </Layout>
  );
}

export default App;
