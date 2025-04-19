// // // src/components/Header.js
// // import { Layout } from "antd";
// // import logo from './logo.jpg';
// // import { auth } from "./firebase";
// // import { signOut } from "firebase/auth";
// // import { useNavigate } from "react-router-dom";
// // import './button.css'
// // const { Header } = Layout;

// // const AppHeader = () => {
// // const navigate = useNavigate();

// //   const handleLogout = () => {
// //     signOut(auth)
// //       .then(() => {
// //         console.log("Вы вышли из аккаунта");
// // navigate('/')
// //       })
// //       .catch((error) => {
// //         console.error("Ошибка выхода:", error);
// //       });
// //   };

// //   return (
// //     <Header
// //       className="custom-header"
// //       style={{
// //         padding: "0 24px",
// //         display: "flex",
// //         alignItems: "center",
// //         borderBottom: "1px solid #eee",
// //       }}
// //     >
// //       <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
// //       <h2
// //   style={{
// //     fontFamily: "'courgette', cursive",
// //     margin: 0,
// //     color: "black",
// //   }}
// // >
// //   📝 my blog-planner

// // </h2>

// // <h2
// //   style={{
// //     fontFamily: " cursive",
// //     margin:"0 20px",
// //     color: "black",

// //   }}>
// //     from crisis to dev
// //   </h2>
// //   <button onClick={handleLogout} className="custom-btn btn-6"><span>logout</span></button>
// //     </Header>
// //   );
// // };

// // export default AppHeader;
// // src/components/Header.js
// import { Layout, Button } from "antd";
// import { MenuOutlined } from "@ant-design/icons";
// import logo from './logo.jpg';
// import { auth } from "./firebase";
// import { signOut } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import './button.css';

// const { Header } = Layout;

// const AppHeader = ({ onMenuClick, isMobile }) => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     signOut(auth)
//       .then(() => {
//         console.log("Вы вышли из аккаунта");
//         navigate('/');
//       })
//       .catch((error) => {
//         console.error("Ошибка выхода:", error);
//       });
//   };

//   return (
//     <Header
//       className="custom-header"
//       style={{
//         padding: "0 24px",
//         display: "flex",
//         alignItems: "center",
//         borderBottom: "1px solid #eee",
//       }}
//     >
//       {/* Мобильное меню кнопка */}
//       {isMobile && (
//         <Button
//           icon={<MenuOutlined />}
//           onClick={onMenuClick}
//           style={{
//             marginRight: 16,
//             border: "none",
//             background: "transparent",
//             fontSize: 20,
//           }}
//         />
//       )}

//       <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />
//       <h2
//         style={{
//           fontFamily: "'courgette', cursive",
//           margin: 0,
//           color: "black",
//         }}
//       >
//         📝 my blog-planner
//       </h2>

//       <h2
//         style={{
//           fontFamily: "cursive",
//           margin: "0 20px",
//           color: "black",
//         }}
//       >
//         from crisis to dev
//       </h2>

//       <div style={{ marginLeft: "auto" }}>
//         <button onClick={handleLogout} className="custom-btn btn-6">
//           <span>logout</span>
//         </button>
//       </div>
//     </Header>
//   );
// };

// export default AppHeader;
// src/components/Header.js
import { Layout, Button } from "antd";
import { MenuOutlined, LogoutOutlined } from "@ant-design/icons";
import logo from './logo.jpg';
import { auth } from "./firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import './button.css';

const { Header } = Layout;

const AppHeader = ({ onMenuClick, isMobile }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Вы вышли из аккаунта");
        navigate('/');
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
        height: isMobile ? 100 : 80,
      }}
    >
      {isMobile && (
        <Button
          icon={<MenuOutlined />}
          onClick={onMenuClick}
          style={{
            marginRight: 16,
            border: "none",
            background: "transparent",
            fontSize: 20,
          }}
        />
      )}

      <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />

      <div
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 0 : 20,
        }}
      >
        <h2
          style={{
            fontFamily: "'courgette', cursive",
            margin: 0,
            color: "black",
            fontSize: isMobile ? 16 : 20,
          }}
        >
          📝 my blog-planner
        </h2>

        <h2
          style={{
            fontFamily: "cursive",
            margin: 0,
            color: "black",
            fontSize: isMobile ? 14 : 18,
          }}
        >
          from crisis to dev
        </h2>
      </div>

      <div style={{ marginLeft: "auto" }}>
        {isMobile ? (
          <Button
            type="text"
            icon={<LogoutOutlined style={{ fontSize: 20 }} />}
            onClick={handleLogout}
          />
        ) : (
          <button onClick={handleLogout} className="custom-btn btn-6">
            <span>logout</span>
          </button>
        )}
      </div>
    </Header>
  );
};

export default AppHeader;
