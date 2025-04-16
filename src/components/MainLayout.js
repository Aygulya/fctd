import { Routes, Route } from "react-router-dom";
import { Layout } from "antd";
import Sidebar from "./Sidebar";
import AppHeader from "../Header";
import Page from "../pages/Page";

const MainLayout = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      <AppHeader />
      <Layout>
        <Sidebar />
        <Layout.Content style={{ padding: 24 }}>
          <Routes>
            <Route path="/page/:id" element={<Page />} />
            <Route path="/home" element={<p>Добро пожаловать домой!</p>} />
            <Route path="*" element={<p>Выберите страницу слева или создайте новую</p>} />
          </Routes>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
