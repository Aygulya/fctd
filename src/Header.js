// src/components/Header.js
import { Layout } from "antd";
import logo from './logo.jpg';
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const { Header } = Layout;

const AppHeader = () => {
const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Вы вышли из аккаунта");
navigate('/')
      })
      .catch((error) => {
        console.error("Ошибка выхода:", error);
      });
  };

  return (
    <Header
      className="custom-header"
      style={{
        padding: "0 24px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #eee",
      }}
    >
      <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
      <h2
  style={{
    fontFamily: "'courgette', cursive",
    margin: 0,
    color: "black",
  }}
>
  📝 my blog-planner

</h2>

<h2
  style={{
    fontFamily: " cursive",
    margin:"0 20px",
    color: "black",

  }}>
    from crisis to dev
  </h2>
  <button onClick={handleLogout}>Выйти</button>
    </Header>
  );
};

export default AppHeader;
